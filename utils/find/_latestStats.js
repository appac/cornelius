'use strict';

/**
 * Looks at an array of stats for a player, pops off the last (latest).
 *
 * @private
 * @param {Object} data - The stats data to look through.
 * @returns {Object} sport_[stat_type]_tm - Returns a modified version of the stats data.
 */
function latestStats (data) {
	let isHittingStats = data.hasOwnProperty('sport_hitting_tm');
	let latestStats;
	if (isHittingStats) {
		latestStats = data.sport_hitting_tm.queryResults.row.pop();
		data.sport_hitting_tm.queryResults.row = latestStats;
		data.sport_hitting_tm.queryResults.totalSize = 1;
	} else {
		latestStats = data.sport_pitching_tm.queryResults.row.pop();
		data.sport_pitching_tm.queryResults.row = latestStats;
		data.sport_pitching_tm.queryResults.totalSize = 1;
	}

	return data;

}

module.exports = latestStats;
