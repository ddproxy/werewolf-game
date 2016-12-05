app.factory('SocketFactory', function($http, $localStorage, $routeParams) {
    var obj = {};
    var gameList = [];
    ("HAHAHAHA");

    socket.on('refreshWaitingRoom', function(data) {
        ("refreshing the waiting room");
        (data);
        gameList = data;
        socket.emit('update');
    });


    obj.getGameList = function(callback) {
        callback(gameList);
    }

    return obj;

})
