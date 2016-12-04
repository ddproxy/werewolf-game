app.factory('SocketFactory', function ($http, $localStorage, $routeParams) {
	var obj = {};
	var gameList = [];

	var cb = false;


    socket.on('refreshWaitingRoom', function(data) {
        console.log("refreshing the waiting room");
        console.log(data);
        gameList = data;
        cb(gameList);
    })

    obj.getGameList = function(callback) {
        console.log("current game list");
        console.log(gameList);
        cb = callback;
        callback(gameList);
    }

    return obj;

})
