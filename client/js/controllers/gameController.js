app.controller('gameController', [
	'$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory',
	function ($scope, $http, $location, $window, moderatorFactory, SocketFactory) {

		$scope.view = {};
		$scope.message = 'controller is working';
		$scope.messages = [];

		$scope.game = moderatorFactory.getGameObject();


	}
]);
