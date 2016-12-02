'use strict'

 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var port = process.env.PORT || 3000;
 var ejs = require('ejs');
 var knex = require('./db.js');

 // Middleware
 app.disable('x-powered-by');
 app.set('view engine', 'ejs');
 app.use(express.static(__dirname + '/public'));
 app.use(bodyParser.urlencoded({
 extended: false
 }));
 app.use(bodyParser.json());

 // Declare routes variables
 var login = require('./routes/login');

 // Assign Routes to Server
 app.use(login);

 // Server Listener
 app.listen(port, function() {
 console.log('listening on port: ' + port);
 });
