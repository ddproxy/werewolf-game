app.factory('moderatorFactory', ['$location', function($location) {
    var Moderator = {};

		var userList = [];

    Moderator.gameObject = {};

    Moderator.fillUserList = function(array) {
        userList = array;
        console.log(userList);
    }

    Moderator.start = function(gameid) {
        //randomly assigns each user with their class
        var roles = ["citizen", "citizen", "citizen", "werewolf", "werewolf", "witchdoctor", "hunter",
            "fortuneteller"
        ];

        for (i = 0; i <= 7; i++) {
            Moderator.gameObject[userList[i]] = new Player(roles[i]);
            if (roles[i] === "witchdoctor") {
                Moderator.gameObject[userList[i]].usedSave = false;
            }
        }

        socket.emit('startgame', gameid);
        console.log("sending signal to start game");
    }




    return Moderator;

}]);

function Player(role) {

    this.awake = true;
    this.alive = true;
    this.role = role;

}
