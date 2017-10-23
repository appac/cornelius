'use strict';

let mlbRequest = require('./request'),
    pruneData = require('../prune/'),
    validate = require('../validator');

/**
 * Constructs and makes call to MLB for player search.
 *
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.query - Search term to use.
 * @param {boolean} [options.active=true] - Active or historic player.
 * @param {boolean} [options.prune=false] - Whether the data retrieved should be pruned.
 * @returns {Promise} - Promise to be fulfilled with search results object, or error.
 */
function playerSearch(options) {
    return new Promise(function (resolve, reject) {
        validate.searchOptions(options, (err) => {
            if (err) {
                reject(err);
            }
        });

        let url = mlbRequest.build('search', options);

        if (!url) {
            reject(new Error('Error building search_player_all request URL.'));
        }

        mlbRequest.make(url)
            .then(data => {
                if (options.prune === true) {
                    data = pruneData.searchResults(data);
                }
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });

    });
}

module.exports = playerSearch;
