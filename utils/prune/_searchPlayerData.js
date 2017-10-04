'use strict';

/**
 * Prunes player data.
 * 
 * @private
 * @param {Object} data - The raw data to be pruned.
 * @returns {Object} prunedPlayer - Pruned player data.
 */
function pruneSearchPlayerData(data) {
	let rawPlayer = data;

	let prunedPlayer = {
		id: rawPlayer.player_id,
		name: {
			full: rawPlayer.name_display_first_last,
			first: rawPlayer.name_first,
			last: rawPlayer.name_last,
			roster: rawPlayer.name_display_roster
		},
		position: {
			id: rawPlayer.position_id,
			code: rawPlayer.position,
		},
		team: {
			id: rawPlayer.team_id,
			name: rawPlayer.team_full,
			abbrev: rawPlayer.team_abbrev,
			code: rawPlayer.team_code,
			league: rawPlayer.league
		},
		date: {
			pro_debut: rawPlayer.pro_debut_date,
			birth: rawPlayer.birth_date
		},
		geo: {
			city: rawPlayer.birth_city,
			state: rawPlayer.birth_state,
			country: rawPlayer.birth_country,
			high_school: rawPlayer.high_school,
			college: rawPlayer.college
		},
		attribute: {
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

module.exports = pruneSearchPlayerData;
