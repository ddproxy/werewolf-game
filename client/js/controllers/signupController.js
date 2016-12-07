app.controller("signupController", [
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
        $scope.view = {};
        $scope.view.test = "Sign Up Page";
        $scope.newUser = {};

        $scope.submitSignup = function (obj) {
            $http.post("/api/users", obj).then(function successCallback () {
                AuthFactory.Login($scope.newUser.username, $scope.newUser.password, function (valid) {
                    if (valid) {
                        $http({
                            method: "GET",
                            url: "/api/me",
                        }).then(function () {
                            $location.url("/")
                        })
                    }
                })
            }, function errorCallback (response) {
                if(response) {
                    throw response.err;
                }
            });
        }
    }
]);
