app.controller('homeController', ['$scope', '$http', '$location', '$window',
    function($scope, $http, $location, $window) {
        $scope.message = 'controller is booyah'

        $scope.view = {};

        $scope.view.go = function() {
            $location.url('/waitingroom');
        }


    }
]);
