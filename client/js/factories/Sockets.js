app.factory('SocketFactory', function($http, $localStorage, $routeParams, $location) {
    var obj = {};
    var gameList = [];
    var messageList = [];


    socket.on('refreshWaitingRoom', function(data) {
        gameList = data;
        socket.emit('update');
    });
    socket.on('updateMessagesList', function(data) {
        console.log('-----');
        console.log('ahhhhhhh ok....I will make my master list the same');
        console.log('--------');
        console.log('messagelist before');
        console.log(messageList);
        console.log('-----');
        messageList = data;
        console.log('--------');
        console.log('messagelist after');
        console.log(messageList);
        console.log('-----');
        socket.emit('updateChat');
    });


    obj.getGameList = function(callback) {
        callback(gameList);
    }
    obj.addNewMessage = function(message) {
        console.log('--------');
        console.log('message list before');
        console.log(messageList);
        console.log('--------');
        console.log('adding a message');
        console.log(message);
        console.log('--------');
        messageList.push(message);
        console.log('message list after');
        console.log(messageList);

        socket.emit('addToMessageList', messageList);
    }
    obj.getMessageList = function(callback) {
        callback(messageList);
    }



    return obj;

})
