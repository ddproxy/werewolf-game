app.controller('waitingRoomController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', function ($scope, $http, $location, $window, moderatorFactory) {
    $scope.message = "This is the waiting room";

    $scope.view = {};

    $scope.view.users = ["Tosin", "Taylor", "Jeannie", "Frank", "Joey"];
    $scope.view.userCount = $scope.view.users.length;

    $scope.view.gameStart = function () {
      moderatorFactory.start();
      $location.url('/game');
    }
  }
]);
