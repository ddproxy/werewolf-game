app.controller("homeController", [
    "$scope",
    "$http",
    "$location",
    "$window",
    "$localStorage",
    "moderatorFactory",
    "SocketFactory",
    "AuthFactory",
    function ($scope,
              $http,
              $location,
              $window,
              $localStorage,
              moderatorFactory,
              SocketFactory,
              AuthFactory) {
        $scope.message = "controller is booyah";

        $scope.view = {};
        $scope.view.games = {};
        $scope.gotoroom = function (roomNumber) {
            $location.url("/waitingroom/" + roomNumber);

        };
        $scope.view.showForm = false;

        $http.get("/api/gameplay/opengames").then(function (response) {
            $scope.view.games = response.data;
        });


        $scope.view.go = function (num, callback) {
            SocketFactory.emit("joingame", num);
            callback(num);
        };

        $scope.createGame = function () {
            $localStorage.currentUser.role = "moderator";
            $scope.view.showForm = true;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            $scope.view.randomId = text;
        };

        $scope.addGame = function (title, id) {
            $scope.view.showForm = false;
            $http.get("/api/me").then(function (response) {
                var obj = {
                    title: title,
                    id: id,
                    username: response.data.username
                };

                $http.post("/api/gameplay/newgame", obj).then(function (response) {
                    if (response.data) {
                        $location.url("/waitingroom/" + id);
                    }
                })
            })
        };

        $scope.logout = AuthFactory.Logout;
    }
]);

// eslint-disable-next-line no-unused-vars
function GoToRoom (roomNumber) {
    // This won't work, $location is out of scope
    // eslint-disable-next-line no-undef
    $location.url("/waitingroom/" + roomNumber);
}
