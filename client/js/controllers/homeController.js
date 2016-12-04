app.controller('homeController', ['$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$localStorage',
    function($scope, $http, $location, $window, moderatorFactory, SocketFactory, $localStorage) {
        $scope.message = 'controller is booyah'

        $scope.view = {};
        $scope.view.games;
        $scope.view.showForm = false;

        $http.get('/api/gameplay/opengames').then(function(response) {
            $scope.view.games = response.data
        })


        $scope.view.go = function(num) {
            socket.emit('joingame', {
                username: $localStorage.currentUser.username,
                gameid: num
            })
            $location.url('/waitingroom/' + num);
        }

        $scope.createGame = function() {
            $localStorage.currentUser.role = "moderator";
            $scope.view.showForm = true;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }


            $scope.view.randomId = text;
        }

        $scope.addGame = function(title, id) {
            $scope.view.showForm = false;
            var obj = {
                    title: title,
                    id: id,
                    username: $localStorage.currentUser.username
                }
                // $scope.view.games.push(obj);

            $http.post('/api/gameplay/newgame', obj).then(function(response) {
                if (response.data) {
                    $location.url('/waitingroom/' + id);
                }
            })

        }

    }
]);
