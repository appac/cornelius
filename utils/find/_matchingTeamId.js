'use strict';

/**
 * Given a key, finds a matching team ID from a local manifest.
 * 
 * @private
 * @param {string} key - The key to match to.
 * @returns {string|undefined} teamID - The ID of the team matching the key, or undefined if none was found.
 */
function matchingTeamId (key) {
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
	
	return teamID;

}

module.exports = matchingTeamId;
