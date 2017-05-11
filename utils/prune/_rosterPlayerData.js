'use strict';

/**
 * Prunes roster player data.
 * 
 * @private
 * @param {Object} rawPlayer - The raw player data to prune.
 * @returns {Object} prunedPlayer - The pruned player data.
 */
function pruneRosterPlayerData (rawPlayer) {

	let prunedPlayer = {
		id: rawPlayer.player_id,
		jersey_number: rawPlayer.jersey_number,
		name: {
			first: rawPlayer.name_first,
			last: rawPlayer.name_last,
			full: rawPlayer.name_display_first_last,
		},
		status: {
			code: rawPlayer.status_code
		},
		team: {
			id: rawPlayer.team_id,
			name: rawPlayer.team_name,
			code: rawPlayer.team_code,
			abbrev: rawPlayer.team_abbrev
		},
		position: {
			id: rawPlayer.primary_position,
			code: rawPlayer.position_txt
		},
		date: {
			birth: rawPlayer.birth_date,
			pro_debut: rawPlayer.pro_debut_date
		},
		geo: {
			college: rawPlayer.college
		},
		attributes: {
			bats: rawPlayer.bats,
			throws: rawPlayer.throws,
			weight: rawPlayer.weight,
			height: {
				feet: rawPlayer.height_feet,
				inches: rawPlayer.height_inches
			}
		}
	};

	return prunedPlayer;

}

module.exports = pruneRosterPlayerData;
