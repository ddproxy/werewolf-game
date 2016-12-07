app.controller("logoutController", [
    "$scope",
    "$http",
    "$location",
    "$window",
    "moderatorFactory",
    "SocketFactory",
    "AuthFactory",
    function ($scope,
              $http,
              $location,
              $window,
              moderatorFactory,
              SocketFactory,
              AuthFactory) {
        $scope.logout = AuthFactory.Logout;
    }
]);
