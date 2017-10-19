'use strict';

let pruneFullRosterPlayerData = require('./_rosterPlayerData'),
    pruneShortRosterPlayerData = require('./_rosterPlayerDataShort');

/**
 * Prunes roster data.
 * 
 * @private
 * @param {Object} data - The raw roster data to be pruned.
 * @returns {Array} - Pruned roster data, or an empty array if there's nothing to prune.
 */
function pruneRosterData(data) {
    const roster = {
        exists: data.roster_40.queryResults.totalSize > 0,
        data: data.roster_40.queryResults.row
    };

    if (!roster.exists) {
        return [];
    }

    // Only full player data has a 'pro_debut_date' property - use that to verify what we're working with
    const hasFullPlayerData = roster.data[0].hasOwnProperty('pro_debut_date');
    if (hasFullPlayerData) {
        return roster.data.map(pruneFullRosterPlayerData);
    } else {
        return roster.data.map(pruneShortRosterPlayerData);
    }
}

module.exports = pruneRosterData;
