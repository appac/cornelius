const Promise = require('bluebird');
const mlbRequest = require('./request');
const DataTransformer = require('../DataTransformer');
const GetStatsOptions = require('../Options').GetStatsOptions;

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
        const opts = new GetStatsOptions(options);

        let url;
        if (opts.pitching) {
            url = mlbRequest.build('sport_pitching_tm', opts);
        } else {
            url = mlbRequest.build('sport_hitting_tm', opts);
        }

        if (!url) {
            reject(new Error('Error building sport_[stat_type]_tm request URL.'));
        }

        mlbRequest.make(url)
            .then((data) => {
                if (opts.prune) {
                    const dataTransformer = new DataTransformer(data);
                    dataTransformer.on('transform:success', (transformedData) => {
                        resolve(transformedData);
                    }).on('transform:nodata', (emptyData) => {
                        resolve(emptyData);
                    }).on('error', (err) => {
                        reject(err);
                    });
                    dataTransformer.transform();
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = getStats;
