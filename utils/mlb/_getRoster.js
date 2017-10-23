'use strict';

let mlbRequest = require('./request'),
    find = require('../find'),
    pruneData = require('../prune'),
    validate = require('../validate');

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
        validate.rosterOptions(options, (err) => {
            if (err) {
                reject(err);
            }
        });

        let teamID = find.matchingTeamId(options.team_id || options);
        
        if (!teamID) {
            reject(`No team matching '${options.team_id || options}' was found.`);
        }

        let buildOptions = {
            team_id: teamID,
            full: options.full
        };

        let url = mlbRequest.build('roster', buildOptions);

        if (!url) {
            reject(new Error('Error building roster_40 request URL.'));
        }

        mlbRequest.make(url)
            .then(data => {
                if (options.prune === true) {
                    data = pruneData.roster(data);
                }
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });

    });
}

module.exports = getRoster;
