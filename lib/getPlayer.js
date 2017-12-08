'use strict';

const Promise = require('bluebird'),
    mlb = require('../utils/mlb');

/**
 * @name cornelius.getPlayer
 * @description Takes a player's ID and returns their information.
 *
 * `options` should be an object.
 * If you provide no player ID, or an incorrect one, `getPlayer` will return
 * an empty object.
 * @summary Get a specific player by ID.
 *
 * @public
 * @param {Object} options - Options object.
 * @param {string} options.player_id - Player's ID.
 * @param {boolean} [options.prune=true] - Prune the data.
 * @returns {Object} - Pruned player object *or* MLB `player_info` JSON data.
 * @example <caption>Get a player by ID</caption>
 * cornelius.getPlayer({ player_id: '529518' })
 *  .then(function (data) {
 *   // do stuff with player info
 *  })
 *  .catch(function (error) {
 *   // handle error
 *  });
 */
function getPlayer(options) {
    return new Promise(function (resolve, reject) {
        mlb.player(options)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });

    });
}

module.exports = getPlayer;
