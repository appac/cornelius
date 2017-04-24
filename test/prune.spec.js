const chai = require('chai'),
			expect = chai.expect
			prune = require('../utils/prune');
			
describe('prune', function () {

	describe('searchResults', function () {
		it('should return a cleaned array of multiple results', function () {
			let testData = require('./mock/search.json');
			let expectedLength = testData.search_player_all.queryResults.totalSize;
			let prunedResults = prune.searchResults(testData);
			expect(prunedResults).to.be.an('array').of.length(expectedLength);
		});
		it('should return a cleaned array of a single result', function () {
			let testData = require('./mock/search-single.json');
			let expectedLength = testData.search_player_all.queryResults.totalSize;
			let prunedResults = prune.searchResults(testData);
			expect(prunedResults).to.be.an('array').of.length(expectedLength);
		});
	});

	describe('rosterData', function () {
		it('should return a cleaned roster array', function () {
			let testData = require('./mock/roster.json');
			let expectedLength = testData.roster_all.queryResults.totalSize;
			let prunedRoster = prune.rosterData(testData);
			expect(prunedRoster).to.be.an('array').of.length(expectedLength);
		});
	});

	describe('playerData', function () {
		it('should return a cleaned player object', function () {
			let testData = require('./mock/player.json');
			let prunedPlayer = prune.playerData(testData);
			expect(prunedPlayer).to.have.property('attribute');
		});
	});
	
});

