'use strict';

let mlbRequest = require('./request'),
    prune = require('../prune');

class RosterOptions {
    constructor(options) {
        this.team_id = options.team_id || -1;
        this.short = (options.hasOwnProperty('short') && typeof (options.full === 'boolean')) ? options.short : false;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.prune === 'boolean')) ? options.prune : true;
        this.endpoint = (options.hasOwnProperty('season') ? 'roster_team_alltime' : 'roster_40');
    }
}

/**
 * Constructs and makes call to MLB for a roster.
 *
 * @private
 * @param {Object} options - The options to make the request with.
 * @param {string} options.team_id - ID of team to get roster for.
 * @param {boolean} [options.short=false] - Whether players in the roster should have their full info.
 * @param {boolean} [options.prune=true] - Whether the data received should be pruned. 
 * @returns {Promise} - Promise to be fulfilled with roster data, or error.
 */
function getRoster(options) {
    return new Promise(function (resolve, reject) {
        const o = new RosterOptions(options),
            url = mlbRequest.build(o.endpoint, o);

        if (!url) {
            reject(new Error(`Error building ${o.endpoint} request URL.`));
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
