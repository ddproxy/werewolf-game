app.factory('SocketFactory', function ($http, $localStorage) {
	var obj = {};
	var gameList = [];

	obj.onAddToWaitingRoom = function (callback) {
		socket.on('addToWaitingRoom', function (data) {
			console.log("I hear ya bruh");
			gameList.push(data);
			callback(gameList);
		});
	}

	obj.getGameList = function () {
		console.log(gameList);
		return gameList;
	}

	return obj;

})
