var socket = io();

app.controller('gameController', ['$scope', '$http', '$location', '$window', 'moderatorFactory',
  function($scope, $http, $location, $window, moderatorFactory) {

      $scope.view = {};
      $scope.message = 'controller is working'
      $scope.messages = [];

      $scope.submit = function () {
        socket.emit('chat message', $scope.view.input);
        $scope.view.input = '';
        return false;
      }
      console.log(moderatorFactory.gameObject);
      $scope.view.game = moderatorFactory.gameObject;

      socket.on('chat message', function(msg){
        console.log(msg, 'msg from socket in controller');
        $scope.messages.push(msg)
        console.log($scope.messages, 'scope.messages');
      });


    }
]);
