const EventEmitter = require('events').EventEmitter;
const OPTION_TYPES = require('./Config').OPTION_TYPES;
const PlayerRequest = require('./MlbRequest/PlayerRequest');
const TeamRequest = require('./MlbRequest/TeamRequest');
/**
 * Represents some Cornelius action.
 */
class CorneliusAction extends EventEmitter {
    /**
     * Create an action.
     * @private
     * @param {string} subject
     * @param {string} action
     * @param {object} options
     */
    constructor(subject, action, options) {
        /**
         * Builds an object populated with current date information.
         * @private
         * @return {object}
         */
        const currentDate = (() => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return {
                year: year,
                full_last_day: `${year}${month}${new Date(year, month + 1, 0).getDate()}`,
                full_first_day: `${year}${month}01`,
            };
        })();

        super();
        this.subject = subject;
        this.action = action;
        this.options = {
            query: (options.hasOwnProperty('query') && typeof options.query === OPTION_TYPES.QUERY) ? options.query : null,
            active: (options.hasOwnProperty('active') && typeof options.active === OPTION_TYPES.ACTIVE) ? options.active : true,
            id: (() => {
                if (options.hasOwnProperty('id')) {
                    if (Array.isArray(options.id)) {
                        return options.id.toString();
                    } else if (typeof options.id === 'string') {
                        return options.id;
                    }
                }
                return null;
            })(),
            stat_type: (options.hasOwnProperty('stat_type') && typeof options.stat_type === OPTION_TYPES.STAT_TYPE) ? options.stat_type.toUpperCase() : 'TEAM',
            stat_role: (options.hasOwnProperty('stat_role') && typeof options.stat_role === OPTION_TYPES.STAT_ROLE) ? options.stat_role.toLowerCase() : 'hitting',
            stat_game_type: (options.hasOwnProperty('stat_game_type') && typeof options.stat_game_type === OPTION_TYPES.STAT_GAME_TYPE) ? options.stat_game_type.toUpperCase() : 'R',
            stat_season: (options.hasOwnProperty('season') && typeof options.stat_season === OPTION_TYPES.STAT_SEASON) ? options.stat_season : currentDate.year,
            start_date: (options.hasOwnProperty('start_date') && typeof options.start_date === OPTION_TYPES.START_DATE) ? options.start_date : currentDate.full_first_day,
            end_date: (options.hasOwnProperty('end_date') && typeof options.end_date === OPTION_TYPES.END_DATE) ? options.end_date : currentDate.full_last_day,
            pruneData: (options.hasOwnProperty('pruneData') && typeof options.pruneData === OPTION_TYPES.PRUNE) ? options.pruneData : true,
        };
    }

    /**
     * Execute the operation.
     * @private
     */
    execute() {
        let mlbRequest;
        if (this.subject === 'player') {
            mlbRequest = new PlayerRequest(this.action);
        } else if (this.subject === 'team') {
            mlbRequest = new TeamRequest(this.action);
        }
        mlbRequest
            .on('complete', (data) => this.emit(`${this.action}:complete`, data))
            .on('error', (error) => this.emit('error', error));
        mlbRequest.buildUrl(this.options).makeRequest();
    }
}

module.exports = CorneliusAction;
