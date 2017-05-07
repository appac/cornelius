'use strict';

function matchingPlayerId (data, options) {
	function hasMatchingKey(player) {
		let givenKey = options.key.toUpperCase();
		// TODO: Move name cleaning to own function
		let givenName = options.query.replace(/([',.,-])/g, '').toUpperCase();

		let playerID = player.player_id.toUpperCase();
		let playerTeamAbbrev = player.team_abbrev.toUpperCase();
		let playerName = player.name_display_first_last.replace(/([',.,-])/g, '').toUpperCase();

		if (givenKey === playerID || givenKey === playerTeamAbbrev && givenName === playerName) {
			return true;
		} else {
			return false;
		}
	}

	let results = data.search_player_all.queryResults.row;
	let resultsCount = data.search_player_all.queryResults.totalSize;
	let requestedPlayer;

	if (resultsCount > 1) {
		let p = results.findIndex(hasMatchingKey);
		requestedPlayer = results[p];
	} else if (resultsCount == 1) {
		requestedPlayer = results;
	}
	
	let error;

	if (!requestedPlayer) {
		error = new Error('Could not find a player with a matching key.');
	}
	
	if (error) {
		return error;
	}

	return requestedPlayer.player_id;
}

module.exports = matchingPlayerId;
