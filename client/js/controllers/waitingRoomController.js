app.controller('waitingRoomController',
	['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$routeParams',
	 function ($scope, $http, $location, $window, moderatorFactory, SocketFactory, $routeParams) {

		//  socket.on('runDigestLoop', function(){
		// 	 console.log('ALLRIGHT....here is that new shit!');
		// 	 $scope.$digest();
		//  })

		 $scope.view = {};

		 //When you join the waiting room you are pushed into the user list
		 $scope.view.users;

		 SocketFactory.getGameList(function(gamelist){
			 $scope.view.users = gamelist;
		 })
		 //Update the moderatorFactory everytime a new user is pushed into the list
		 moderatorFactory.userList = $scope.view.users;

		 $scope.view.userCount = $scope.view.users.length;

		 $scope.view.gameStart = function () {
			 moderatorFactory.start();
		 }

		 $scope.rightUser = function(num){
			 if (num === $routeParams.gameid) {
			 		return true;
			 } else {
				 return false
			 }
		 }

		 $scope.uniqueUser = function(name){
			 for (var i = 0; i < $scope.view.users.length; i++) {
			 	if ($scope.view.users[i].username === name) {
			 		return false;
			 	}
			 }
			 return true;
		 }

	 }
	]);
