app.factory('SocketFactory', function($http, $localStorage, $routeParams) {
    var obj = {};
    var gameList = [];


    socket.on('refreshWaitingRoom', function(data) {
        gameList = data;
        socket.emit('update');
    });

    socket.on('goToRoom', function(room){
      console.log('someone in your room went to the room');
      console.log(room);
    })


    obj.getGameList = function(callback) {
        callback(gameList);
    }

    return obj;

})
