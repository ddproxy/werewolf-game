'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var knex = require('../db/knex');
const path = require('path');

// Middleware
app.disable('x-powered-by');
// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Declare routes variables
// var login = require('./routes/login');
// var games = require('./routes/games');
// var chat = require('./routes/chat');


// Assign Routes to Server
// app.use(login);
// app.use(games);
// app.use(chat);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
})

// Server Listener
app.listen(port, function() {
    console.log('listening on port: ' + port);
});
