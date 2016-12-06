'use strict';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const knex = require('../knex');
const path = require('path');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
let usersOnline = [];

//open page
io.on('connection', function(socket) {
    console.log("connected");
    let currentUser = false;
    let oldRoom;

    //on login
    socket.on('authenticated?', function(token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                socket.emit('gtfo');
                console.log(err);
            } else if (decoded) {
                currentUser = {
                    username: decoded.username,
                    socket: socket,
                    room: undefined
                };


                if(usersOnline.length < 1){

                console.log('auth for: ' + currentUser.username);
                console.log('-------------');
                usersOnline.push(currentUser);
                console.log(currentUser.username + " is now in users online");
                console.log('-------------');
              }

                for (var i = 0; i < usersOnline.length; i++) {
                    console.log('-------------');
                    console.log("user:" + i);
                    console.log(usersOnline[i].username);
                    console.log('-------------');
                    if (usersOnline[i].username == currentUser.username) {
                          console.log("removed: " + usersOnline[i].username);
                        _.remove(usersOnline, usersOnline[i]);
                    }
                }


                console.log('-------------');
                usersOnline.push(currentUser);
                console.log(currentUser.username + " is now in users online");
                console.log('-------------');
            }

        });


        socket.on('joingame', function(roomNumber) {

            //if no room number - then add them to room
            if (_.find(usersOnline, (user) => {
                    return (user.username == currentUser.username) && (user.room !== roomNumber);
                })) {
                if (currentUser.room !== undefined) {
                    oldRoom = currentUser.room;
                }
                currentUser.room = roomNumber;
                usersOnline = _.uniq(usersOnline);
            }

            //list of users in the same room as the new person joining
            var gettingAdded = _.filter(usersOnline, function(user) {
                return (user.room == roomNumber);
            });

            var gettingRemoved = _.filter(usersOnline, function(user) {
                return (user.room == oldRoom);
            });





            //loop through the need to know list and emit to each of the addtowaiting list
            var updatedGettingAdded = gettingAdded.map(function(user) {
                return {
                    username: user.username,
                    room: user.room
                }
            });

            var updatedGettingRemoved = gettingRemoved.map(function(user) {
                return {
                    username: user.username,
                    room: user.room
                }
            });


            gettingAdded.map(function(user) {
                user.socket.emit('refreshWaitingRoom', updatedGettingAdded);
            })
            gettingRemoved.map(function(user) {
                user.socket.emit('refreshWaitingRoom', updatedGettingRemoved);
            })
        });

        socket.on('update', function() {
            io.emit('runDigest');
        })
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
        if (currentUser) {
            _.remove(usersOnline, currentUser);
            currentUser = false;
        }
    })
    socket.on('logout', function() {
        console.log('logged out');
        if (currentUser) {
            _.remove(usersOnline, currentUser);
            currentUser = false;
        }
    })

});

// Middleware
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Declare routes variables
var moderators = require('./routes/moderators');
var gameplay = require('./routes/gameplay');
var users = require('./routes/users');
var auth = require('./routes/auth');


// Assign Routes to Server
app.use('/api', moderators);
app.use('/api', gameplay);
app.use('/api', users);
app.use('/api', auth);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/api', function(req, res) {
    res.send("I'm an api");
});

app.get('/api/usersOnline', function(req, res) {
    var users = usersOnline.map(function(user) {
        return {
            user: user.username,
            game: user.room
        };
    });
    (users);
    res.json(users)
});


// Server Listener
http.listen(port, function() {
    ('listening on port: ' + port);
});
