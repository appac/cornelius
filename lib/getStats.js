'use strict';

const Promise = require('bluebird'),
			mlb = require('../utils/mlb');

/**
 * @name cornelius.getStats
 * @description Takes a player's ID and returns their stats.
 *  
 * `options` can be an object or a string. If it's a string, it will return the player's latest *hitting* stats. 
 * @summary Get a player's stats.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.player_id - Player's ID.
 * @param {string} [options.year] - The season to get stats for.
 * @param {boolean} [options.pitching=false] - Return pitching stats instead.
 * @param {boolean} [options.prune=false] - Prune the data.
 * @returns {Object} `sport_[stat_type]_tm` -  MLB response in JSON format.
 * @example <caption>Get a player's latest hitting stats</caption>
 * cornelius.getStats('594798')
 * 	.then(function (data) {
 * 		// do stuff with stats data
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	})
 * @example <caption>Get a player's pitching stats from a given year</caption>
 * var options = {
 * 	player_id: '594798',
 * 	pitching: true,
 * 	year: '2015'
 * };
 * 
 * cornelius.getStats(options)
 * 	.then(function (data) {
 * 		// do stuff with stats data	
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	});
 */
function getStats (options) {
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
