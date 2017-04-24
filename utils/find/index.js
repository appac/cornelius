let find = function () {}

find.prototype.player = function (data, key) {
	if (!key) {
		return new Error('findPlayerInResults wasn\'t given a key.');
	} else if (typeof (key) !== 'string') {
		return new Error(`findPlayerInResults expected key to be a string, but was given a ${typeof(key)}.`);
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
		return new Error('No player found with matching key.');
	}

	return requestedPlayer;
}

find.prototype.teamId = function (key) {
	let teamID;

	teams.forEach(function (team) {
		let team_abbrev = team.name_abbrev.toUpperCase();
		let team_name = team.name_display_full.toUpperCase();

		if (key == team_abbrev || key == team.team_id || key == team_name) {
			teamID = team.team_id;
		}

	});

	return teamID;
}

module.exports = new find;