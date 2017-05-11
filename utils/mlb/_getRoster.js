'use strict';

let mlbRequest = require('./request'),
		find = require('../find'),
		pruneData = require('../prune');

/**
 * Constructs and makes call to MLB for a roster.
 * 
 * @private
 * @param {Object|string} options - The options to make the request with.
 * @param {string} options.team_id - ID of team to get roster for.
 * @param {boolean} [options.full=true] - Whether players in the roster should have their full info.
 * @param {boolean} [options.prune=false] - Whether the data should be pruned.
 * @returns {Promise} - Promise to be fulfilled with team roster object, or error.
 */
function getRoster (options) {
	return new Promise(function (resolve, reject) {
		let teamID = find.matchingTeamId(options.team_id || options);

		options.team_id = teamID;

		let url = mlbRequest.build('roster', options);

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

module.exports = getRoster;
