'use strict';

let mlbRequest = require('./request'),
		find = require('../find');

/**
 * Constructs and makes call to MLB for getting a player.
 * 
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.player_id - ID of player to get.
 * @param {boolean} [options.prune=false] - Whether the data retrieved should be pruned.
 * @returns {Promise} - Promise to be fulfilled with player info object, or error.
 */
function getPlayer(player_id) {
	return new Promise(function (resolve, reject) {

		let url = mlbRequest.build('get', player_id);

		mlbRequest.make(url)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

module.exports = getPlayer;
