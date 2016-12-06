app.factory('SocketFactory', function($http, $localStorage, $routeParams) {
    var obj = {};
    var gameList = [];


    socket.on('refreshWaitingRoom', function(data) {
        ("refreshing the waiting room");
        (data);
        gameList = data;
        socket.emit('update');
    });

    socket.on('goToRoom', function(room){
      console.log(room);
    })


    obj.getGameList = function(callback) {
        callback(gameList);
    }

    return obj;

})
