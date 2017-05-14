'use strict';

/**
 * Prunes player stats data.
 * 
 * @private
 * @param {Object} data - The raw stats data to be pruned.
 * @returns {Object} - Pruned stats, or an empty object if there's nothing to prune.
 */
function prunePlayerStats(data) {

	let isHittingStats = data.hasOwnProperty('sport_hitting_tm');
	let hasStats;
	if (isHittingStats) {
		hasStats = data.sport_hitting_tm.queryResults.totalSize > 0;
	} else {
		hasStats = data.sport_pitching_tm.queryResults.totalSize > 0;
	}

	let prunedStats = {};
	if (!hasStats) {
		return prunedStats;
	} else {
		if (isHittingStats) {
			prunedStats = data.sport_hitting_tm.queryResults.row;
		} else {
			prunedStats = data.sport_pitching_tm.queryResults.row;
		}
		return prunedStats;
	}

}

module.exports = prunePlayerStats;
