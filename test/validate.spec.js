'use strict';

const chai = require('chai'),
    expect = chai.expect,
    validate = require('../utils/validate');

describe('validate', function () {
    describe('searchOptions', function () {
        describe('should return an error if', function () {
            it('no options are provided', function () {
                let options = '';
                validate.searchOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No options provided.');
                });
            });
            it('options is an invalid type', function () {
                let options = 12345;
                validate.searchOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected options to be a string or object, but was given a ${typeof (options)}.`);
                });
            });
            it('options is missing query', function () {
                let options = {};
                validate.searchOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No query provided.');
                });
            });
            it('query is not a string', function () {
                let options = {
                    query: 12345
                };
                validate.searchOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected query to be a string, but was given a ${typeof (options.query)}.`);
                });
            });
            it('active flag is not a boolean', function () {
                let options = {
                    query: 'query',
                    active: 'false'
                };
                validate.searchOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected active to be a boolean, but was given a ${typeof (options.active)}.`);
                });
            });
            it('prune flag is not a boolean', function () {
                let options;
                options = {
                    query: 'query',
                    prune: 'false'
                };
                validate.searchOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
                });
            });
        });
    });

    describe('playerOptions', function () {
        describe('should return an error if', function () {
            it('no options are provided', function () {
                let options = '';
                validate.playerOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No options provided.');
                });
            });
            it('options is an invalid type', function () {
                let options = 12345;
                validate.playerOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected options to be a string or object, but was given a ${typeof (options)}.`);
                });
            });
            it('options is missing player_id', function () {
                let options = {
                    prune: false
                };
                validate.playerOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No player ID provided.');
                });
            });
            it('player_id is not a string', function () {
                let options = {
                    player_id: 12345,
                    prune: false
                };
                validate.playerOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected player_id to be a string, but was given a ${typeof (options.player_id)}.`);
                });
            });
            it('prune flag is not a boolean', function () {
                let options = {
                    player_id: '12345',
                    prune: 'false'
                };
                validate.playerOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
                });
            });
        });
    });

    describe('rosterOptions', function () {
        describe('should return an error if', function () {
            it('no options are provided', function () {
                let options = '';
                validate.rosterOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No options provided.');
                });
            });
            it('options is an invalid type', function () {
                let options = 12345;
                validate.rosterOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected options to be a string or object, but was given a ${typeof (options)}.`);
                });
            });
            it('options is missing team_id', function () {
                let options = {};
                validate.rosterOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No team_id provided.');
                });
            });
            it('team_id is not a string', function () {
                let options = {
                    team_id: 12345
                };
                validate.rosterOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected team_id to be a string, but was given a ${typeof (options.team_id)}.`);
                });
            });
            it('prune flag is not a boolean', function () {
                let options = {
                    team_id: '12345',
                    prune: 'false'
                };
                validate.rosterOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
                });
            });
        });
    });

    describe('statsOptions', function () {
        describe('should return an error if', function () {
            it('no options are provided', function () {
                let options = '';
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No options provided.');
                });
            });
            it('options is an invalid type', function () {
                let options = 12345;
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected options to be a string or object, but was given a ${typeof (options)}.`);
                });
            });
            it('options is missing player_id', function () {
                let options = {};
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', 'No player_id provided.');
                });
            });
            it('player_id is not a string', function () {
                let options = {
                    player_id: 12345
                };
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected player_id to be a string, but was given a ${typeof (options.player_id)}.`);
                });
            });
            it('year is not a string', function () {
                let options = {
                    player_id: '12345',
                    year: 1234
                };
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected year to be a string, but was given a ${typeof (options.year)}.`);
                });
            });
            it('pitching flag is not a boolean', function () {
                let options = {
                    player_id: '12345',
                    pitching: 'false'
                };
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected pitching to be a boolean, but was given a ${typeof (options.pitching)}.`);
                });
            });
            it('prune flag is not a boolean', function () {
                let options = {
                    player_id: '12345',
                    prune: 'false'
                };
                validate.statsOptions(options, (err) => {
                    expect(err).to.be.an('Error', `Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
                });
            });
        });
    });
});
