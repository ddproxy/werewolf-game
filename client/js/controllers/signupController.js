app.controller('signupController', ['$scope', '$http', '$location', 'AuthFactory', '$localStorage', function($scope, $http, $location, AuthFactory, $localStorage) {

    $scope.view = {};
    $scope.view.test = 'Sign Up Page';
    $scope.newUser = {};
    $scope.newUser.username = "midastouchprd";
    $scope.newUser.email = "midastouchproductions@gmail.com";
    $scope.newUser.password = "Dreamers512";

    $scope.submitSignup = function(obj, callback) {
        $http.post('/api/users', obj).then(function successCallback(response) {
            AuthFactory.Login($scope.newUser.username, $scope.newUser.password, function(valid) {
                if (valid) {
                    $http({
                        method: 'GET',
                        url: '/api/me',
                    }).then(function(response) {
                        $location.url('/')
                    })
                } else {}
            })
        }, function errorCallback(response) {});
    }



}]);
