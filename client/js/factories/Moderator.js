app.factory('moderatorFactory', ['$location', function($location) {
    var Moderator = {};

    Moderator.start = function(gameid) {
        //randomly assigns each user with their class
        var roles = ["citizen", "citizen", "citizen", "werewolf", "werewolf", "witchdoctor", "hunter",
            "fortuneteller"
        ];

        $location.url('/game/' + gameid);

    }

    return Moderator;

}]);
