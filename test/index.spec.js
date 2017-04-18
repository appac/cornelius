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
		validKey: 'bos',
		unmatchedKey: 'inv',
		invalidKey: 123
	}
	it('should return a player object', function () {
		let foundPlayer = findPlayerInResults(options.data, options.validKey);
		expect(foundPlayer).to.be.an('object').and.have.property('name_display_first_last');
		expect(foundPlayer.name_display_first_last).to.equal('Chris Young');
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
