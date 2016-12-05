app.controller('loginController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', 'AuthFactory',
  function($scope, $http, $location, $window, moderatorFactory, SocketFactory, AuthFactory) {


    $scope.view = {};
    $scope.view.test = 'Login Page';
    $scope.login = {};

    $scope.newUser = function(){
      $location.url('/signup');
    }

    $scope.getToken = function(callback) {
        AuthFactory.Login($scope.login.username, $scope.login.password, function(valid) {
            if (valid) {
                $http.get('/api/me').then(function(response) {
                    $location.url('/')
                })
            } else {}
        })
    }
}]);
