app.controller('loginController', ['$scope', '$http', '$location', 'AuthFactory', '$localStorage', function($scope, $http, $location, AuthFactory, $localStorage) {


    $scope.view = {};
    $scope.view.test = 'Login Page';
    $scope.login = {};
    $scope.login.username = "midastouchprd";
    $scope.login.password = "Dreamers512";

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
