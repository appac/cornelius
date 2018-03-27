const Promise = require('bluebird');
const mlbRequest = require('./request');
const DataTransformer = require('../DataTransformer');
const GetRosterOptions = require('../Options').GetRosterOptions;

/**
 * Constructs and makes call to MLB for a roster.
 *
 * @private
 * @param {Object} options - The options to make the request with.
 * @param {string} options.team_id - ID of team to get roster for.
 * @param {boolean} [options.short=false] - Whether players in the roster should have their full info.
 * @param {boolean} [options.prune=true] - Whether the data received should be pruned.
 * @return {Promise} - Promise to be fulfilled with roster data, or error.
 */
function getRoster(options) {
    return new Promise(function(resolve, reject) {
        const opts = new GetRosterOptions(options);
        const url = mlbRequest.build(opts.endpoint, opts);

        if (!url) {
            reject(new Error(`Error building ${opts.endpoint} request URL.`));
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

module.exports = getRoster;
