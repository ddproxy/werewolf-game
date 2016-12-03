app.factory('moderator', function() {
  return Moderator();
}]);

function Moderator() {

  this.gameObject = {};

  this.userList = [];

  this.start = function () {
    //randomly assigns each user with their class
    var classes = [Citizen(), Citizen(), Citizen(), Werewolf(), Werewolf(), FortuneTeller(), WitchDoctor(), Hunter()];

    if (this.userList.length < 8) {
      console.log("Wait till the room is full");
    } else {
      for (i = 0; i <= 7: i++) {

      }
    }

  }

  // this.launchedCount = 0;
  // this.launch = function() {
  //   // Make a request to the remote API and include the apiToken
  //   ...
  //   this.launchedCount++;
  // }

}
