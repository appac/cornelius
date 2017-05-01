let find = function () {}

find.prototype.player = function (data, options) {
	let key = options.key;
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
	
	let error;
	let gotName = requestedPlayer.name_display_first_last.toUpperCase();
	let expectedName = options.query.toUpperCase();

	if (!requestedPlayer) {
		error = new Error('find.player could not find a player with a matching key.');
	} else if (gotName !== expectedName) {
		error = new Error('find.player - Name of found player does not match query.')
	}
	
	if (error) {
		return error;
	}

	return requestedPlayer;
}

find.prototype.teamId = function (key) {
	if (!key) {
		return new Error(`find.teamId was not given a key.`);
	} else if (typeof (key) !== 'string') {
		return new Error(`find.teamId expected key to be a string, but was given a ${typeof(key)}.`);
	}
	
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