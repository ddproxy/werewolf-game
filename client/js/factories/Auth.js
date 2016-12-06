app.factory('AuthFactory', function($http, $localStorage, $location) {



    var service = {};

    service.Login = (username, password, callback) => {
        $http.post('/api/token', {
            username: username,
            password: password
        }).then(function(response) {
            if (response.data) {
                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = {
                    token: response.data,
                };

                $http.defaults.headers.common.Authorization = response.data;
                socket.emit('authenticated?', response.data);


                // execute callback with true to indicate successful login
                callback(true);
            } else {
                // execute callback with false to indicate failed login
                callback(false);
            }
        });
    };

    service.Logout = function() {
        // remove user from local storage and clear http auth header
        socket.emit('joingame', 'logout');
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        $location.url('/login');
        socket.emit('logout');
    };

    if ($localStorage.currentUser) {
        socket.emit('authenticated?', $localStorage.currentUser.token);
        socket.on('gtfo', function() {
            service.Logout();
        })
    } else {
        service.Logout();
    }

    return service;
});
