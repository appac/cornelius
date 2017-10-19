'use strict';

/**
 * Prunes player stats data.
 * 
 * @private
 * @param {Object} data - The raw stats data to be pruned.
 * @returns {Object} - Pruned stats, or an empty object if there's nothing to prune.
 */
function prunePlayerStats(data) {
    let statType = data.hasOwnProperty('sport_hitting_tm') ? 'sport_hitting_tm' : 'sport_pitching_tm';
    let hasStats = data[statType].queryResults.totalSize > 0;
    let prunedStats = {};

    if (!hasStats) {
        return prunedStats;
    } else {
        prunedStats = data[statType].queryResults.row;
        prunedStats = organiseProps(prunedStats);

        return prunedStats;
    }
}

/**
 * Organises pruned stats properties into associated objects.
 * 
 * @private
 * @param {Object} stats - Pruned stat data.
 * @returns {Object} - Pruned stat data with properties organised.
 */
function organiseProps(stats) {
    let organisedStats = stats;
    var props = Object.keys(organisedStats);
    organisedStats._team = {};
    organisedStats._league = {};
    organisedStats._sport = {};

    props.forEach(prop => {
        let value = stats[prop];
        if (/team/.test(prop)) {
            organisedStats._team[prop] = value;
            delete organisedStats[prop];
        } else if (/league/.test(prop)) {
            organisedStats._league[prop] = value;
            delete organisedStats[prop];
        } else if (/sport/.test(prop)) {
            organisedStats._sport[prop] = value;
            delete organisedStats[prop];
        }
    });

    return organisedStats;
}

module.exports = prunePlayerStats;
