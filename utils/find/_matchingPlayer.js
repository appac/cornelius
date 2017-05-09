'use strict';

/**
 * Looks for a player matching a key in search data.
 *
 * @private
 * @param {Object} data - The search data to look through
 * @param {Object} options
 * @param {string} options.query - Query used to perform search.
 * @param {string} options.key - Key to match to.
 * @returns {Object} search_player_all - Modified version of the search data.
 */
function matchingPlayer (data, options) {
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
		results = results[p];
	} else if (resultsCount == 1) {
		requestedPlayer = results;
	}

	data.search_player_all.queryResults.totalSize = 1;
	
	let error;
	let gotName = requestedPlayer.name_display_first_last.toUpperCase();
	let expectedName = options.query.toUpperCase();

	if (!requestedPlayer) {
		error = new Error('Could not find a player with a matching key.');
	} else if (gotName !== expectedName) {
		error = new Error(`Name of found player does not match query. Found '${gotName}' but query was '${expectedName}'.`);
	}
	
	if (error) {
		return error;
	}

	return data;
}

module.exports = matchingPlayer;
