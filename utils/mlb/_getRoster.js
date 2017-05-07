/* jslint node: true */
/* jslint esversion: 6 */

'use strict';

let mlbRequest = require('./request'),
		find = require('../find');

function getRoster (options) {
	return new Promise(function (resolve, reject) {
		let teamID = find.matchingTeamId(options.key || options);

		options = {
			key: teamID,
			full: options.full
		}

		let url = mlbRequest.build('roster', options);

		mlbRequest.make(url)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

module.exports = getRoster;
