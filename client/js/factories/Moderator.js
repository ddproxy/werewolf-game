app.factory('moderatorFactory', ['$location', function($location) {
    var Moderator = {};

		var playerList = [];

    Moderator.fillUserList = function(listOfUsers, callback) {
        playerList = listOfUsers;
        callback()
    }

    Moderator.getGameObject = function() {
        return gameObject;
        console.log(gameObject);
    }

    Moderator.start = function(gameid) {
        //randomly assigns each user with their class
        var roles = ["citizen", "citizen", "citizen", "werewolf", "werewolf", "witchdoctor", "hunter",
            "fortuneteller"
        ];

        $location.url('/game/' + gameid);



    }




    return Moderator;

}]);

function Player(role) {

    this.awake = true;
    this.alive = true;
    this.role = role;

}
