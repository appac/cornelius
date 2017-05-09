'use strict';

let mlbRequest = require('./request'),
		find = require('../find');

/**
 * Constructs and makes call to MLB for player search.
 * 
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.query - Search term to use.
 * @param {boolean} [options.active=true] - Active or historic player.
 * @param {boolean} [options.prune=false] - Whether the data retrieved should be pruned.
 * @returns {Promise} - Promise to be fulfilled with search results object, or error.
 */
function playerSearch(options) {
	return new Promise(function (resolve, reject) {

		let url = mlbRequest.build('search', options);

		mlbRequest.make(url)
			.then(data => {
				let hasResults = data.search_player_all.queryResults.totalSize > 0;
				if (hasResults) {
					if (options.key) {
						let requestedPlayer = find.matchingPlayer(data, options);
						data = requestedPlayer;
					}
				}
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

module.exports = playerSearch;
