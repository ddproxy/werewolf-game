if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const path = require('path');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

// Declare routes var
const moderators = require('./routes/moderators');
const gameplay = require('./routes/gameplay');
const users = require('./routes/users');
const auth = require('./routes/auth');

let usersOnline = [];

// Middleware
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Assign Routes to Server
app.use('/api', moderators);
app.use('/api', gameplay);
app.use('/api', users);
app.use('/api', auth);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'game.html'));
});

app.get('/api', function (req, res) {
    res.send("I'm an api");
});

app.get('/api/usersOnline', function (req, res) {
    var users = usersOnline.map(function (user) {
        return {
            user: user.username,
            game: user.room
        };
    });
    // (users);
    res.json(users)
});


// Server Listener
http.listen(port, function () {
    ('listening on port: ' + port);
});


//open page
io.on('connection', function (socket) {
    let currentUserState = false;
    let oldRoom;

    //on login
    socket.on('authenticated?', function (token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                socket.emit('gtfo');
            } else if (decoded) {
                currentUserState = {
                    username: decoded.username,
                    socket: socket,
                    room: undefined,
                    role: undefined,
                    awake: true,
                    alive: true
                };

                if (usersOnline.length < 1) {
                    usersOnline.push(currentUserState);
                }
                for (var i = 0; i < usersOnline.length; i++) {
                    if (usersOnline[i].username == currentUserState.username) {
                        _.remove(usersOnline, usersOnline[i]);
                    }
                }
                usersOnline.push(currentUserState);
            }
        });

        socket.on('joingame', function (roomNumber) {
            //if no room number - then add them to room
            if (_.find(usersOnline, (user) => {
                    return (user.username == currentUserState.username) && (user.room !== roomNumber);
                })) {
                if (currentUserState.room !== undefined) {
                    oldRoom = currentUserState.room;
                }
                currentUserState.room = roomNumber;
                usersOnline = _.uniq(usersOnline);
            }

            //list of users in the same room as the new person joining
            const gettingAdded = _.filter(usersOnline, function (user) {
                return (user.room == roomNumber);
            });

            const gettingRemoved = _.filter(usersOnline, function (user) {
                return (user.room == oldRoom);
            });

            //loop through the need to know list and emit to each of the addtowaiting list
            const updatedGettingAdded = gettingAdded.map(function (user) {
                return {
                    username: user.username,
                    room: user.room
                }
            });

            const updatedGettingRemoved = gettingRemoved.map(function (user) {
                return {
                    username: user.username,
                    room: user.room
                }
            });

            gettingAdded.map(function (user) {
                user.socket.emit('refreshWaitingRoom', updatedGettingAdded);
            });

            gettingRemoved.map(function (user) {
                user.socket.emit('refreshWaitingRoom', updatedGettingRemoved);
            })
        });

        socket.on('gamestart', function (roomNumber) {
            const players = _.filter(usersOnline, function (user) {
                return (user.room == roomNumber);
            });
            players.map(function (user) {
                user.socket.emit('goToRoom', user.room)
            })
        });

        socket.on('update', function () {
            io.emit('runDigest');
        });

        socket.on('updateChat', function () {
            io.emit('runChatDigest');
        });

        socket.on('addToMessageList', function (messageList) {
            const players = _.filter(usersOnline, function (user) {
                return (user.room == messageList[0].room);
            });

            players.map(function (user) {
                user.socket.emit('updateMessagesList', messageList)
            })
        })
    });

    socket.on('disconnect', function () {
        if (currentUserState) {
            _.remove(usersOnline, currentUserState);
            currentUserState = false;
        }
    });

    socket.on('logout', function () {
        if (currentUserState) {
            _.remove(usersOnline, currentUserState);
            currentUserState = false;
        }
    })
});
