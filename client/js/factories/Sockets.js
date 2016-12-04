app.factory('SocketFactory', function($http, $localStorage) {
    var obj = {};
    var gameList = [];

    obj.jonDopeFunction = socket.on('addToWaitingRoom', function(data){
      console.log("I hear ya bruh");
      gameList.push(data);
    });

    obj.getGameList = function(){
      console.log(gameList);
      return gameList;
    }

    return obj;

})
