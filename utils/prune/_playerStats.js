'use strict';

/**
 * Prunes player stats data.
 * 
 * @private
 * @param {Object} data - The raw stats data to be pruned.
 * @returns {Object} - Pruned stats, or an empty object if there's nothing to prune.
 */
function prunePlayerStats(data) {
	let statType = data.hasOwnProperty('sport_hitting_tm') ? 'sport_hitting_tm' : 'sport_pitching_tm';
	let hasStats = data[statType].queryResults.totalSize > 0;
	let prunedStats = {};
	
	if (!hasStats) {
		return prunedStats;
	} else {
		prunedStats = data[statType].queryResults.row;
		return prunedStats;
	}
}

module.exports = prunePlayerStats;
