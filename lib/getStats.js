'use strict';

const Promise = require('bluebird'),
			validation = require('../utils/validate'),
			mlb = require('../utils/mlb');

/**
 * Get a player's stats.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.player_id - Team's ID, name, or abbreviation.
 * @param {string} [options.type=hitting] - Return full player info with roster.
 * @returns {Object} sport_[stat_type]_tm -  MLB response in JSON format.
 * @example <caption>Get a player's latest hitting stats</caption>
 * cornelius.getStats('594798')
 * 	.then(function (data) {
 * 		// do stuff with roster data
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	})
 * @example <caption>Get a player's pitching stats from a given year</caption>
 * var options = {
 * 	player_id: '594798',
 * 	type: 'pitching',
 * 	year: '2015'
 * };
 * 
 * cornelius.getStats(options)
 * 	.then(function (data) {
 * 		// do stuff with roster data	
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	});
 */
function getStats (options) {
	return new Promise(function (resolve, reject) {

		let error;
		error = validation.handler('stats', options);

		if (error) {
			reject(error);
		}

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
