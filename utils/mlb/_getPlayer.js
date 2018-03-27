const Promise = require('bluebird');
const mlbRequest = require('./request');
const DataTransformer = require('../DataTransformer');
const GetPlayerOptions = require('../Options').GetPlayerOptions;

/**
 * Constructs and makes call to MLB for getting a player.
 *
 * @private
 * @param {Object} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get.
 * @param {boolean} [options.prune=true] - Whether the data received should be pruned.
 * @return {Promise} - Promise to be fulfilled with player info object, or error.
 */
function getPlayer(options) {
    return new Promise((resolve, reject) => {
        const opts = new GetPlayerOptions(options);
        const url = mlbRequest.build('player_info', opts);

        if (!url) {
            reject(new Error('Error building player_info request URL.'));
        }

        mlbRequest.make(url)
            .then((data) => {
                if (opts.prune === true) {
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

module.exports = getPlayer;
