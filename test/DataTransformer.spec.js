'use strict';

const test = require('tape');
const DataTransformer = require('../utils/DataTransformer');

test('DataTransformer given invalid data should...', (t) => {
    t.plan(2);

    t.test('...emit an error event on transform()', (u) => {
        u.plan(1);

        const data = {some: 'invalid data'};
        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('error', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );

        u.end();
    });

    t.test('...return an error object.', (v) => {
        v.plan(2);

        const data = {some: 'invalid data'};
        const dataTransformer = new DataTransformer(data);

        let error;
        dataTransformer.on('error', (err) => {
            error = err;
        });
        dataTransformer.transform();

        v.equal(
            typeof (error), 'object',
            `Error should be an error object.`
        );
        v.equal(
            error.message, `Data does not match any transformable type.`,
            `Error object should have a message.`
        );

        v.end();
    });

    t.end();
});

test('DataTransformer given valid search_player_all data should...', (t) => {
    t.plan(3);

    t.test('...emit a success event on transform()', (u) => {
        u.plan(1);
        /**
         * Tests against multiple search results.
         */
        const data = require('./mock/search_player_all.json');
        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('transform:success', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );

        u.end();
    });

    t.test('...return an array of transformed search results.', (v) => {
        v.plan(3);
        /**
         * Tests again a single search result.
         */
        const data = require('./mock/search_player_all.single.json');
        const expectedLength = +data.search_player_all.queryResults.totalSize;
        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });

        dataTransformer.transform();

        v.true(
            Array.isArray(transformedData),
            `Transformed data should be an array.`
        );
        v.true(
            transformedData[0].hasOwnProperty('name'),
            `A pruned search result should have 'name' property.`
        );
        v.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        v.end();
    });

    t.test('...emit `transform:nodata` and be able to handle no search results.', (w) => {
        w.plan(3);

        const data = require('./mock/search_player_all.empty.json');
        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.search_player_all.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:nodata', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        w.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
        w.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        w.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        w.end();
    });

    t.end();
});

test('DataTransformer given valid roster_40 data should...', (t) => {
    t.plan(4);

    t.test('...emit a success event on transform().', (u) => {
        u.plan(1);

        const data = require('./mock/roster_40.json');
        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('transform:success', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
    });

    t.test('...return an array of transformed full player data.', (v) => {
        v.plan(3);

        const data = require('./mock/roster_40.json');
        const expectedLength = +data.roster_40.queryResults.totalSize;
        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        v.true(
            Array.isArray(transformedData),
            `Transformed data should be an array.`
        );
        v.true(
            transformedData[0].hasOwnProperty('attribute'),
            `A transformed roster entry should have an 'attribute' property.`
        );
        v.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );
    });

    t.test('...return an array of transformed short player data.', (w) => {
        w.plan(3);

        const data = require('./mock/roster_40.short.json');
        const expectedLength = +data.roster_40.queryResults.totalSize;
        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        w.true(
            Array.isArray(transformedData),
            `Transformed data should be an array.`
        );
        w.true(
            transformedData[0].hasOwnProperty('name'),
            `A transformed short roster entry should have a 'name' property.`
        );
        w.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}`
        );
    });

    t.test('...emit `transform:nodata` and be able to handle no roster data.', (x) => {
        x.plan(3);

        const data = require('./mock/roster_40.empty.json');
        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.roster_40.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:nodata', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        x.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
        x.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        x.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        x.end();
    });

    t.end();
});

test('DataTransformer given valid roster_team_alltime data should...', (t) => {
    t.plan(4);

    t.test('...emit a success event on transform().', (u) => {
        u.plan(1);

        const data = require('./mock/roster_team_alltime.json');
        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('transform:success', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
    });

    t.test('...return an array of transformed full player data.', (v) => {
        v.plan(3);

        const data = require('./mock/roster_team_alltime.json');
        const expectedLength = +data.roster_team_alltime.queryResults.totalSize;
        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        v.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        v.true(
            transformedData[0].hasOwnProperty('attribute'),
            `A transformed roster entry should have an 'attribute' property.`
        );
        v.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );
    });


    t.test('...return an array of transformed short player data.', (w) => {
        w.plan(3);

        const data = require('./mock/roster_team_alltime.short.json');
        const expectedLength = +data.roster_team_alltime.queryResults.totalSize;
        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        w.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        w.true(
            transformedData[0].hasOwnProperty('name'),
            `A transformed short roster entry should have a 'name' property.`
        );
        w.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}`
        );
    });

    t.test('...emit `transform:nodata` and be able to handle no roster data.', (x) => {
        x.plan(3);

        const data = require('./mock/roster_team_alltime.empty.json');
        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.roster_team_alltime.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:nodata', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        x.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
        x.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        x.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        x.end();
    });

    t.end();
});

test('DataTransformer given valid player_info data should...', (t) => {
    let data = require('./mock/player_info.json');
    t.plan(3);

    t.test('...emit a success event on transform().', (u) => {
        u.plan(1);

        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('transform:success', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
    });

    t.test('...return a transformed player object.', (v) => {
        v.plan(2);

        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        v.equal(
            typeof(transformedData), 'object',
            `Transformed data should be an object but is a ${typeof(transformedData)}.`
        );
        v.true(
            transformedData.hasOwnProperty('attribute'),
            `A transformed player should have 'attribute' property.`
        );
        v.end();
    });

    t.test('...emit `transform:nodata` and be able to handle no player object.', (w) => {
        w.plan(2);

        data = require('./mock/player_info.empty.json');
        const dataTransformer = new DataTransformer(data);

        let transformedData;
        dataTransformer.on('transform:nodata', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        w.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
        w.equal(
            typeof(transformedData), 'object',
            `Transformed data should be an object, but is a ${typeof(transformedData)}.`
        );

        w.end();
    });

    t.end();
});

test('DataTransformer given valid sport_hitting_tm data should...', (t) => {
    let data = require('./mock/sport_hitting_tm.json');
    t.plan(3);

    t.test('...emit a success event on transform().', (u) => {
        u.plan(1);

        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('transform:success', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );

        u.end();
    });

    t.test('...return an array of transformed stats objects.', (v) => {
        v.plan(3);

        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.sport_hitting_tm.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        v.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        v.true(
            transformedData[0].hasOwnProperty('team'),
            `Transformed stats should have a 'team' property.`
        );
        v.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        v.end();
    });

    t.test('...be able to handle a single stats object.', (w) => {
        w.plan(3);

        data = require('./mock/sport_hitting_tm.single.json');
        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.sport_hitting_tm.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        w.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        w.true(
            transformedData[0].hasOwnProperty('team'),
            `Transformed stats should have a 'team' property.`
        );
        w.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        w.end();
    });

    t.end();
});

test('DataTransformer given valid sport_pitching_tm data should...', (t) => {
    let data = require('./mock/sport_pitching_tm.json');

    t.plan(4);

    t.test('...emit a success event on transform().', (u) => {
        u.plan(1);

        const dataTransformer = new DataTransformer(data);

        dataTransformer.on('transform:success', () => {});
        dataTransformer.transform();

        u.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );

        u.end();
    });

    t.test('...return an array of transformed stats objects.', (v) => {
        v.plan(3);

        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.sport_pitching_tm.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        v.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        v.true(
            transformedData[0].hasOwnProperty('team'),
            `Transformed stats should have a 'team' property.`
        );
        v.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        v.end();
    });

    t.test('...be able to handle a single stats object.', (w) => {
        w.plan(3);

        data = require('./mock/sport_pitching_tm.single.json');
        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.sport_pitching_tm.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:success', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        w.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        w.true(
            transformedData[0].hasOwnProperty('team'),
            `Transformed stats should have a 'team' property.`
        );
        w.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        w.end();
    });

    t.test('...emit `transform:nodata` and be able to handle no stats object.', (x) => {
        x.plan(3);

        data = require('./mock/sport_pitching_tm.empty.json');
        const dataTransformer = new DataTransformer(data);
        const expectedLength = +data.sport_pitching_tm.queryResults.totalSize;

        let transformedData;
        dataTransformer.on('transform:nodata', (d) => {
            transformedData = d;
        });
        dataTransformer.transform();

        x.equal(
            dataTransformer._eventsCount, 1,
            `DataTransformer instance should have an _eventsCount of 1.`
        );
        x.true(
            Array.isArray(transformedData),
            `Transformed data should be an array, but is a ${typeof(transformedData)}.`
        );
        x.equal(
            expectedLength, transformedData.length,
            `Expected array length to be ${expectedLength}, but it was ${transformedData.length}.`
        );

        x.end();
    });

    t.end();
});
