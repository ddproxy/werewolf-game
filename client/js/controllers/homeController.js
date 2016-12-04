app.controller('homeController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$localStorage',
  function($scope, $http, $location, $window, moderatorFactory, SocketFactory, $localStorage) {
        $scope.message = 'controller is booyah'

        $scope.view = {};

        $scope.view.go = function(num) {
            console.log(num);
            socket.emit('joingame', {
              username: $localStorage.currentUser.username,
              gameid: num
            })
        }


    }
]);
