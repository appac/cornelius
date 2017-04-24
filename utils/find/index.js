let find = function () {}

find.prototype.player = function (data, key) {
	if (!key) {
		return new Error(`find.player was not given a key.`);
	} else if (typeof (key) !== 'string') {
		return new Error(`find.player expected key to be a string, but was given a ${typeof(key)}.`);
	}

	function hasMatchingKey(player) {
		let keyUpper = key.toUpperCase();
		if (player.player_id === keyUpper || player.team_abbrev === keyUpper) {
			return true;
		} else {
			return false;
		}
	}

	let results = data.search_player_all.queryResults.row;
	let resultsCount = data.search_player_all.queryResults.totalSize;
	let requestedPlayer = {};

	if (resultsCount > 1) {
		let p = results.findIndex(hasMatchingKey);
		requestedPlayer = results[p];
	} else if (resultsCount == 1) {
		requestedPlayer = results;
	}

	if (!requestedPlayer) {
		return new Error('find.player could not find a player with a matching key.');
	}

	return requestedPlayer;
}

find.prototype.teamId = function (key) {
	key = key.toUpperCase();
	let teamID;
	let teams = require('./team.manifest.json');
	
	for (let i = 0; i < teams.length; i++) {
		let team = teams[i];
		let team_abbrev = team.name_abbrev.toUpperCase();
		let team_name = team.name_display_full.toUpperCase();

		if (key == team_abbrev || key == team.team_id || key == team_name) {
			teamID = team.team_id;
		}
	}

	return teamID;
}

module.exports = new find;