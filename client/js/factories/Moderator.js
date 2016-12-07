app.factory("moderatorFactory", [
    "$location",
    function ($location) {
        return {
            start: function (gameid) {
                //randomly assigns each user with their class
                var roles = [
                    "citizen",
                    "citizen",
                    "citizen",
                    "werewolf",
                    "werewolf",
                    "witchdoctor",
                    "hunter",
                    "fortuneteller"
                ];
                $location.url("/game/" + gameid);
                // Return roles so eslint will stop complaining
                return roles;
            }
        }
    }
]);
