function prunePlayerStats (data) {
	let prunedData;
	let isHittingStats = data.hasOwnProperty('sport_hitting_tm');

	if (isHittingStats) {
		prunedData  = data.sport_hitting_tm.queryResults.row;
	} else {
		prunedData = data.sport_pitching_tm.queryResults.row;
	}
	
	return prunedData;
}

module.exports = prunePlayerStats;
