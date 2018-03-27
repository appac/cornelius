const test = require('tape');
const Options = require('../utils/Options');


test('Instances of Options classes should...', (t) => {
    t.test('...accurately reflect valid options objects.', (u) => {
        let opts;

        opts = new Options.SearchPlayerOptions({
            query: 'player name',
            active: false,
            prune: false,
        });

        u.deepEqual(opts, {
            query: 'player name',
            active: false,
            prune: false,
        });

        opts = new Options.GetPlayerOptions({
            player_id: '12345',
            prune: false,
        });

        u.deepEqual(opts, {
            player_id: '12345',
            prune: false,
        });

        opts = new Options.GetStatsOptions({
            player_id: '12345',
            pitching: true,
            year: '2018',
            prune: false,
        });

        u.deepEqual(opts, {
            player_id: '12345',
            pitching: true,
            year: '2018',
            prune: false,
        });

        opts = new Options.GetRosterOptions({
            team_id: '123',
            short: true,
            prune: false,
        });

        u.deepEqual(opts, {
            team_id: '123',
            short: true,
            endpoint: 'roster_40',
            prune: false,
        });

        opts = new Options.GetRosterOptions({
            team_id: '123',
            short: true,
            season: '2016 2017',
            prune: false,
        });

        u.deepEqual(opts, {
            team_id: '123',
            short: true,
            endpoint: 'roster_team_alltime',
            season: {
                start: '2016',
                end: '2017',
            },
            prune: false,
        });

        opts = new Options.GetRosterOptions({
            team_id: '123',
            short: true,
            season: '2016',
            prune: false,
        });

        u.deepEqual(opts, {
            team_id: '123',
            short: true,
            endpoint: 'roster_team_alltime',
            season: {
                start: '2016',
                end: '2016',
            },
            prune: false,
        });

        u.end();
    });
    t.test('...correctly default omitted or invalid values.', (v) => {
        let opts;

        opts = new Options.SearchPlayerOptions({});

        v.deepEqual(opts, {
            query: '',
            active: true,
            prune: true,
        });

        opts = new Options.SearchPlayerOptions({
            query: 1234,
            active: 'true',
            prune: 'false',
        });

        v.deepEqual(opts, {
            query: '',
            active: true,
            prune: true,
        });

        opts = new Options.GetPlayerOptions({});

        v.deepEqual(opts, {
            player_id: '',
            prune: true,
        });

        opts = new Options.GetPlayerOptions({
            player_id: 12345,
        });

        v.deepEqual(opts, {
            player_id: '',
            prune: true,
        });

        opts = new Options.GetStatsOptions({});

        v.deepEqual(opts, {
            player_id: '',
            pitching: false,
            year: null,
            prune: true,
        });

        opts = new Options.GetStatsOptions({
            pitching: 'true',
            year: 2018,
        });

        v.deepEqual(opts, {
            player_id: '',
            pitching: false,
            year: null,
            prune: true,
        });

        opts = new Options.GetRosterOptions({});

        v.deepEqual(opts, {
            team_id: '',
            short: false,
            endpoint: 'roster_40',
            prune: true,
        });

        opts = new Options.GetRosterOptions({
            short: 'true',
        });

        v.deepEqual(opts, {
            team_id: '',
            short: false,
            endpoint: 'roster_40',
            prune: true,
        });

        opts = new Options.GetRosterOptions({
            season: 2018,
        });

        v.deepEqual(opts, {
            team_id: '',
            short: false,
            endpoint: 'roster_team_alltime',
            prune: true,
        });

        v.end();
    });
    t.end();
});
