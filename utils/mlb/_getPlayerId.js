'use strict';

let mlbRequest = require('./request'),
	find = require('../find');

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
