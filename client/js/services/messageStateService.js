app.service("gameStateService", ['SocketFactory', function (SocketFactory) {
	var messageList = [];
	SocketFactory.on('updateMessagesList', function (data) {
		messageList = data;
		SocketFactory.emit('updateChat');
	});
	return {
		addNewMessage: function (message) {
			messageList.push(message);
			SocketFactory.emit('addToMessageList', messageList);
		},
		getMessageList: function (callback) {
			callback(messageList);
		},
		clearMessageList: function () {
			messageList = [];
		}
	}
}]);