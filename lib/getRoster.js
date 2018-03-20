'use strict';

const Promise = require('bluebird');
const mlb = require('../utils/mlb');

/**
 * @name cornelius.getRoster
 * @description Takes a team's ID and returns their 40 man, or all time roster.
 *
 * The `season` property is a string of two years which mark the start and end seasons of the
 * all time rosters you're requesting. Providing a single year will return only that years roster.
 *
 * Omitting the `season` property will return a team's current 40 man roster.
 *
 * `options` should be an object.
 * If you provide no team ID, or an incorrect one, `getRoster` returns an empty array.
 * @summary Get a team's 40 man roster.
 *
 * @public
 * @param {Object} options - Options object.
 * @param {string} options.team_id - Team's ID.
 * @param {string} [options.season] - Season to get roster for.
 * @param {boolean} [options.short=false] - Return full player info with roster.
 * @param {boolean} [options.prune=true] - Prune the data.
 * @return {Array | Object} - Pruned roster *or* MLB `roster_40` | `roster_team_alltime` JSON data.
 * @example <caption>Get a team's roster by ID</caption>
 * cornelius.getRoster({ team_id: '121' }) // New York Mets
 *   .then(function (data) {
 *     // do stuff with roster data
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   });
 * @example <caption>Get a team's cumulative roster for the seasons beginning 2016 and ending 2017</caption>
 * cornelius.getRoster({ team_id: '121', season: '2016 2017' })
 *   .then(function(data) {
 *     // do stuff with roster data
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   });
 */
function getRoster(options) {
    return new Promise((resolve, reject) => {
        mlb.roster(options)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = getRoster;
