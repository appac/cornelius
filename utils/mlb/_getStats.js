'use strict';

let mlbRequest = require('./request'),
		find = require('../find');

/**
 * Constructs and makes call to MLB for stats.
 * 
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get stats for.
 * @param {string} [options.type='hitting'] - The type of stats to get.
 * @param {string} [options.year] - The season to get stats for.
 * @returns {Promise} - Promise to be fulfilled with player stats object, or error.
 */
function getStats (options) {
	return new Promise (function (resolve, reject) {
		let url;
		
		if (options.type === 'pitching') {
			url = mlbRequest.build('statsPitching', options); 
		} else {
			url = mlbRequest.build('statsHitting', options);
		}

		mlbRequest.make(url)
			.then(data => {
				if (options.year) {
					resolve(data);
				} else {
					let latestStats = find.latestStats(data);
					resolve(latestStats);
				}
			})
			.catch(error => {
				reject(error);
			});
	});
}

module.exports = getStats;
