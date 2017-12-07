'use strict';

const test = require('tape'),
    mlbReq = require('../utils/mlb/request');

test('buildRequest should return undefined when given invalid query type',
    (t) => {
        t.plan(1);
        const url = mlbReq.build('invalidType', 'someTestQuery');

        t.equal(
            url, undefined,
            'Expected buildRequest to return undefined.'
        );
        t.end();
    });

test('buildRequest(search_player_all) should return a valid search url',
    (t) => {
        t.plan(1);
        const url = mlbReq.build('search_player_all', 'someTestQuery');
        const expectedUrl = 'http://mlb.mlb.com/lookup/json/named.search_player_all.bam?sport_code=%27mlb%27&name_part=%27someTestQuery%25%27&active_sw=%27Y%27';

        t.equal(
            url.href, expectedUrl,
            'Actual search_player_all url does not match expected url.'
        );
        t.end();
    });

test('buildRequest(player_info) should return a valid player info url',
    (t) => {
        t.plan(1);
        const url = mlbReq.build('player_info', '12345');
        const expectedUrl = 'http://mlb.mlb.com/lookup/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%2712345%27';

        t.equal(
            url.href, expectedUrl,
            'Actual player_info url does not match expected url.'
        );
        t.end();
    });

test('buildRequest(sport_hitting_tm) should return a valid hitting stats url',
    (t) => {
        t.plan(1);
        const url = mlbReq.build('sport_hitting_tm', '12345');
        const expectedUrl = 'http://mlb.mlb.com/lookup/json/named.sport_hitting_tm.bam?player_id=12345&game_type=%27R%27&league_list_id=%27mlb%27';

        t.equal(
            url.href, expectedUrl,
            'Actual sport_hitting_tm url does not match expected url.'
        );
        t.end();
    });

test('buildRequest(sport_pitching_tm) should return a valid pitching stats url',
    (t) => {
        t.plan(1);
        const url = mlbReq.build('sport_pitching_tm', '12345');
        const expectedUrl = 'http://mlb.mlb.com/lookup/json/named.sport_pitching_tm.bam?player_id=12345&game_type=%27R%27&league_list_id=%27mlb%27';

        t.equal(
            url.href, expectedUrl,
            'Actual sport_pitching_tm url does not match expected url.'
        );
        t.end();
    });

test('buildRequest(roster_40) should return a valid roster url',
    (t) => {
        t.plan(1);
        const url = mlbReq.build('roster_40', '123');
        const expectedUrl = 'http://mlb.mlb.com/lookup/json/named.roster_40.bam?team_id=%27123%27&roster_40.col_in=name_display_first_last&roster_40.col_in=player_id';

        t.equal(
            url.href, expectedUrl,
            'Actual roster_40 url does not match expected url.'
        );
        t.end();
    });
