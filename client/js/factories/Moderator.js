app.factory('moderatorFactory', ['$location', function ($location) {
	function Moderator () {

		this.gameObject = {};

		this.userList = [];

		this.start = function () {
			//randomly assigns each user with their class
			var roles = ["citizen", "citizen", "citizen", "werewolf", "werewolf", "witchdoctor", "hunter",
						 "fortuneteller"];

			if (this.userList.length < 1) {
				("Wait till the room is full");
			} else {
				for (i = 0; i <= 7; i++) {
					this.gameObject[this.userList[i]] = new Player(roles[i]);
					if (roles[i] === "witchdoctor") {
						this.gameObject[this.userList[i]].usedSave = false;
					}
				}
				("assigning roles");
				$location.url('/game');
			}

		}
	}

	return new Moderator();

}]);

function Player (role) {

	this.awake = true;
	this.alive = true;
	this.role = role;

}
