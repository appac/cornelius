const EventEmitter = require('events').EventEmitter;
/**
 * Represents a data pruner/transformer.
 */
class DataTransformer extends EventEmitter {
    /**
     * Sets the transform function to be used
     * by the pruner.
     * @param {object} originalData
     */
    constructor(originalData) {
        super();
        this.transformableData = this.prune(originalData);
    }
    /**
     * Takes a full MLB data object,
     * and retuns only the row array/object.
     *
     * @param {object} d
     * @return {object|array}
     */
    prune(d) {
        const dataType = Object.keys(d)[0];

        if (dataType === 'search_player_all') {
            return d[dataType].queryResults.row;
        } else if (dataType === 'player_info') {
            return d[dataType].queryResults.row;
        } else if (dataType === 'roster_40') {
            return d[dataType].queryResults.row;
        } else if (dataType === 'roster_team_alltime') {
            return d[dataType].queryResults.row;
        } else if (dataType === 'sport_hitting_tm' || dataType === 'sport_pitching_tm') {
            return d[dataType].queryResults.row;
        } else {
            const err = new Error('Data does not match any transformable type.');
            this.emit('error', err);
        }
    }


}

module.exports = DataTransformer;
