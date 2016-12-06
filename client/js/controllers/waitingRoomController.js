app.controller('waitingRoomController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$routeParams',
    function($scope, $http, $location, $window, moderatorFactory, SocketFactory, $routeParams) {

        socket.on('runDigest', function() {
            ('ALLRIGHT....here is that new shit!');
            SocketFactory.getGameList(function(gamelist) {
                $scope.view.users = gamelist;
                $scope.view.userCount = $scope.view.users.length;

            })
            $scope.$apply();
        })

        socket.on('goToRoom', function(room) {
            $scope.$apply(function() {
                $location.url('/game/' + room);
            })

        })


        $scope.view = {};

        //When you join the waiting room you are pushed into the user list
        $scope.view.users = [];

        //Update the moderatorFactory everytime a new user is pushed into the list

        $scope.view.gameStart = function() {
            SocketFactory.clearMessageList();
            socket.emit('gamestart', $routeParams.gameid)
            moderatorFactory.start($routeParams.gameid)
        }

        $scope.rightUser = function(num) {
            if (num === $routeParams.gameid) {
                return true;
            } else {
                return false
            }
        }

        $scope.uniqueUser = function(name) {
            for (var i = 0; i < $scope.view.users.length; i++) {
                if ($scope.view.users[i].username === name) {
                    return false;
                }
            }
            return true;
        }

    }
]);
