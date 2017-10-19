'use strict';

/**
 * Prunes short roster player data.
 * 
 * @private
 * @param {Object} rawPlayer - The raw player data to prune.
 * @returns {Object} prunedPlayer - The pruned player data.
 */
function pruneShortRosterPlayerData (rawPlayer) {
	let prunedPlayer = {
		id: rawPlayer.player_id,
		name: rawPlayer.name_display_first_last
	};
	return prunedPlayer;
}

module.exports = pruneShortRosterPlayerData;
