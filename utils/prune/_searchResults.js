'use strict';

let prunePlayerData = require('./_playerData');

/**
 * Prunes search results.
 * 
 * @private
 * @param {Object} data - The raw search data to be pruned.
 * @returns {Object} prunedResults - Pruned search data.
 */
function pruneSearchResults(data) {
	let resultsCount = data.search_player_all.queryResults.totalSize;
	let prunedResults = [];

	if (resultsCount > 1) {
		let searchResults = data.search_player_all.queryResults.row;

		for (let i = 0; i < searchResults.length; i++) {
			let player = searchResults[i];
			let prunedPlayer = prunePlayerData(player);
			prunedResults.push(prunedPlayer);
		}
	} else {
		let player = data.search_player_all.queryResults.row;
		let prunedPlayer = prunePlayerData(player);

		prunedResults.push(prunedPlayer);
	}

	return prunedResults;
}

module.exports = pruneSearchResults;
