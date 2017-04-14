var expect = require('chai').expect,
	should = require('chai').should(),
	cornelius = require('../index');

describe('findPlayer', function () {
	var players;
	it('should return a results object', function () {
		return cornelius.findPlayer('wright')
			.then(function (data) {
				expect(data).to.be.an('object').and.not.be.empty;
				expect(data).to.have.property('totalSize');
				players = data;
			});
	});
	it('should have an array of n results when given "wright"', function () {
			should.exist(players.row);
			expect(players.row).to.be.an('array').and.not.be.empty;
	});
	it('should have no array when given "invalidname"', function () {
		return cornelius.findPlayer('invalidname')
			.then(function (data) {
				should.not.exist(data.row);
			});
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