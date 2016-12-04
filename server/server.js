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
io.on('connection', function (socket) {
	console.log("connected");
	let currentUser = false;

	//on login
	socket.on('authenticated', function (token) {
		jwt.verify(token, 'secret', function (err, decoded) {
			if (decoded) {
				console.log("auth");
				currentUser = {
					username: decoded.username,
					socket: socket,
					room: undefined
				};
				usersOnline.push(currentUser);
			}
		});


		socket.on('joingame', function (roomNumber) {
			//if no room number - then add them to room
			if (_.find(usersOnline, (user) => {
					return (user.username == currentUser.username) && (user.room == undefined);
				})) {

				currentUser.room = roomNumber;
				console.log("added " + currentUser.username + " to " + currentUser.room);
				usersOnline = _.uniq(usersOnline);
			}

			//list of users in the same room as the new person joining
			var needsToKnow = _.filter(usersOnline, function (user) {
				return user.room == roomNumber;
			});
			console.log("here is the needs to know list");
			console.log(needsToKnow);


			//loop through the need to know list and emit to each of the addtowaiting list
			var updatedArrayList = needsToKnow.map((userToKnow) => {
				return _.omitBy(userToKnow, (key, value) => {
					return key !== 'socket';
				})
			});

			console.log("here is the list without sockets");
			console.log(updatedArrayList);

			needsToKnow.map(function (user) {
				console.log("sending signal to " + user.username);
				user.socket.emit('refreshWaitingRoom', updatedArrayList);
			})
		});
	});

	socket.on('disconnect', function () {
		console.log('disconnected');
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


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
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
	console.log(users);
	res.json(users)
});


// Server Listener
http.listen(port, function () {
	console.log('listening on port: ' + port);
});
