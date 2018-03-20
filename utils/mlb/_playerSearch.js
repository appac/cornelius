const Promise = require('bluebird');
const mlbRequest = require('./request');
const DataTransformer = require('../DataTransformer');

/**
 * Represents options given to MLB Request Builder.
 *
 * @private
 */
class SearchOptions {
    /**
     * Sets fallback values for options properties.
     *
     * @param {object} options
     */
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
 * @return {Promise} - Promise to be fulfilled with search results object, or error.
 */
function playerSearch(options) {
    return new Promise((resolve, reject) => {
        const o = new SearchOptions(options);
        const url = mlbRequest.build('search_player_all', o);

        if (!url) {
            reject(new Error('Error building search_player_all request URL.'));
        }

        mlbRequest.make(url)
            .then((data) => {
                if (o.prune === true) {
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

module.exports = playerSearch;
