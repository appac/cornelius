'use strict';

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
