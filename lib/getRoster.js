'use strict';

const Promise = require('bluebird'),
			validation = require('../utils/validate'),
			mlb = require('../utils/mlb');

/**
 * Get a team's 40 man roster.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.team_id - Team's ID, name, or abbreviation.
 * @param {boolean} [options.full=false] - Return full player info with roster.
 * @returns {Object} roster_40 -  MLB response in JSON format.
 * @example <caption>Get a team's roster by abbreviation</caption>
 * // 'New York Mets' or '121' would also be accepted
 * cornelius.getRoster('nym')
 * 	.then(function (data) {
 * 		// do stuff with roster data
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	})
 * @example <caption>Get a team's roster with full player info</caption>
 * var options = {
 * 	team_id: '121',
 * 	full: true
 * };
 * 
 * cornelius.getRoster(options)
 * 	.then(function (data) {
 * 		// do stuff with roster data	
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	});
 */
function getRoster (options) {
	return new Promise(function (resolve, reject) {

		let error;
		error = validation.handler('roster', options);

		if (error) {
			reject(error);
		}

		mlb.roster(options)
			.then(function (data) {
				resolve(data);
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

module.exports = getRoster;
