'use strict';

/**
 * Checks method options are valid, throws error if not.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|undefined} - An error or undefined if validation successful.
 */
function validateRosterOptions(options) {
	let error;
	
	if (!options) {
		error = new Error('No options provided.');
	} else if (typeof options === 'object') {
		if (!options.team_id) {
			error = new Error('No team_id provided.');
		} else if (typeof options.team_id !== 'string') {
			error = new Error(`Expected team_id to be a string, but was given a ${typeof(options.team_id)}.`);
		} else if (options.full && typeof options.full !== 'boolean') {
			error = new Error(`Expected full to be a boolean, but was given a ${typeof(options.full)}.`);
		} else if (options.prune && typeof options.prune !== 'boolean') {
			error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
		}
	} else if (typeof options !== 'string') {
		error = new Error(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
	}

	return error;

}

module.exports = validateRosterOptions;
