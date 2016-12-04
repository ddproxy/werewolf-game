app.controller('waitingRoomController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory',
  function($scope, $http, $location, $window, moderatorFactory, SocketFactory) {
    $scope.message = "This is the waiting room";

    $scope.view = {};

    //When you join the waiting room you are pushed into the user list
    $scope.view.users = ["Tosin", "Taylor", "Jeannie", "Frank", "Joey", "Tim", "Chris", "Zubair"];

    //Update the moderatorFactory everytime a new user is pushed into the list
    moderatorFactory.userList = $scope.view.users;

    $scope.view.userCount = $scope.view.users.length;

    $scope.view.gameStart = function () {
      moderatorFactory.start();
    }
  }
]);
