app.factory('SocketFactory', function($http, $localStorage) {
    var obj = {};
    var gameList = [];


    socket.on('addToWaitingRoom', function(data) {
        gameList.push(data);
        socket.emit('update');
    })

    obj.getGameList = function(callback) {
        console.log(gameList);
        callback(gameList);
    }

    return obj;

})
