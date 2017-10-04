'use strict';

const chai = require('chai'),
	expect = chai.expect,
	prune = require('../utils/prune');

const search_player_all = require('./mock/search_player_all.json'),
	player_info = require('./mock/player_info.json'),
	roster_40 = require('./mock/roster_40.json'),
	roster_40_short = require('./mock/roster_40.short.json'),
	sport_hitting_tm = require('./mock/sport_hitting_tm.json'),
	sport_pitching_tm = require('./mock/sport_pitching_tm.json'),
	sport_pitching_tm_empty = require('./mock/sport_pitching_tm_empty.json');

describe('prune', function () {
	it('should return the original data if it\'s invalid', function () {
		let data = {
			some: 'invalid data'
		};
		let prunedData = prune.handler(data);
		expect(prunedData).to.eql(data);
	});
	describe('_searchResults', function () {
		it('should return an array of pruned results', function () {
			let data = search_player_all;
			let prunedData = prune.handler(data);
			let expectedLength = data.search_player_all.queryResults.totalSize;

			expect(prunedData).to.be.an('array').of.length(expectedLength);
		});
	});
	describe('_playerData', function () {
		it('should return a pruned player object', function () {
			let data = player_info;
			let prunedData = prune.handler(data);

			expect(prunedData).to.be.an('object');
			expect(prunedData).to.have.property('name')
				.that.is.an('object')
				.that.deep.equals({
					full: 'David Wright',
					first: 'David',
					last: 'Wright',
					roster: 'Wright'
				});
		});
	});
	describe('_rosterData', function () {
		it('short - should return a pruned team roster', function () {
			let data = roster_40_short;
			let prunedData = prune.handler(data);
			let expectedLength = data.roster_40.queryResults.totalSize;

			expect(prunedData).to.be.an('array').of.length(expectedLength);
			expect(prunedData[0]).to.be.an('object')
				.with.ownProperty('name')
				.and.ownProperty('id');
		});
		it('full - should return a pruned team roster', function () {
			let data = roster_40;
			let prunedData = prune.handler(data);
			let expectedLength = data.roster_40.queryResults.totalSize;

			expect(prunedData).to.be.an('array').of.length(expectedLength);
			expect(prunedData[0]).to.be.an('object');
			expect(prunedData[0]).to.have.ownProperty('id');
			expect(prunedData[0]).to.have.property('name')
				.that.is.an('object')
				.with.ownProperty('first');
		});
	});
	describe('_playerStats', function () {
		it('hitting - should return a pruned stats object', function () {
			let data = sport_hitting_tm;
			let prunedData = prune.handler(data);

			expect(prunedData).to.be.an('object')
				.with.ownProperty('sb');
		});
		it('pitching - should return a pruned stats object', function () {
			let data = sport_pitching_tm;
			let prunedData = prune.handler(data);

			expect(prunedData).to.be.an('object')
				.with.ownProperty('era');
		});
		it('should return an empty object if there\'s no stats to prune', function () {
			let data = sport_pitching_tm_empty;
			let prunedData = prune.handler(data);

			expect(prunedData).to.be.an('object').and.be.empty;
		});
	});
	
});

