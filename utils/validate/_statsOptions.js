'use strict';

function validateStatsOptions(options) {
	let error;

	if (!options) {
		error = new Error('No options provided.');
	} else if (typeof options === 'object') {
		if (!options.player_id) {
			error = new Error(`No player_id provided.`);
		} else if (typeof options.player_id !== 'string') {
			error = new Error(`Expected player_id to be a string but was given a '${typeof(options.player_id)}'.`);
		} else if (options.type && typeof options.type !== 'string') {
			error = new Error(`Expected type to be a string but was given a '${typeof(options.type)}'.`);
		} else if (options.year && typeof options.year !== 'string') {
			error = new Error(`Expected year to be a string but was given a '${typeof(options.year)}'.`);
		} else if (options.prune && typeof options.prune !== 'boolean') {
			error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
		}
	} else if (typeof options !== 'string') {
		error = new Error(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
	}

	return error;

}

module.exports = validateStatsOptions;
