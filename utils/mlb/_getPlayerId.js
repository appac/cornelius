'use strict';

let mlbRequest = require('./request'),
	find = require('../find');

/**
 * Constructs and makes call to MLB for getting a player's ID. This function is basically a search that we then look through the results for.
 * 
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.query - Search term to use.
 * @param {string} options.key - Key to match to.
 * @returns {Promise} - Promise to be fulfilled with search results object, or error.
 */
function getPlayerId(options) {
	return new Promise(function (resolve, reject) {

		let url = mlbRequest.build('search', options);

		mlbRequest.make(url)
			.then(data => {
				let hasResults = data.search_player_all.queryResults.totalSize > 0;
				if (hasResults) {
					let playerId = find.matchingPlayerId(data, options);
					data = playerId;
				}
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

module.exports = getPlayerId;
