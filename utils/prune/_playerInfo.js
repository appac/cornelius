'use strict';

/**
 * Prunes player data.
 * 
 * @private
 * @param {Object} data - The raw data to be pruned.
 * @returns {Object} - Pruned player data, or an empty object if there's nothing to prune.
 */
function prunePlayerInfo(data) {
	let hasPlayer = data.player_info.queryResults.totalSize > 0;
	let prunedPlayer = {};

	if (!hasPlayer) {
		return prunedPlayer;
	} else {
		let rawPlayer = data.player_info.queryResults.row;
		prunedPlayer = {
			id: rawPlayer.player_id,
			jersey_number: rawPlayer.jersey_number,
			status: {
				full: rawPlayer.status,
				code: rawPlayer.status_code,
				date: rawPlayer.status_date
			},
			name: {
				full: rawPlayer.name_display_first_last,
				first: rawPlayer.name_first,
				last: rawPlayer.name_last,
				roster: rawPlayer.name_display_roster
			},
			position: {
				id: rawPlayer.primary_position,
				code: rawPlayer.primary_position_txt,
			},
			team: {
				id: rawPlayer.team_id,
				name: rawPlayer.team_name,
				abbrev: rawPlayer.team_abbrev,
				code: rawPlayer.team_code,
			},
			date: {
				debut: rawPlayer.pro_debut_date,
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
				age: rawPlayer.age,
				gender: rawPlayer.gender,
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
	

}

module.exports = prunePlayerInfo;
