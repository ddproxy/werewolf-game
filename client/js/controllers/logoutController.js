app.controller('logoutController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory',
  function($scope, $http, $location, $window, moderatorFactory, SocketFactory) {

    $scope.logout = AuthFactory.Logout;

}]);
