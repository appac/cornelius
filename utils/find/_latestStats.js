'use strict';

/**
 * Looks at an array of stats for a player, pops off the last (latest).
 *
 * @private
 * @param {Object} data - The stats data to look through.
 * @returns {Object} sport_[stat_type]_tm - Returns a modified version of the stats data.
 */
function latestStats (data) {
	let statType = data.hasOwnProperty('sport_hitting_tm') ? 'sport_hitting_tm' : 'sport_pitching_tm';
	let hasStats = data[statType].queryResults.totalSize > 0;

	if (!hasStats) {
		return data;
	} else {
		let latestStats = data[statType].queryResults.row.pop();
		data[statType].queryResults.row = latestStats;
		data[statType].queryResults.totalSize = 1;
		return data;
	}

}

module.exports = latestStats;
