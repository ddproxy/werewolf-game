app.factory('SocketFactory', function($http, $localStorage, $routeParams, $location) {
    var obj = {};
    var gameList = [];
    var messageList = [];


    socket.on('refreshWaitingRoom', function(data) {
        gameList = data;
        socket.emit('update');
    });
    socket.on('updateMessagesList', function(data) {
        messageList = data;
        socket.emit('updateChat');
    });


    obj.getGameList = function(callback) {
        callback(gameList);
    }
    obj.addNewMessage = function(message) {
        messageList.push(message);

        socket.emit('addToMessageList', messageList);
    }
    obj.getMessageList = function(callback) {
        callback(messageList);
    }

    obj.clearMessageList = function(){
      messageList = [];
    }



    return obj;

})
