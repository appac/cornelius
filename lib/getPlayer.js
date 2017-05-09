'use strict';

const Promise = require('bluebird'),
			validateOptions = require('../utils/validate'),
			mlb = require('../utils/mlb');

/**
 * Get a specific player by ID.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.playerId - Player's ID.
 * @param {boolean} [options.active=true] - Active or historic player.
 * @returns {Object} player_info -  MLB response in JSON format.
 * @example <caption>Get an active player</caption>
 * cornelius.getPlayer('529518')
 * 	.then(function (data) {
 * 		// do stuff with player info
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	})
 * @example <caption>Get a historic player</caption>
 * var options = {
 * 	player_id: '115135',
 * 	active: false
 * };
 * 
 * cornelius.getPlayer(options)
 * 	.then(function (data) {
 * 		// do stuff with player info	
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	});
 */
function getPlayer (options) {
	return new Promise(function (resolve, reject) {

		let error;
		error = validateOptions.getPlayer(options);

		if (error) {
			reject(error);
		}

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
