
var app = angular.module('Werewolf', ['ngRoute', 'ngStorage']);



app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    })
    .when('/waitingroom', {
      templateUrl: 'partials/joingame.html',
      controller: 'waitingRoomController',
    })
    .when('/game', {
        templateUrl: 'partials/game.html',
        controller: 'gameController',
    })
    .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'signupController',
    })
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
    })
});
