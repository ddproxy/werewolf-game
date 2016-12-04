app.controller('homeController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory',
  function($scope, $http, $location, $window, moderatorFactory, SocketFactory) {
        $scope.message = 'controller is booyah'

        $scope.view = {};

        $scope.view.go = function() {
            $location.url('/waitingroom');
        }


    }
]);
