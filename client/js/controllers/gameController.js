app.controller("gameController", [
    "$scope",
    "$http",
    "$location",
    "$window",
    "$routeParams",
    "moderatorFactory",
    "SocketFactory",
    "gameStateService",
    function ($scope,
              $http,
              $location,
              $window,
              $routeParams,
              moderatorFactory,
              SocketFactory,
              gameStateService) {
        $scope.view = {};
        $scope.messages = [];
        $scope.game = {};

        $http.get("/api/me").then(function (response) {
            $scope.view.me = response.data.username;
        });

        SocketFactory.on("runChatDigest", function () {
            //update message list
            SocketFactory.getMessageList(function (messageList) {
                $scope.messages = messageList;
            });
            $scope.$apply();
        });

        gameStateService.getGameList(function (players) {
            $scope.game = players;
        });

        $scope.sendMessage = function (event) {
            var msg = {
                author: $scope.view.me,
                body: $scope.view.input,
                room: $routeParams.gameid
            };
            if (event.which === 13) {
                event.preventDefault();
                SocketFactory.addNewMessage(msg);
                $scope.view.input = "";
            }
        }
    }
]);
