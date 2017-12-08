'use strict';

const Promise = require('bluebird'),
    mlb = require('../utils/mlb');

/**
 * @name cornelius.playerSearch
 * @description Search for players by name.
 *
 * `options` should be an object.
 * If you provide no search query, `playerSearch` will return an empty array.
 * @summary Search for a player by name.
 *
 * @public
 * @param {Object} options - Options object.
 * @param {string} options.query - Player name.
 * @param {boolean} [options.active=true] - Set to false for historic players.
 * @param {boolean} [options.prune=true] - Prune the data.
 * @returns {Array | Object} - Array of pruned search results *or* MLB `search_player_all` JSON data.
 * @example <caption>Active player search</caption>
 * cornelius.playerSearch({ query: 'wright' })
 *   .then(function (data) {
 *      // do stuff with search results
 *   })
 *   .catch(function (error) {
 *      // handle error
 *   });
 * @example <caption>Historic player search</caption>
 * cornelius.playerSearch({ query: 'williams', active: false })
 *     .then(function (data) {
 *       // do stuff with search results
 *     })
 *     .catch(function (error) {
 *       // handle error
 *     });
 */
function playerSearch(options) {
    return new Promise(function (resolve, reject) {
        mlb.search(options)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = playerSearch;
