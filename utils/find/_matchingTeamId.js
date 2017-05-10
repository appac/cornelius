'use strict';

/**
 * Given a key, finds a matching team ID from a local manifest.
 * 
 * @private
 * @param {string} key - The key to match to.
 * @returns {string} teamID - The ID of the team matching the key.
 * @throws {Error} - Throws an error if no team matching the key is found.
 */
function matchingTeamId (key) {
	key = key.team_id.toUpperCase() || key.toUpperCase();
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
		throw new Error(`No team matching '${key}' found.`);
	}

	return teamID;
}

module.exports = matchingTeamId;
