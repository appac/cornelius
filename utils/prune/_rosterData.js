function pruneRosterData (data) {
	let prunedData = [];
	let roster = data.roster_all.queryResults.row;
	// TODO
	// add check for full roster data, prune accordingly
	roster.forEach(function (player) {
		let prunedPlayer = {
			id: player.player_id,
			name: player.name_display_first_last
		}
		prunedData.push(prunedPlayer);
	});

	return prunedData;
}

module.exports = pruneRosterData;
