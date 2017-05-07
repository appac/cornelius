'use strict';

function validateRosterOptions(options) {
	let error;

	if (typeof options === 'object') {
		if (!options.team_id) {
			error = new Error('No team_id provided.');
		} else if (typeof (options.team_id) !== 'string') {
			error = new Error(`Expected team_id to be a string, but was given a ${typeof(options.key)}.`);
		} else if (options.full && typeof (options.full) !== 'boolean') {
			error = new Error(`Expected full to be a boolean, but was given a ${typeof(options.full)}.`);
		}
	} else if (typeof options === 'string') {
		if (!options) {
			error = new Error(`No team_id provided.`);
		}
	} else {
		error = new Error(`Expected options to be an object or string, but was given a ${typeof(options)}.`);
	}

	return error;

}

module.exports = validateRosterOptions;
