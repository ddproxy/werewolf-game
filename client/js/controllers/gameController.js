app.controller('gameController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory',
  function($scope, $http, $location, $window, moderatorFactory, SocketFactory) {

      $scope.message = 'controller is working'
      $scope.messages = [];

      console.log(moderatorFactory.gameObject);

    }
]);
