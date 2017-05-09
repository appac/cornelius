'use strict';

function matchingPlayerId (data, options) {
	function hasMatchingKey(player) {
		let givenKey = options.key.toUpperCase();
		let givenName = prepareStringForCompare(options.query);

		let playerID = player.player_id.toUpperCase();
		let playerTeamAbbrev = player.team_abbrev.toUpperCase();
		let playerName = prepareStringForCompare(player.name_display_first_last);

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

function prepareStringForCompare (string) {
	let charsToRemove = /([',.,-])/g;
	let cleanedString = string.replace(charsToRemove, '');
	let finalString = cleanedString.toUpperCase();

	return finalString;
}

module.exports = matchingPlayerId;
