'use strict';

/**
 * Checks method options are valid, throws error if not.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|undefined} - An error, or undefined if validation successful.
 */
function validateSearchOptions(options) {
	let error;
	
	if (!options) {
		error = new Error('No options provided.');
	} else if (typeof options === 'object') {
		if (!options.query) {
			error = new Error('No query provided.');
		} else if (typeof options.query !== 'string') {
			error = new Error(`Expected query to be a string, but was given a ${typeof(options.query)}.`);
		} else if (options.active && typeof options.active !== 'boolean') {
			error = new Error(`Expected active to be a boolean, but was given a ${typeof(options.active)}.`);
		} else if (options.prune && typeof options.prune !== 'boolean') {
			error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
		}
	} else if (typeof options !== 'string') {
		error = new Error(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
	}

	if (error) {
		return error;
	}

	return;

}

module.exports = validateSearchOptions;
