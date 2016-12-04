'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var knex = require('../knex');
const path = require('path');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
var usersOnline = [];

//open page
io.on('connection', function(socket) {
    let usersPlayingList = []
    let currentUser = false;
    console.log('connected');

    //on login
    socket.on('authenticated', function(token) {
        if (jwt.verify(token, 'secret', function(err, decoded) {
                if (decoded) {
                    console.log("auth");
                    currentUser = {
                        username: decoded.username,
                        socket: socket
                    }
                    usersOnline.push(currentUser);
                    console.log(usersOnline);


                    socket.on('joingame', function(roomNumber) {
                        if (!_.find(usersPlayingList, currentUser)) {
                            currentUser.room = roomNumber;
                            usersPlayingList.push({
                              user: currentUser.username
                              room: currentUser.room
                            })
                        }

                        //list of users in the same room as the new person joining
                        var needsToKnow = _.filter(usersPlayingList, function(user) {
                            return user.room == roomNumber;
                        });

                        //loop through the need to know list and emit to each of the addtowaiting list
                        needsToKnow.map(function(user) {

                            user.socket.emit('addToWaitingRoom', usersPlayingList)
                        });
                    })

                    socket.on('update', function() {
                        console.log("oh you want that new shit?");
                        io.emit('runDigestLoop');
                    })


                }
            }));
    });



    socket.on('disconnect', function() {
        console.log('disconnected');
        if (currentUser) {
            _.remove(usersOnline, currentUser)
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
})

app.get('/api', function(req, res) {
    res.send("I'm an api");
})

app.get('/api/usersOnline', function(req, res) {
    var users = usersOnline.map(function(user) {
        return {
            user: user.username,
            game: user.room
        };
    })
    console.log(users);
    res.json(users)
})




// Server Listener
http.listen(port, function() {
    console.log('listening on port: ' + port);
});
