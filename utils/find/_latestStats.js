'use strict';

/**
 * Looks at an array of stats for a player, pops off the last (latest).
 *
 * @private
 * @param {Object} rawData - The raw stats data to look through.
 * @return {Object} sport_[stat_type]_tm - Returns the original raw data if no stats exist, or if they do, a copy that is modified with only the latest stats.
 */
function latestStats(rawData) {
    const statType = rawData.hasOwnProperty('sport_hitting_tm')
            ? 'sport_hitting_tm'
            : 'sport_pitching_tm',
        hasStats = rawData[statType].queryResults.totalSize > 0;

    if (!hasStats) {
        return rawData;
    } else {
        const returnData = rawData,
            latestStats = returnData[statType].queryResults.row.pop();

        returnData[statType].queryResults.row = latestStats;
        returnData[statType].queryResults.totalSize = 1;
        return returnData;
    }
}

module.exports = latestStats;
