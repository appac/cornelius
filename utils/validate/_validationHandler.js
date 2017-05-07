'use strict';

let validateSearchOptions = require('./_searchOptions'),
		validateGetOptions = require('./_getOptions'),
		validateStatsOptions = require('./_statsOptions'),
		validateRosterOptions = require('./_rosterOptions');

function validationHandler (type, options) {
	switch (type) {
		case 'search':
			return validateSearchOptions(options);
		case 'get':
			return validateGetOptions(options);
		case 'roster':
			return validateRosterOptions(options);
		case 'stats':
			return validateStatsOptions(options);
		default:
			return new Error(`Invalid type '${type}', cannot validate.`);
	}

}

module.exports = validationHandler;
