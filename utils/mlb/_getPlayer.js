'use strict';

let mlbRequest = require('./request'),
		find = require('../find'),
		pruneData = require('../prune'),
		validate = require('../validate');

/**
 * Constructs and makes call to MLB for getting a player.
 * 
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get.
 * @param {boolean} [options.prune=false] - Whether the data retrieved should be pruned.
 * @returns {Promise} - Promise to be fulfilled with player info object, or error.
 */
function getPlayer(options) {
	validate.getPlayer(options);
	return new Promise(function (resolve, reject) {
		let url = mlbRequest.build('get', options);

		mlbRequest.make(url)
			.then(data => {
				if (options.prune === true) {
					data = pruneData.handler(data);
				}
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

module.exports = getPlayer;
