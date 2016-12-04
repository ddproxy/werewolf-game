app.factory('SocketFactory', function($http, $localStorage, $routeParams) {
    var obj = {};
    var gameList = [];


    socket.on('addToWaitingRoom', function(data) {
        gameList = data;
        socket.emit('update');
    })

    obj.getGameList = function(callback) {
        console.log(gameList);
        callback(gameList);
    }

    return obj;

})
