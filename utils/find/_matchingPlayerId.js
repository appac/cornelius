'use strict';

/**
 * Looks for a player matching a key in search data.
 * 
 * @private
 * @param {Object} data - The search data to look through.
 * @param {Object} options
 * @param {string} options.query - Search term to use.
 * @param {string} options.key - Key to match to.
 * @returns {string} player_id - The ID of the player matching the key and query.
 */
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

/**
 * Prepares a string for comparing by stripping special chars and uppercasing it.
 * 
 * @private
 * @param {string} string - The string to prepare.
 * @returns {string} - The modified string.
 */
function prepareStringForCompare (string) {
	let charsToRemove = /([',.,-])/g;
	let cleanedString = string.replace(charsToRemove, '');
	let finalString = cleanedString.toUpperCase();

	return finalString;
}

module.exports = matchingPlayerId;
