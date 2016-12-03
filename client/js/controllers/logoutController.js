app.controller('logoutController', ['$scope', '$http', '$location', 'AuthFactory', '$localStorage', function($scope, $http, $location, AuthFactory, $localStorage) {

    $scope.logout = AuthFactory.Logout;
    
}]);
