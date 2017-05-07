'use strict';

let mlbRequest = require('./request'),
	find = require('../find');

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
