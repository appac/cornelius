'use strict';

let mlbRequest = require('./request'),
    prune = require('../prune');

class SearchOptions {
    constructor(options) {
        this.query = options.query || null;
        this.active = (options.hasOwnProperty('active') && typeof (options.active === 'boolean')) ? options.active : true;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.active === 'boolean')) ? options.prune : true;
    }
}
/**
 * Constructs and makes call to MLB for player search.
 *
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.query - Search term to use.
 * @param {boolean} [options.active=true] - Active or historic player.
 * @param {boolean} [options.prune=true] - Whether the data retrieved should be pruned.
 * @returns {Promise} - Promise to be fulfilled with search results object, or error.
 */
function playerSearch(options) {
    return new Promise(function (resolve, reject) {
        const o = new SearchOptions(options),
            url = mlbRequest.build('search_player_all', o);

        if (!url) {
            reject(new Error('Error building search_player_all request URL.'));
        }

        mlbRequest.make(url)
            .then(data => {
                if (o.prune === true) {
                    data = prune(data);
                }
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });

    });
}

module.exports = playerSearch;
