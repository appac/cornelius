let prune = function () {}

prune.prototype.searchResults = function (data) {
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

prune.prototype.playerData = function (data) {
	let player = {
		id: data.player_id,
		name: {
			full: data.name_display_first_last,
			first: data.name_first,
			last: data.name_last,
			roster: data.name_display_roster
		},
		position: {
			id: data.position_id,
			code: data.position
		},
		team: {
			id: data.team_id,
			name: data.team_full,
			abbrev: data.team_abbrev,
			code: data.team_code,
			league: data.league
		},
		date: {
			pro_debut: data.pro_debut_date,
			birth: data.birth_date
		},
		geo: {
			city: data.birth_city,
			state: data.birth_city,
			country: data.birth_country,
			high_school: data.high_school,
			college: data.college
		},
		attribute: {
			bats: data.bats,
			throws: data.throws,
			weight: data.weight,
			height: {
				feet: data.height_feet,
				inches: data.height_inches
			}
		}
	};

	return player;
}

prune.prototype.rosterData = function (data) {
	let prunedData = [];
	let roster = data.roster_all.queryResults.row;

	roster.forEach(function (player) {
		let name = player.player_html;
		name = name.replace(/\,/g,"").split(' ').reverse().join(' ');
		let prunedPlayer = {
			id: player.player_id,
			name: name
		}
		prunedData.push(prunedPlayer);
	});

	return prunedData;
}

module.exports = new prune;