'use strict';

let teams = require('./team.manifest.json');

/**
 * Given a key, finds a matching team ID from a local manifest.
 *
 * @private
 * @param {string} key - The key to match to.
 * @returns {string|undefined} teamID - The ID of the team matching the key, or undefined if none was found.
 */
function matchingTeamId(key) {
    key = key.toUpperCase();

    const matchingTeam = teams.find((team) => {
        return team.name_abbrev === key || team.team_id === key || team.name_display_full.toUpperCase() === key;
    });

    if (matchingTeam) {
        return matchingTeam.team_id;
    }

}

module.exports = matchingTeamId;
