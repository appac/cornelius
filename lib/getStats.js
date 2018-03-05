'use strict';

const Promise = require('bluebird'),
    mlb = require('../utils/mlb');

/**
 * @name cornelius.getStats
 * @description Takes a player's ID and returns their stats.
 *
 * `options` should be an object.
 * If you provide no player ID, or an incorrect one, `getStats` returns an empty array. 
 * If no year is provided, `getStats` returns all available stats for the given player.
 * @summary Get a player's stats.
 *
 * @public
 * @param {Object} options - Options object.
 * @param {string} options.player_id - Player's ID.
 * @param {string} [options.year] - The season to get stats for.
 * @param {boolean} [options.pitching=false] - Return pitching stats instead.
 * @param {boolean} [options.prune=true] - Prune the data.
 * @return {Array | Object} - Array of pruned stats *or* MLB `sport_[statType]_tm` JSON data.
 * @example <caption>Get a player's hitting stats</caption>
 * cornelius.getStats({ player_id: '493316' })
 *   .then(function (data) {
 *     // do stuff with stats data
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   });
 * @example <caption>Get a player's pitching stats for the 2017 season</caption>
 * cornelius.getStats({ player_id: '592789', pitching: true, year: '2017' })
 *   .then(function (data) {
 *     // do stuff with stats data
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   });
 */
function getStats(options) {
    return new Promise(function (resolve, reject) {
        mlb.stats(options)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = getStats;
