/* jslint node: true */
/* jslint esversion: 6 */

'use strict';

function validateStatsOptions(options) {
	let error;

	if (typeof options === 'object') {
		if (!options.player_id) {
			error = new Error(`No player_id provided.`);
		} else if (typeof (options.player_id) !== 'string') {
			error = new Error(`Expected player_id to be a string but was given a '${typeof(options.player_id)}'.`)
		} else if (options.type && typeof (options.type) !== 'string') {
			error = new Error(`Expected type to be a string but was given a '${typeof(options.type)}'.`)
		} else if (options.year && typeof (options.year) !== 'string') {
			error = new Error(`Expected year to be a string but was given a '${typeof(options.year)}'.`)
		}
	} else if (typeof options === 'string') {
		if (!options) {
			error = new Error(`No player_id provided.`);
		}
	} else {
		error = new Error(`Expected options to be an object or string, but was given a ${typeof(options)}.`);
	}

	return error;

}

module.exports = validateStatsOptions;