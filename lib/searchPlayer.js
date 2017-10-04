'use strict';

const Promise = require('bluebird'),
	mlb = require('../utils/mlb');

/**
 * @name cornelius.searchPlayer
 * @description Takes a search term (player name) and returns search results.
 * 
 * `options` can be an object or a string. If it's a string it will return search results of active players that match the search term.
 * If the prune flag is set to `true` but there are no search results, you'll get an empty array.
 * @summary Search for a player by name.
 *
 * @public
 * @param {Object|string} options
 * @param {string} options.query - Player name.
 * @param {boolean} [options.active=true] - Active or historic players.
 * @param {boolean} [options.prune=false] - Prune the data.
 * @returns {Object} `search_player_all` - MLB response in JSON format.
 * @example <caption>Active player search</caption>
 * cornelius.searchPlayer('wright')
 *   .then(function (data) {
 * 	   // do stuff with search results
 *   })
 *   .catch(function (error) {
 * 	   // handle error
 *   });
 * @example <caption>Historic player search</caption>
 * var options = {
 * 		query: 'williams',
 * 		active: false
 * 	};
 *
 * cornelius.searchPlayer(options)
 * 		.then(function (data) {
 * 			// do stuff with search results
 * 		})
 * 		.catch(function (error) {
 * 			// handle error
 * 		});
 */
function searchPlayer (options) {
	return new Promise(function (resolve, reject) {
		mlb.search(options)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

module.exports = searchPlayer;
