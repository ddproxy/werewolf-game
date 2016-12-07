app.controller("waitingRoomController", [
    "$scope",
    "$http",
    "$location",
    "$window",
    "moderatorFactory",
    "SocketFactory",
    "gameStateService",
    "messageStateService",
    "$routeParams",
    function ($scope,
              $http,
              $location,
              $window,
              moderatorFactory,
              SocketFactory,
              gameStateService,
              messageStateService,
              $routeParams) {

        $scope.view = {};
        //When you join the waiting room you are pushed into the user list
        $scope.view.users = [];

        // SocketFactory.on("runDigest", function () {
            // ("ALLRIGHT....here is that new shit!");
            gameStateService.getGameList(function (gameList) {
                $scope.view.users = gameList;
                $scope.view.userCount = $scope.view.users.length;

            });
            // $scope.$apply();
        // });

        SocketFactory.on("goToRoom", function (room) {
            // $scope.$apply(function () {
                $location.url("/game/" + room);
            // })
        });

        //Update the moderatorFactory everytime a new user is pushed into the list

        $scope.view.gameStart = function () {
            messageStateService.clearMessageList();
            SocketFactory.emit("gamestart", $routeParams.gameid);
            moderatorFactory.start($routeParams.gameid);
        };

        $scope.rightUser = function (num) {
            return num === $routeParams.gameid;
        };

        $scope.uniqueUser = function (name) {
            for (var i = 0; i < $scope.view.users.length; i++) {
                if ($scope.view.users[i].username === name) {
                    return false;
                }
            }
            return true;
        }

    }
]);
