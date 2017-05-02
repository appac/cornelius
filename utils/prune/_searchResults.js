function pruneSearchResults (data) {
	let resultsCount = data.search_player_all.queryResults.totalSize;
	let prunedResults = [];
	
	if (resultsCount > 1) {
		let searchResults = data.search_player_all.queryResults.row;

		for (let i = 0; i < searchResults.length; i++) {
			let player = searchResults[i];
			let prunedPlayer = this.playerData(player);
			prunedResults.push(prunedPlayer);
		}
	} else {
		let player = data.search_player_all.queryResults.row;
		let prunedPlayer = this.playerData(player);

		prunedResults.push(prunedPlayer);
	}

	return prunedResults;
}

module.exports = pruneSearchResults;
