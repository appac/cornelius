'use strict';

let pruneRosterPlayer = require('./_rosterPlayerData');

/**
 * Prunes roster data.
 * 
 * @private
 * @param {Object} data - The raw roster data to be pruned.
 * @returns {Object} prunedData - Pruned roster data.
 */
function pruneRosterData(data) {
	let prunedData = [];
	let roster = data.roster_40.queryResults.row;
	let hasFullPlayerData = roster[0].hasOwnProperty('pro_debut_date');

	if (hasFullPlayerData) {
		for (let i = 0; i < roster.length; i++) {
			let player = roster[i];
			let prunedPlayer = pruneRosterPlayer(player);
			prunedData.push(prunedPlayer);
		}
	} else {
		for (let i = 0; i < roster.length; i++) {
			let player = roster[i];
			let prunedPlayer = {
				id: player.player_id,
				name: player.name_display_first_last
			};
			prunedData.push(prunedPlayer);
		}
	}

	return prunedData;
}

module.exports = pruneRosterData;
