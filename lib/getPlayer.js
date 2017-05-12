'use strict';

const Promise = require('bluebird'),
			mlb = require('../utils/mlb');

/**
 * @name cornelius.getPlayer
 * @description Takes a player's ID and returns their information.
 * 
 * `options` can be an object or a string. If it's a string, it will return a players raw information.
 * 
 * @summary Get a specific player by ID.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.player_id - Player's ID.
 * @param {boolean} [options.prune=false] - Prune the data.
 * @returns {Object} `player_info` -  MLB response in JSON format.
 * @example <caption>Get a player by ID</caption>
 * cornelius.getPlayer('529518')
 *  .then(function (data) {
 * 	 // do stuff with player info
 *  })
 *  .catch(function (error) {
 * 	 // handle error
 *  });
 */
function getPlayer (options) {
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
