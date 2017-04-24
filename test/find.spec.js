const chai = require('chai'),
			expect = chai.expect
			find = require('../utils/find');

let testData = require('./mock/search.json');

describe('find', function () {

	describe('player', function () {

		it('should find and return the correct player when given a player ID', function () {
			// Looking for Eric Young Jr. of the New York Yankees - 458913
			let requestedPlayer = find.player(testData, '458913');
			expect(requestedPlayer).to.have.property('player_id', '458913');
		});
		it('should find and return the correct player when given a team abbreviation', function () {
			// Looking for Chris Young of the Kansas City Royals - 432934
			let requestedPlayer = find.player(testData, 'KC');
			expect(requestedPlayer).to.have.property('player_id', '432934');
		});

		describe('error handling', function () {
			it('should return missing key error if no key is given', function() {
				let requestedPlayer = find.player(testData, '');
				expect(requestedPlayer).to.be.an('error', 'find.player wasn\'t given a key');
			});
			it('should return an invalid key type error if an invalid key is given', function () {
				let requestedPlayer = find.player(testData, 123456);
				expect(requestedPlayer).to.be.an('error', 'find.player expected key to be a string, but was given a number.')
			});
			it('should return an error if no matching key is found', function () {
				let requestedPlayer = find.player(testData, '123456');
				expect(requestedPlayer).to.be.an('error', 'find.player could not find a player with a matching key.');
			});
		});

	});

	describe('teamId', function () {
		// Find team ID of New York Mets - 121
		it ('should find and return the correct team ID when given a team abbreviation', function () {
			let teamId = find.teamId('nym');
			expect(teamId).to.equal('121');
		});
		it ('should find and return the correct team ID when given a team name', function () {
			let teamId = find.teamId('New York Mets')
			expect(teamId).to.equal('121');
		});
		it ('should find and return the correct team ID when given a team ID', function () {
			let teamId = find.teamId('121');
			expect(teamId).to.equal('121');
		});
		it('should return undefined if no team ID can be found', function () {
				let requestedPlayer = find.teamId('inv');
				expect(requestedPlayer).to.be.undefined;
			});
		describe('error handling', function () {
			it('should return missing key error if no key is given', function () {
				let requestedPlayer = find.teamId('');
				expect(requestedPlayer).to.be.an('error', 'find.teamId wasn\'t given a key');
			});
			it('should return an invalid key type error if an invalid key is given', function () {
				let requestedPlayer = find.teamId(123456);
				expect(requestedPlayer).to.be.an('error', 'find.teamId expected key to be a string, but was given a number.')
			});
		});
	});

});

