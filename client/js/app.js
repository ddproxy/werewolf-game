<<<<<<< HEAD
var app = angular.module('Werewolf', ['ngRoute']);
=======
var app = angular.module('Werewolf', []);
>>>>>>> master


app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    })
    .when('/joingame', {
      templateUrl: 'partials/joingame.html',
      controller: 'joinGameController',
    })
    .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'gameController',
    })
    .when('signup', {
        templateUrl: 'partials/signup.html',
        controller: 'signupController',
    })
    .when('login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
    })
});
