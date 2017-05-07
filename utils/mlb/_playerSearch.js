/* jslint node: true */
/* jslint esversion: 6 */

'use strict';

let mlbRequest = require('./request'),
		find = require('../find');

function playerSearch (options) {
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
