'use strict';

function prunePlayerData(data) {
	let rawPlayer;
	let prunedPlayer;

	if (data.hasOwnProperty('player_info')) {
		rawPlayer = data.player_info.queryResults.row;
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
				state: rawPlayer.birth_city,
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
	} else {
		rawPlayer = data;
		prunedPlayer = {
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
				state: rawPlayer.birth_city,
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
	}

	return prunedPlayer;

}

module.exports = prunePlayerData;
