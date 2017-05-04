function validateGetOptions (options) {
	let error;

	if (typeof options !== 'string') {
		error = new Error(`Expected player_id to be a string, but was given a ${typeof(options)}.`);
	}

	return error;

}

module.exports = validateGetOptions;
