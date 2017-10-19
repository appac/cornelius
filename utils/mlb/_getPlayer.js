'use strict';

let mlbRequest = require('./request'),
    pruneData = require('../prune'),
    validate = require('../validate');

/**
 * Constructs and makes call to MLB for getting a player.
 *
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get.
 * @param {boolean} [options.prune=false] - Whether the data retrieved should be pruned.
 * @returns {Promise} - Promise to be fulfilled with player info object, or error.
 */
function getPlayer(options) {
    return new Promise(function (resolve, reject) {
        let error = validate.getPlayer(options);

        if (error) {
            reject(error);
        }

        let url = mlbRequest.build('get', options);

        if (!url) {
            reject(new Error('Error building player_info request URL.'));
        }

        mlbRequest.make(url)
            .then(data => {
                if (options.prune === true) {
                    data = pruneData.playerInfo(data);
                }
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });

    });
}

module.exports = getPlayer;
