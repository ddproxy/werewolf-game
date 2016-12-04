app.controller('waitingRoomController',
	['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$routeParams',
	 function ($scope, $http, $location, $window, moderatorFactory, SocketFactory, $routeParams) {

		 SocketFactory.onAddToWaitingRoom(function(data) {
			 $scope.view.users = data;
		 });

		 $scope.view = {};

		 //When you join the waiting room you are pushed into the user list
		 $scope.view.users = $apply(SocketFactory.getGameList())

		 //Update the moderatorFactory everytime a new user is pushed into the list
		 moderatorFactory.userList = $scope.view.users;

		 $scope.view.userCount = $scope.view.users.length;

		 $scope.view.gameStart = function () {
			 moderatorFactory.start();
		 }
	 }
	]);
