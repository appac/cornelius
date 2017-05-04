function validateSearchOptions(options) {
	let error;

	if (typeof options === 'object') {
		if (!options.query) {
			error = new Error(`No query provided.`);
		} else if (typeof options.query !== 'string') {
			error = new Error(`Expected query to be a string, but was given a ${typeof(options.query)}.`);
		} else if (options.active && typeof options.active !== 'boolean') {
			error = new Error(`Expected active to be a boolean, but was given a ${typeof(options.active)}.`)
		}
	} else if (typeof options === 'string') {
		if (!options) {
			error = new Error(`No query provided.`);
		}
	} else {
		error = new Error(`Expected options to be an object or string, but was given a ${typeof(options)}.`);
	}

	return error;

}

module.exports = validateSearchOptions;
