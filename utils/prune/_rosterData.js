let prunePlayerData = require('./_playerData');

function pruneRosterData (data) {
	let prunedData = [];
	let roster = data.roster_all.queryResults.row;
	let hasFullPlayerData = roster[0].hasOwnProperty('pro_debut_date');
	if (hasFullPlayerData) {
		for (let i = 0; i < roster.length; i++) {
			let player = roster[i];
			let prunedPlayer = prunePlayerData(player);
			prunedData.push(prunedPlayer);
		}
	} else {
		for (let i = 0; i < roster.length; i++) {
			let player = roster[i];
			let prunedPlayer = {
				id: player.player_id,
				name: player.name_display_first_last
			}
			prunedData.push(prunedPlayer);
		}
	}

	return prunedData;
}

module.exports = pruneRosterData;
