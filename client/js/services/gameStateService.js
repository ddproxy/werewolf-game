app.factory("gameStateService", ['SocketFactory', function (SocketFactory) {
	var gameList = [];
	SocketFactory.on('refreshWaitingRoom', function (data) {
		gameList = data;
		SocketFactory.emit('update');
	});
	return {
		getGameList: function (callback) {
			callback(gameList);
		}
	}
}]);