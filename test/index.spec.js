var chai = require('chai')
	expect = chai.expect,
	should = chai.should(),
	chaiAsPromised = require('chai-as-promised'),
	rewire = require('rewire'),
	cornelius = rewire('../index');

chai.use(chaiAsPromised);

// Mock data - MLB response from player search using surname 'young'
let mlbSearchResponse = require('./mock.search.json');

let findPlayerInResults = cornelius.__get__('findPlayerInResults');

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
