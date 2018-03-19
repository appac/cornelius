const mlbRequest = require('./request');
const PlayerDataTransformer = require('../transformers/PlayerDataTransformer');

/**
 * Represents options given to MLB Request Builder.
 */
class PlayerOptions {
    /**
     * Sets fallback values for options properties.
     *
     * @param {object} options
     */
    constructor(options) {
        this.player_id = options.player_id || -1;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.prune === 'boolean')) ? options.prune : true;
    }
}

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
        const o = new PlayerOptions(options);
        const url = mlbRequest.build('player_info', o);

        if (!url) {
            reject(new Error('Error building player_info request URL.'));
        }

        mlbRequest.make(url)
            .then((data) => {
                if (o.prune === true) {
                    const dataTransformer = new PlayerDataTransformer(data);
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
