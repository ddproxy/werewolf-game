app.factory('SocketFactory', function($http, $localStorage, $routeParams, $location) {
    var obj = {};
    var gameList = [];


    socket.on('refreshWaitingRoom', function(data) {
        gameList = data;
        socket.emit('update');
    });


    obj.getGameList = function(callback) {
        callback(gameList);
    }

    return obj;

})
