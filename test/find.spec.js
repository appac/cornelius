'use strict';

const chai = require('chai'),
	expect = chai.expect,
	find = require('../utils/find');

let sport_hitting_tm = require('./mock/sport_hitting_tm.json');
let sport_pitching_tm = require('./mock/sport_pitching_tm.json');

describe('find', function () {
	describe('_matchingTeamId', function () {
		it('abbrev - should return the correct team ID when given a valid key', function () {
			let teamID;
			teamID = find.matchingTeamId('nym');
			expect(teamID).to.equal('121');
		});
		it('name - should return the correct team ID when given a valid key', function () {
			let teamID;
			teamID = find.matchingTeamId('new york mets');
			expect(teamID).to.equal('121');
		});
		it('id - should return the correct team ID when given a valid key', function () {
			let teamID;
			teamID = find.matchingTeamId('121');
			expect(teamID).to.equal('121');
		});
		it('invalid - should return undefined', function () {
			let teamID = find.matchingTeamId('inv');
			expect(teamID).to.be.undefined;
		});
	});
	describe('_latestStats', function () {
		it('hitting - should return a modified MLB response with one stats object', function () {
			let data;
			let statsCount;
			let latestStats;

			data = find.latestStats(sport_hitting_tm);
			statsCount = data.sport_hitting_tm.queryResults.totalSize;
			latestStats = data.sport_hitting_tm.queryResults.row;
			expect(data).to.be.an('object').with.property('sport_hitting_tm');
			expect(statsCount).to.equal(1);
			expect(latestStats).to.be.an('object').with.property('h');
		});
		it('pitching - should return a modified MLB response with one stats object', function () {
			let data;
			let statsCount;
			let latestStats;

			data = find.latestStats(sport_pitching_tm);
			statsCount = data.sport_pitching_tm.queryResults.totalSize;
			latestStats = data.sport_pitching_tm.queryResults.row;
			expect(data).to.be.an('object').with.property('sport_pitching_tm');
			expect(statsCount).to.equal(1);
			expect(latestStats).to.be.an('object').with.property('era');
		});
	});

});

