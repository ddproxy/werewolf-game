app.controller('gameController', [
	'$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory',
	function ($scope, $http, $location, $window, moderatorFactory, SocketFactory) {

		SocketFactory.getGameList(function(players){
			$scope.game = players;
			console.log(players);
		})

		$scope.view = {};
		$scope.message = 'controller is working';
		$scope.messages = [];

		$scope.game;




	}
]);
