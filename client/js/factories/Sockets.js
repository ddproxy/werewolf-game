app.factory('SocketFactory', function($http, $localStorage, $routeParams) {
    var obj = {};
    var gameList = [];

    var cb = false;

    socket.on('refreshWaitingRoom', function(data) {
        gameList = data;
        cb(gameList);
    })

    obj.getGameList = function(callback) {
        console.log(gameList);
        cb = callback;
        callback(gameList);
    }

    return obj;

})
