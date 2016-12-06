app.controller('gameController', [
    '$scope', '$http', '$location', '$window', 'moderatorFactory', 'SocketFactory', '$routeParams',
    function($scope, $http, $location, $window, moderatorFactory, SocketFactory, $routeParams) {

        $http.get('/api/me').then(function(response) {
            $scope.view.me = response.data.username;
        })

        socket.on('runChatDigest', function() {
            //update message list
            SocketFactory.getMessageList(function(messageList) {
                $scope.messages = messageList;
            })
            $scope.$apply();
        })

        SocketFactory.getGameList(function(players) {
            $scope.game = players;
        })

        $scope.view = {};
        $scope.messages = [];
        $scope.game;

        $scope.sendMessage = function(event) {

            let msg = {
                author: $scope.view.me,
                body: $scope.view.input,
                room: $routeParams.gameid
            }

            if (event.which === 13) {
                event.preventDefault();
                SocketFactory.addNewMessage(msg);
                $scope.view.input = "";
            }
        }




    }
]);
