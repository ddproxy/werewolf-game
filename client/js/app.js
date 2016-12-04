var app = angular.module('Werewolf', ['ngRoute', 'ngStorage']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		})
		.when('/waitingroom/:gameid', {
			templateUrl: 'partials/waitingroom.html',
			controller: 'waitingRoomController',
		})
		.when('/game/:gameid', {
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
