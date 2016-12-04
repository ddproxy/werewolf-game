app.factory('SocketFactory', function($http, $localStorage, $routeParams) {
    var obj = {};
    var gameList = [];

    socket.on('refreshWaitingRoom', function(data) {
        console.log("refreshing the waiting room");
        console.log(data);
        gameList = data;
        socket.emit('update');
    });


    obj.getGameList = function(callback) {
        callback(gameList);
    }

    return obj;

})
