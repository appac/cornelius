'use strict';

const test = require('tape'),
    prune = require('../utils/prune');

test('pruning invalid data should result in an error',
    (t) => {
        t.plan(2);
        const data = {
                some: 'invalid data'
            },
            err = prune(data);

        t.equal(
            typeof (err), 'object',
            'Error should be an error object.'
        );
        t.equal(
            err.message, 'Data does not match any pruneable type.',
            'Error object should have a message.'
        );
        t.end();
    });

test('prune(search_player_all) should return an array of pruned search results',
    (t) => {
        t.plan(6);
        let data, pruned, expectedLength;

        data = require('./mock/search_player_all.json');
        pruned = prune(data);
        expectedLength = +data.search_player_all.queryResults.totalSize;

        t.true(
            Array.isArray(pruned),
            'Pruned should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('name'),
            'A pruned result should have `name` property.'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );

        data = require('./mock/search_player_all.single.json');
        pruned = prune(data);
        expectedLength = +data.search_player_all.queryResults.totalSize;

        t.true(
            Array.isArray(pruned),
            'Pruned should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('name'),
            'A pruned result should have `name` property.'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );

        t.end();
    });

test('prune(roster_40) should return an array of pruned players',
    (t) => {
        t.plan(6);
        let data, pruned, expectedLength;

        data = require('./mock/roster_40.json');
        pruned = prune(data);
        expectedLength = +data.roster_40.queryResults.totalSize;

        t.true(
            Array.isArray(pruned),
            'Pruned should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('attribute'),
            'A pruned roster entry should have an `attribute` property.'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );

        data = require('./mock/roster_40.short.json');
        pruned = prune(data);
        expectedLength = +data.roster_40.queryResults.totalSize;

        t.true(
            Array.isArray(pruned),
            'Pruned should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('name'),
            'A pruned short roster entry should have an `name` property.'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );

        t.end();
    });

test('prune(player_info) should return a pruned player object',
    (t) => {
        t.plan(2);
        let data, pruned;

        data = require('./mock/player_info.json');
        pruned = prune(data);

        t.equal(
            typeof (pruned), 'object',
            'Pruned player should be an object.'
        );
        t.true(
            pruned.hasOwnProperty('attribute'),
            'A pruned player should have `attribute` property.'
        );
        t.end();
    });

test('prune(sport_hitting_tm) should return an array of pruned hitting stats',
    (t) => {
        t.plan(6);
        let data, pruned, expectedLength;

        data = require('./mock/sport_hitting_tm.json');
        pruned = prune(data);
        expectedLength = +data.sport_hitting_tm.queryResults.totalSize;
        

        t.true(
            Array.isArray(pruned),
            'Pruned stats should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('team'),
            'Pruned stats should have `team` property.'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );

        data = require('./mock/sport_hitting_tm.single.json');
        pruned = prune(data);
        expectedLength = +data.sport_hitting_tm.queryResults.totalSize;

        t.true(
            Array.isArray(pruned),
            'Pruned stat data should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('team'),
            'Pruned stat object should have `team` property'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );
        t.end();
    });

test('prune(sport_pitching_tm) should return an array of pruned pitching stats',
    (t) => {
        t.plan(3);
        let data, pruned, expectedLength;

        data = require('./mock/sport_pitching_tm.json');
        pruned = prune(data);
        expectedLength = +data.sport_pitching_tm.queryResults.totalSize;

        t.true(
            Array.isArray(pruned),
            'Pruned stats should be an array.'
        );
        t.true(
            pruned[0].hasOwnProperty('team'),
            'Pruned stats should have `team` property.'
        );
        t.equal(
            expectedLength, pruned.length,
            `Expected array length to be ${expectedLength}, but it was ${pruned.length}`
        );
        t.end();
    });
