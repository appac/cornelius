'use strict';

/**
 * Checks method options are valid, throws error if not.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|undefined} - An error or undefined if validation successful.
 */
function validateGetOptions(options) {
	let error;

	if (!options) {
		error = new Error('No options provided.');
	} else if (typeof options == 'object') {
		if (!options.player_id) {
			error = new Error('No player ID provided.');
		} else if (typeof options.player_id !== 'string') {
			error = new Error(`Expected player_id to be a string, but was given a ${typeof(options.player_id)}.`);
		} else if (options.prune && typeof options.prune !== 'boolean') {
			error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
		}
	} else if (typeof options !== 'string') {
		error = new Error(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
	}

	if (error) {
		throw error;
	} else {
		return;
	}

}

module.exports = validateGetOptions;
