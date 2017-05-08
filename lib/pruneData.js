'use strict';

const prune = require('../utils/prune');

/**
 * Prune a given data object.
 *
 * @public
 * @deprecated - pruneData will be deprecated in future versions. Switch to providing a 'prune' flag to options objects.
 * @param {Object} data - Data you want pruned.
 * @returns {Object} -  Pruned version of the original data.
 * @example <caption>Get a player's latest hitting stats</caption>
 * cornelius.getStats('594798')
 * 	.then(function (data) {
 * 		// do stuff with roster data
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	})
 * @example <caption>Get a player's pitching stats from a given year</caption>
 * var options = {
 * 	player_id: '594798',
 * 	type: 'pitching',
 * 	year: '2015'
 * };
 * 
 * cornelius.getStats(options)
 * 	.then(function (data) {
 * 		// do stuff with roster data	
 * 	})
 * 	.catch(function (error) {
 * 		// handle error
 * 	});
 */
function pruneData (data) {
	let prunedData = prune.handler(data);
	return prunedData;
}

module.exports = pruneData;
