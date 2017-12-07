'use strict';

let mlbRequest = require('./request'),
    prune = require('../prune');

class StatsOptions {
    constructor(options) {
        this.player_id = options.player_id || null;
        this.pitching = (options.hasOwnProperty('pitching') && typeof (options.pitching === 'boolean')) ? options.pitching : false;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.prune === 'boolean')) ? options.prune : true;
        this.year = options.year || null;
    }
}

/**
 * Constructs and makes call to MLB for stats.
 *
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get stats for.
 * @param {string} [options.pitching=false] - The type of stats to get.
 * @param {string} [options.year] - The season to get stats for.
 * @returns {Promise} - Promise to be fulfilled with player stats object, or error.
 */
function getStats(options) {
    return new Promise (function (resolve, reject) {
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
            .then(data => {
                if (o.prune) {
                    data = prune(data);
                }
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = getStats;
