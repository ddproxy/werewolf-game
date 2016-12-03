
var app = angular.module('Werewolf', ['ngRoute', 'ngStorage']);



app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    })
    .when('/waitingroom', {
      templateUrl: 'partials/waitingroom.html',
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
    .when('/logout', {
        templateUrl: 'partials/logout.html',
        controller: 'logoutController',
    })
    .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutController',
    })
});
