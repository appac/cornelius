let validateSearchOptions = require('./_searchOptions'),
		validateGetOptions = require('./_getOptions'),
		validateStatsOptions = require('./_statsOptions'),
		validateRosterOptions = require('./_rosterOptions');

function validationHandler (type, options) {
	switch (type) {
		case 'search':
			return validateSearchOptions(options);
			break;
		case 'get':
			return validateGetOptions(options);
			break;
		case 'roster':
			return validateRosterOptions(options);
			break;
		case 'stats':
			return validateStatsOptions(options);
		default:
			return new Error(`Invalid type '${type}', cannot validate.`);
			break;
	}

}

module.exports = validationHandler;
