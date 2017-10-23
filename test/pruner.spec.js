'use strict';

const chai = require('chai'),
    expect = chai.expect,
    prune = require('../utils/pruner');

describe('pruner', () => {
    it('should return an error when given invalid data', () => {
        const data = { some: 'invalid data' },
            prunedData = prune(data);
        expect(prunedData).to.be.an('Error', 'Data did not match any expected pruneable structure.');
    });
    it('should return an array of pruned results when given search results', () => {
        const data = require('./mock/search_player_all.json'),
            prunedData = prune(data),
            prunedResult = prunedData[0];

        expect(prunedData).to.be.an('array');
        expect(prunedResult).to.have.property('attribute');
        expect(prunedResult.id).to.be.an('string');
    });
    it('should return a pruned player object when given a player object', () => {
        const data = require('./mock/player_info.json'),
            prunedData = prune(data);

        expect(prunedData).to.be.an('object');
        expect(prunedData).to.have.property('attribute');
    });
    it('should return an array of pruned player objects when given a team roster', () => {
        const data = require('./mock/roster_40.json'),
            prunedData = prune(data),
            prunedResult = prunedData[0];

        expect(prunedData).to.be.an('array');
        expect(prunedResult).to.be.an('object');
        expect(prunedResult).to.have.property('attribute');
    });
    it('should return an array of pruned player objects when given a short team roster', () => {
        const data = require('./mock/roster_40.short.json'),
            prunedData = prune(data),
            prunedResult = prunedData[0];

        expect(prunedData).to.be.an('array');
        expect(prunedResult).to.be.an('object');
        expect(prunedResult).to.have.keys('name', 'id');
    });
    it('should return a pruned hitting stats object when given a hitting stats object', () => {
        const data = require('./mock/sport_hitting_tm.json'),
            prunedData = prune(data);

        expect(prunedData).to.be.an('object');
        expect(prunedData).to.have.property('team');
        expect(prunedData).to.have.property('league');
        expect(prunedData).to.have.property('sport');
    });
    it('should return a pruned pitching stats object when given a pitching stats object', () => {
        const data = require('./mock/sport_pitching_tm.json'),
            prunedData = prune(data);


        expect(prunedData).to.be.an('object');
        expect(prunedData).to.have.property('team');
        expect(prunedData).to.have.property('league');
        expect(prunedData).to.have.property('sport');
    });
});
