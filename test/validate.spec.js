'use strict';

const chai = require('chai'),
	expect = chai.expect,
	validate = require('../utils/validate');

describe('validate', function () {
	describe('_getOptions', function () {
		describe('should return an error if', function () {
			it('no options are provided', function () {
				let options = '';
				let error = validate.getPlayer(options);

				expect(error).to.be.an('Error', 'No options provided.');
			});
			it('options is an invalid type', function () {
				let options = 12345;
				let error = validate.getPlayer(options);

				expect(error).to.be.an('Error', `Expected options to be a string or object, but was given a ${typeof(options)}.`);
			});
			it('options is missing player_id', function () {
				let options = {
					prune: false
				};
				let error = validate.getPlayer(options);

				expect(error).to.be.an('Error', 'No player ID provided.');
			});
			it('player_id is not a string', function () {
				let options = {
					player_id: 12345,
					prune: false
				};
				let error = validate.getPlayer(options);

				expect(error).to.be.an('Error', `Expected player_id to be a string, but was given a ${typeof(options.player_id)}.`);
			});
			it('prune flag is not a boolean', function () {
				let options = {
					player_id: '12345',
					prune: 'false'
				};
				let error = validate.getPlayer(options);

				expect(error).to.be.an('Error', `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
			});
		});
	});
	describe('_rosterOptions', function () {
		describe('should throw an error if', function () {
			it('no options are provided', function () {
				let options = '';
				let expectedErrMessage = 'No options provided.';
				let error = validate.getRoster(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('options is an invalid type', function () {
				let options = 12345;
				let expectedErrMessage = `Expected options to be a string or object, but was given a ${typeof(options)}.`;
				let error = validate.getRoster(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('options is missing team_id', function () {
				let options = {};
				let expectedErrMessage = 'No team_id provided.';
				let error = validate.getRoster(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('team_id is not a string', function () {
				let options = {
					team_id: 12345
				};
				let expectedErrMessage = `Expected team_id to be a string, but was given a ${typeof(options.team_id)}.`;
				let error = validate.getRoster(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('prune flag is not a boolean', function () {
				let options = {
					team_id: '12345',
					prune: 'false'
				};
				let expectedErrMessage = `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`;
				let error = validate.getRoster(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
		});
	});
	describe('_searchOptions', function () {
		describe('should throw an error if', function () {
			it('no options are provided', function () {
				let options = '';
				let expectedErrMessage = 'No options provided.';
				let error = validate.searchPlayer(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('options is an invalid type', function () {
				let options = 12345;
				let expectedErrMessage = `Expected options to be a string or object, but was given a ${typeof(options)}.`;
				let error = validate.searchPlayer(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('options is missing query', function () {
				let options = {};
				let expectedErrMessage = 'No query provided.';
				let error = validate.searchPlayer(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('query is not a string', function () {
				let options = {
					query: 12345
				};
				let expectedErrMessage = `Expected query to be a string, but was given a ${typeof(options.query)}.`;
				let error = validate.searchPlayer(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('active flag is not a boolean', function () {
				let options = {
					query: 'query',
					active: 'false'
				};
				let expectedErrMessage = `Expected active to be a boolean, but was given a ${typeof(options.active)}.`;
				let error = validate.searchPlayer(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('prune flag is not a boolean', function () {
				let options;
				options = {
					query: 'query',
					prune: 'false'
				};
				let expectedErrMessage = `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`;
				let error = validate.searchPlayer(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
		});
	});
	describe('_statsOptions', function () {
		describe('should throw an error if', function () {
			it('no options are provided', function () {
				let options = '';
				let expectedErrMessage = 'No options provided.';
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('options is an invalid type', function () {
				let options = 12345;
				let expectedErrMessage = `Expected options to be a string or object, but was given a ${typeof(options)}.`;
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('options is missing player_id', function () {
				let options = {};
				let expectedErrMessage = 'No player_id provided.';
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('player_id is not a string', function () {
				let options = {
					player_id: 12345
				};
				let expectedErrMessage = `Expected player_id to be a string, but was given a ${typeof(options.player_id)}.`;
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('year is not a string', function () {
				let options = {
					player_id: '12345',
					year: 1234
				};
				let expectedErrMessage = `Expected year to be a string, but was given a ${typeof(options.year)}.`;
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('pitching flag is not a boolean', function () {
				let options = {
					player_id: '12345',
					pitching: 'false'
				};
				let expectedErrMessage = `Expected pitching to be a boolean, but was given a ${typeof(options.pitching)}.`;
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
			it('prune flag is not a boolean', function () {
				let options = {
					player_id: '12345',
					prune: 'false'
				};
				let expectedErrMessage = `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`;
				let error = validate.getStats(options);

				expect(error).to.be.an('Error', expectedErrMessage);
			});
		});
	});
});
