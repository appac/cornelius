'use strict';

const chai = require('chai'),
			expect = chai.expect,
			mlbRequest = require('../utils/mlb/request');

describe('mlb', function () {
	describe('_requestBuilder', function () {
		it('should return a valid search url', function () {
			let url = mlbRequest.build('search', 'testQuery');

			expect(url).to.be.an('object');
			expect(url).to.have.property('href')
				.that.equals('http://mlb.mlb.com/lookup/json/named.search_player_all.bam?sport_code=%27mlb%27&name_part=%27testQuery%25%27&active_sw=%27Y%27');
		});
		it('should return a valid get url', function () {
			let url = mlbRequest.build('get', '12345');

			expect(url).to.be.an('object');
			expect(url).to.have.property('href')
				.that.equals('http://mlb.mlb.com/lookup/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%2712345%27');
		});
		it('should return a valid hitting stats url', function () {
			let url = mlbRequest.build('stats', '12345');

			expect(url).to.be.an('object');
			expect(url).to.have.property('href')
				.that.equals('http://mlb.mlb.com/lookup/json/named.sport_hitting_tm.bam?player_id=12345&game_type=%27R%27&league_list_id=%27mlb%27');
		});
		it('should return a valid pitching stats url', function () {
			let options = {
				player_id: '12345',
				pitching: true
			};
			let url = mlbRequest.build('stats', options);

			expect(url).to.be.an('object');
			expect(url).to.have.property('href')
				.that.equals('http://mlb.mlb.com/lookup/json/named.sport_pitching_tm.bam?player_id=12345&game_type=%27R%27&league_list_id=%27mlb%27');

		});
		it('should return a valid roster url', function () {
			let url = mlbRequest.build('roster', '123');

			expect(url).to.be.an('object');
			expect(url).to.have.property('href')
				.that.equals('http://mlb.mlb.com/lookup/json/named.roster_40.bam?team_id=%27123%27&roster_40.col_in=name_display_first_last&roster_40.col_in=player_id');
		});
		it('should return undefined if an invalid request type is provided', function () {
			let url = mlbRequest.build('invalidReq', 'testQuery');

			expect(url).to.be.undefined;
		});
	});
});
