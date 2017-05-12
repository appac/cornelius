'use strict';

const Promise = require('bluebird'),
			mlb = require('../utils/mlb');

/**
 * @name cornelius.getRoster
 * @description Takes a team's ID, name, or abbreviated name, and returns their 40 man roster. 
 * 
 *`options` can be an object or a string. If it's a string it will return the roster with short form player objects -- just a name and ID. 
 * @summary Get a team's 40 man roster.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.team_id - Team's ID, name, or abbreviation.
 * @param {boolean} [options.full=false] - Return full player info with roster.
 * @param {boolean} [options.prune=false] - Prune the data.
 * @returns {Object} `roster_40` -  MLB response in JSON format.
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
