'use strict';

const Promise = require('bluebird'),
    mlb = require('../utils/mlb');

/**
 * @name cornelius.getRoster
 * @description Takes a team's ID and returns their 40 man roster.
 *
 * `options` should be an object.
 * If you provide no team ID, or an incorrect one, `getRoster` returns an empty array.
 * @summary Get a team's 40 man roster.
 *
 * @public
 * @param {Object} options - Options object.
 * @param {string} options.team_id - Team's ID.
 * @param {boolean} [options.short=false] - Return full player info with roster.
 * @param {boolean} [options.prune=true] - Prune the data.
 * @returns {Array | Object} - Pruned roster *or* MLB `roster_40` JSON data.
 * @example <caption>Get a team's roster by ID</caption>
 * cornelius.getRoster({ team_id: '121' }) // New York Mets
 *   .then(function (data) {
 *     // do stuff with roster data
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   });
 */
function getRoster(options) {
    return new Promise(function (resolve, reject) {
        mlb.roster(options)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = getRoster;
