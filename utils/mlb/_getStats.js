'use strict';

let mlbRequest = require('./request'),
		find = require('../find'),
		pruneData = require('../prune');

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

		url = mlbRequest.build('stats', options);

		mlbRequest.make(url)
			.then(data => {
				if (!options.year) {
					data = find.latestStats(data);
				}
				if (options.prune) {
					data = pruneData.handler(data);
				}
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});
	});
}

module.exports = getStats;
