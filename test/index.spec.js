var chai = require('chai')
	expect = chai.expect,
	should = chai.should(),
	chaiAsPromised = require('chai-as-promised'),
	cornelius = require('../index');

chai.use(chaiAsPromised);

describe('findPlayer', function () {
	it('should return an object with a row property', function () {
		let query = 'wright';
		return cornelius.findPlayer(query).should.eventually.be.an('object').with.property('row');
	});
	it('should throw an error when given an non-existent player name', function () {
		let query = 'fakeplayer';
		return cornelius.findPlayer(query).should.be.rejectedWith(Error);
	});
	it('should throw an error when given no player name', function () {
		let query = '';
		return cornelius.findPlayer(query).should.be.rejectedWith(Error);
	});
});

describe('findPlayer pruned', function() {
	it('should return an array of n players when given "wright"', function () {
		return cornelius.findPlayer('wright', true)
			.then(function (data) {
				expect(data).to.be.an('array');
				expect(data).to.not.be.empty;
			});
	});
	it('should return an empty array when given "invalidname"', function () {
		return cornelius.findPlayer('invalidname', true)
			.then(function (data) {
				expect(data).to.be.an('array');
				expect(data).to.be.empty;
			});
	})
});


describe('getPlayer', function () {
	var player;
	it('should return a player object', function () {
		return cornelius.getPlayer('david wright', 'nym')
			.then(function (data) {
				expect(data).to.be.an('object');
				expect(data).to.not.be.empty;
				expect(data).to.have.property('name_display_first_last');
				player = data;
			});
	});
	it('should mirror parameters when given "david wright"/"nym"', function () {
				var name = player.name_display_first_last.toLowerCase();
				name.should.equal('david wright');
				var team = player.team_abbrev.toLowerCase();
				team.should.equal('nym');
	});
	it('should return empty object when given invalid name or key', function () {
		return cornelius.getPlayer('invalid name', 'nym')
			.then(function (data) {
				expect(data).to.be.an('object').and.to.be.empty;
			});
		return cornelius.getPlayer('david wright', 'inv')
			.then(function (data) {
				expect(data).to.be.an('object').and.to.be.empty;
			});
	});
});

describe.skip('getStats', function () {
	it('should return an object', function () {

	});

	it('should return an error when given a single string', function() {

	})
});