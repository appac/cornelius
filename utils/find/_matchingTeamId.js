function matchingTeamId (key) {
	if (!key) {
		return new Error(`find.teamId was not given a key.`);
	} else if (typeof (key) !== 'string') {
		return new Error(`find.teamId expected key to be a string, but was given a ${typeof(key)}.`);
	}
	
	key = key.toUpperCase();
	let teamID;
	let teams = require('./team.manifest.json');
	
	for (let i = 0; i < teams.length; i++) {
		let team = teams[i];
		let team_abbrev = team.name_abbrev.toUpperCase();
		let team_name = team.name_display_full.toUpperCase();

		if (key == team_abbrev || key == team.team_id || key == team_name) {
			teamID = team.team_id;
		}
	}

	if (!teamID) {
		return new Error(`No team matching '${key}' found.`);
	}

	return teamID;
}

module.exports = matchingTeamId;
