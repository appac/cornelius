'use strict';

let mlbRequest = require('./request'),
    prune = require('../prune');

class RosterOptions {
    constructor(options) {
        this.team_id = options.team_id || null;
        this.full = (options.hasOwnProperty('full') && typeof (options.full === 'boolean')) ? options.full : true;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.prune === 'boolean')) ? options.prune : true;
    }
}

/**
 * Constructs and makes call to MLB for a roster.
 *
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.team_id - ID of team to get roster for.
 * @param {boolean} [options.full=true] - Whether players in the roster should have their full info.
 * @param {boolean} [options.prune=false] - Whether the data should be pruned.
 * @returns {Promise} - Promise to be fulfilled with roster data, or error.
 */
function getRoster(options) {
    return new Promise(function (resolve, reject) {
        const o = new RosterOptions(options);

        const url = mlbRequest.build('roster_40', o);
        if (!url) {
            reject(new Error('Error building roster_40 request URL.'));
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

module.exports = getRoster;
