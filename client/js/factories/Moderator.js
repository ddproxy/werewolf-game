app.factory('moderatorFactory', ['$location', function($location) {
  return new Moderator();
}]);

function Moderator() {

  this.gameObject = {};

  this.userList = [];

  this.start = function () {
    console.log("this.start function, oh hai");

    //randomly assigns each user with their class
    // var classes = [Citizen(), Citizen(), Citizen(), Werewolf(), Werewolf(), FortuneTeller(), WitchDoctor(), Hunter()];

    // if (this.userList.length < 8) {
    //   console.log("Wait till the room is full");
    // } else {
    //   for (i = 0; i <= 7: i++) {
    //
    //   }
    // }

  }
}
