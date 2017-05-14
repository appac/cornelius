'use strict';

let pruneSearchPlayerData = require('./_searchPlayerData');

/**
 * Prunes search results.
 * 
 * @private
 * @param {Object} data - The raw search data to be pruned.
 * @returns {Array} - Pruned player objects, or an empty array if there's nothing to prune.
 */
function pruneSearchResults(data) {
	let hasResults = data.search_player_all.queryResults.totalSize > 0;
	let prunedResults = [];

	if (!hasResults) {
		return prunedResults;
	} else {
		let resultsCount = data.search_player_all.queryResults.totalSize;
		if (resultsCount > 1) {
			let searchResults = data.search_player_all.queryResults.row;
			for (let i = 0; i < searchResults.length; i++) {
				let player = searchResults[i];
				let prunedPlayer = pruneSearchPlayerData(player);
				prunedResults.push(prunedPlayer);
			}
		} else {
			let player = data.search_player_all.queryResults.row;
			let prunedPlayer = pruneSearchPlayerData(player);
			prunedResults.push(prunedPlayer);
		}
		return prunedResults;
	}

}

module.exports = pruneSearchResults;
