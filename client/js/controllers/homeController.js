app.controller('homeController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$localStorage',
    function($scope, $http, $location, $window, moderatorFactory, SocketFactory, $localStorage) {
        $scope.message = 'controller is booyah'

        $scope.view = {};
        $scope.view.games = [];
        $scope.view.showForm = false;


        $scope.view.go = function(num) {
            console.log(num);
            socket.emit('joingame', {
                username: $localStorage.currentUser.username,
                gameid: num
            })
            $location.url('/waitingroom');
        }

        $scope.createGame = function() {
            $localStorage.currentUser.role = "moderator";
            $scope.view.showForm = true;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            console.log(text);

            $scope.view.randomId = text;

        }

        $scope.addGame = function(title, id) {
            $scope.view.showForm = false;
            var obj = {
                title: title,
                id: id,
                username: $localStorage.currentUser.username
            }
            console.log(obj);
            // $scope.view.games.push(obj);

            $http.post('/api/gameplay/newgame', obj).then(function(response) {
                if (response.data) {
                    $location.url('/waitingroom/' + id);
                }
            })

        }


    }
]);
