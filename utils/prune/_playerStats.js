'use strict';

/**
 * Prunes player stats data.
 * 
 * @private
 * @param {Object} data - The raw stats data to be pruned.
 * @returns {Object} prunedData - Pruned stats data.
 */
function prunePlayerStats(data) {
	let prunedData;
	let hasStats;
	let isHittingStats = data.hasOwnProperty('sport_hitting_tm');

	if (isHittingStats) {
		hasStats = data.sport_hitting_tm.queryResults.totalSize > 0;
	} else {
		hasStats = data.sport_pitching_tm.queryResults.totalSize > 0;
	}

	if (hasStats) {
		if (isHittingStats) {
				prunedData = data.sport_hitting_tm.queryResults.row;
		} else {
			prunedData = data.sport_pitching_tm.queryResults.row;
		}
		return prunedData;
	}

	throw new Error('No stats found to prune.');
}

module.exports = prunePlayerStats;
