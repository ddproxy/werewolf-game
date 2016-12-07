app.factory("AuthFactory", [
    "$http",
    "$localStorage",
    "$location",
    "SocketFactory",
    function ($http,
              $localStorage,
              $location,
              SocketFactory) {
        var service = {
            Login: function (username, password, callback) {
                $http.post("/api/token", {
                    username: username,
                    password: password
                }).then(function (response) {
                    if (response.data) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {
                            token: response.data,
                        };

                        $http.defaults.headers.common.Authorization = response.data;
                        SocketFactory.emit("authenticated?", response.data);

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
            },
            Logout: function () {
                // remove user from local storage and clear http auth header
                SocketFactory.emit("joingame", "logout");
                delete $localStorage.currentUser;
                $http.defaults.headers.common.Authorization = "";
                $location.url("/login");
                SocketFactory.emit("logout");
            }
        };
        if ($localStorage.currentUser) {
            SocketFactory.emit("authenticated?", $localStorage.currentUser.token);
            SocketFactory.on("gtfo", function () {
                service.Logout();
            })
        } else {
            service.Logout();
        }
        return service;
    }]);
