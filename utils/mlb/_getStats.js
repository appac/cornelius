const mlbRequest = require('./request');
const prune = require('../prune');

/**
 * Represents options given to MLB Request Builder.
 */
class StatsOptions {
    /**
     * Sets fallback values for options properties.
     *
     * @param {object} options
     */
    constructor(options) {
        this.player_id = options.player_id || -1;
        this.pitching = (options.hasOwnProperty('pitching') && typeof (options.pitching === 'boolean')) ? options.pitching : false;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.prune === 'boolean')) ? options.prune : true;
        this.year = options.year || null;
    }
}

/**
 * Constructs and makes call to MLB for stats.
 *
 * @private
 * @param {Object} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get stats for.
 * @param {boolean} [options.pitching=false] - The type of stats to get.
 * @param {string} [options.year] - The season to get stats for.
 * @param {boolean} [options.prune=true] - Whether the data received should be pruned.
 * @return {Promise} - Promise to be fulfilled with player stats object, or error.
 */
function getStats(options) {
    return new Promise((resolve, reject) => {
        const o = new StatsOptions(options);

        let url;
        if (o.pitching) {
            url = mlbRequest.build('sport_pitching_tm', o);
        } else {
            url = mlbRequest.build('sport_hitting_tm', o);
        }

        if (!url) {
            reject(new Error('Error building sport_[stat_type]_tm request URL.'));
        }

        mlbRequest.make(url)
            .then((data) => {
                if (o.prune) {
                    data = prune(data);
                }
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = getStats;
