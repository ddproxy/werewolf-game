app.factory('SocketFactory', function($http, $localStorage) {
    var obj = {};
    var gameList = [];


    socket.on('addToWaitingRoom', function(data) {
        gameList.push(data);
    })

    obj.getGameList = function(callback) {
        console.log(gameList);
        callback(gameList);
    }

    return obj;

})
