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


io.on('connection', function(socket) {
    console.log("connected fool");
    socket.emit('username', {
        username: "username"
    });
    socket.emit('token', "token");
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




// Server Listener
http.listen(port, function() {
    console.log('listening on port: ' + port);
});
