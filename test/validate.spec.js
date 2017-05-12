'use strict';

const chai = require('chai'),
			expect = chai.expect,
			validate = require('../utils/validate');

describe('validate', function () {
	describe('_getOptions', function () {
		describe('should throw an error if', function () {
			it('no options are provided', function () {
				let options = '';
				expect(function () {validate.getPlayer(options)})
					.to.throw('No options provided.');
			});
			it('options is an invalid type', function () {
				let options = 12345;
				expect(function () {validate.getPlayer(options)})
					.to.throw(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
			});
			it('options is missing player_id', function () {
				let options = {
					prune: false
				};
				expect(function () {validate.getPlayer(options)})
				.to.throw('No player ID provided.');
			});
			it('player_id is not a string', function () {
				let options = {
					player_id: 12345,
					prune: false
				};
				expect(function () {validate.getPlayer(options)})
					.to.throw(`Expected player_id to be a string, but was given a ${typeof(options.player_id)}.`);
			});
			it('prune flag is not a boolean', function () {
				let options = {
					player_id: '12345',
					prune: 'false'
				};
				expect(function () {validate.getPlayer(options)})
					.to.throw(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`)
			});
		});
	});
	describe('_rosterOptions', function () {
		describe('should throw an error if', function () {
			it ('no options are provided', function () {
			let options = '';
			expect(function () {validate.getRoster(options)})
				.to.throw('No options provided.');
			});
			it('options is an invalid type', function () {
				let options = 12345;
				expect(function () {validate.getRoster(options)})
					.to.throw(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
			});
			it('options is missing team_id', function () {
				let options = {};
				expect(function () {validate.getRoster(options)})
					.to.throw('No team_id provided.');
			});
			it('team_id is not a string', function () {
				let options = {
					team_id: 12345
				};
				expect(function () {validate.getRoster(options)})
					.to.throw(`Expected team_id to be a string, but was given a ${typeof(options.team_id)}.`);
			});
			it('prune flag is not a boolean', function () {
				let options = {
					team_id: '12345',
					prune: 'false'
				};
				expect(function () {validate.getRoster(options)})
					.to.throw(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
			});
		});
	});
	describe('_searchOptions', function () {
		describe('should throw an error if', function () {
			it('no options are provided', function () {
				let options = '';
				expect(function () {validate.searchPlayer(options)})
					.to.throw('No options provided.');
			});
			it('options is an invalid type', function () {
				let options = 12345;
				expect(function () {validate.searchPlayer(options)})
					.to.throw(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
			});
			it('options is missing query', function () {
				let options = {};
				expect(function () {validate.searchPlayer(options)})
					.to.throw('No query provided.');
			});
			it('query is not a string', function () {
				let options = {
					query: 12345
				};
				expect(function () {validate.searchPlayer(options)})
					.to.throw(`Expected query to be a string, but was given a ${typeof(options.query)}.`);
			});
			it('active flag is not a boolean', function () {
				let options = {
					query: 'query',
					active: 'false'
				};
				expect(function () {validate.searchPlayer(options)})
					.to.throw(`Expected active to be a boolean, but was given a ${typeof(options.active)}.`);
			});
			it('prune flag is not a boolean', function () {
				let options;
				options = {
					query: 'query',
					prune: 'false'
				};
				expect(function () {validate.searchPlayer(options)})
					.to.throw(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
			});
		});
	});
	describe('_statsOptions', function () {
		describe('should throw an error if', function () {
			it('no options are provided', function () {
				let options = '';
				expect(function () {validate.getStats(options)})
					.to.throw('No options provided.');
			});
			it('options is an invalid type', function () {
				let	options = 12345;
				expect(function () {validate.getStats(options)})
					.to.throw(`Expected options to be a string or object, but was given a ${typeof(options)}.`);
			});
			it('options is missing player_id', function () {
				let options = {};
				expect(function () {validate.getStats(options)})
					.to.throw('No player_id provided.');
			});
			it('player_id is not a string', function () {
				let options = {
					player_id: 12345
				};
				expect(function () {validate.getStats(options)})
					.to.throw(`Expected player_id to be a string, but was given a ${typeof(options.player_id)}.`);
			});
			it('year is not a string', function () {
				let options = {
					player_id: '12345',
					year: 1234
				};
				expect(function () {validate.getStats(options)})
					.to.throw(`Expected year to be a string, but was given a ${typeof(options.year)}.`);
			});
			it('pitching flag is not a boolean', function () {
				let options = {
					player_id: '12345',
					pitching: 'false'
				};
				expect(function () {validate.getStats(options)})
					.to.throw(`Expected pitching to be a boolean, but was given a ${typeof(options.pitching)}.`);
			});
			it('prune flag is not a boolean', function () {
				let options = {
					player_id: '12345',
					prune: 'false'
				};
				expect(function () {validate.getStats(options)})
					.to.throw(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
			});
		});
	});
});
