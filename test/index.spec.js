var chai = require('chai')
	expect = chai.expect,
	should = chai.should(),
	chaiAsPromised = require('chai-as-promised'),
	rewire = require('rewire'),
	corneliusHelpers = rewire('../index'),
	cornelius = require('../index');

chai.use(chaiAsPromised);

// Mock data - MLB response from player search using surname 'young'
let mlbSearchResponse = require('./mock.search.json');
let mlbSingleSearchResponse = require('./mock.single-search-result.json');

let findPlayerInResults = corneliusHelpers.__get__('findPlayerInResults');
let getTeamID = corneliusHelpers.__get__('getTeamID');

describe('cornelius.getRoster', function () {
	it('should resolve with roster results', function () {
		return cornelius.getRoster('nym').should.eventually.be.an('object').with.property('roster_all');
	});
	describe('error handling', function (){
		it('should be rejected with an error when given an invalid key type', function () {
			return cornelius.getRoster(123).should.eventually.be.rejectedWith('Expected key to be a string, but was given a number.');
		});
		it('should be rejected with an error when given no key', function () {
			return cornelius.getRoster().should.eventually.be.rejectedWith('No key provided to getRoster.');
		});
		it('should be rejected with an error when given too short a key', function () {
			return cornelius.getRoster('N').should.eventually.be.rejectedWith('Key provided to getRoster is too short.');
		});
		it('should be rejected with an error when no team matches the key', function () {
			return cornelius.getRoster('INV').should.eventually.be.rejectedWith('No team matching \'INV\' found.');
		})
	});
});

describe('findPlayerInResults', function () {
	let options = {
		data: mlbSearchResponse,
		validTeamKey: 'kc',
		validIDKey: '455759',
		unmatchedKey: 'inv',
		invalidKey: 123
	}
	it('should return the correct player object when given a team_abbrev key', function () {
		let foundPlayer = findPlayerInResults(options.data, options.validTeamKey);
		expect(foundPlayer).to.be.an('object').and.have.property('name_display_first_last');
		expect(foundPlayer.name_display_first_last).to.equal('Chris Young');
		expect(foundPlayer.team_abbrev).to.equal('KC');
	});
	it('should return the correct player object when given a player_id key', function () {
		let foundPlayer = findPlayerInResults(options.data, options.validIDKey);
		expect(foundPlayer).to.be.an('object').and.have.property('name_display_first_last');
		expect(foundPlayer.name_display_first_last).to.equal('Chris Young');
		expect(foundPlayer.team_abbrev).to.equal('BOS');
	});
	it('should return an error when not given a key', function () {
		let error = findPlayerInResults(options.data);
		expect(error).to.be.an('error');
		expect(error.message).to.equal('findPlayerInResults wasn\'t given a key.')
	});
	it('should return an error when given an unmatched key', function () {
		let error = findPlayerInResults(options.data, options.unmatchedKey);
		expect(error).to.be.an('error');
		expect(error.message).to.equal('No player found with matching key.');
	});
	it('should return an error when given an invalid key type', function() {
		let error = findPlayerInResults(options.data, options.invalidKey);
		expect(error).to.be.an('error');
		expect(error.message).to.equal(`findPlayerInResults expected key to be a string, but was given a ${typeof(options.invalidKey)}.`)
	});
});

describe('cornelius.prune', function () {
	it('should return an error when given invalid data to prune', function () {
		let data = {
			foo: 'bar'
		};
		let pruned = cornelius.prune(data);
		expect(pruned).to.be.an('error');
		expect(pruned.message).to.equal('Invalid data given to prune.');
	});
	describe('search results', function () {
		it('should return pruned array of search results', function () {
			let pruned = cornelius.prune(mlbSearchResponse);
			expect(pruned).to.be.an('array');
		});
		it('should return a pruned array of search results when the raw results are a single player', function () {
			// when MLBs search route can only find one player, it returns that player as an object in the results "row" property (instead of an array), this test ensures that in such a situation, pruning is still handled correctly
			let pruned = cornelius.prune(mlbSingleSearchResponse);
			expect(pruned).to.be.an('array');
		});
	});
	describe('player object', function () {
		it('should return pruned player object', function () {
			let player = mlbSearchResponse.search_player_all.queryResults.row[0];
			let prunedPlayer = cornelius.prune(player);
			expect(prunedPlayer).to.have.property('name');
			expect(prunedPlayer).to.have.property('geo');
		});
	});
});
