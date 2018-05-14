const EventEmitter = require('events').EventEmitter;
const MlbRequest = require('./MlbRequest');
/**
 * Represents some Cornelius action.
 */
class CorneliusAction extends EventEmitter {
    /**
     * Create an action.
     * @param {string} action
     * @param {object} options
     */
    constructor(action, options) {
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
        this.action = action;
        this.options = {
            query: (() => {
                if (options.hasOwnProperty('query') && typeof options.query === 'string') {
                    return options.query;
                } else {
                    return '';
                }
            })(),
            active: (() => {
                if (options.hasOwnProperty('active') && typeof options.active === 'boolean') {
                    return options.active;
                } else {
                    return true;
                }
            })(),
            id: (() => {
                if (options.id && Array.isArray(options.id)) {
                    return options.id.toString();
                } else if (options.id && typeof options.id === 'string') {
                    return options.id;
                } else {
                    return '';
                }
            })(),
            stat_type: (() => {
                if (options.hasOwnProperty('type') && typeof options.type === 'string') {
                    return options.type.toUpperCase();
                } else {
                    return 'TEAM';
                }
            })(),
            stat_role: (() => {
                if (options.hasOwnProperty('role') && typeof options.role === 'string') {
                    return options.role.toUpperCase();
                } else {
                    return 'HITTING';
                }
            })(),
            stat_game_type: (() => {
                if (options.hasOwnProperty('stat_game_type') && typeof options.stat_game_type === 'string') {
                    return options.stat_game_type.toUpperCase();
                } else {
                    return 'R';
                }
            })(),
            stat_season: (() => {
                if (options.hasOwnProperty('season') && typeof options.season === 'string') {
                    return options.season;
                } else {
                    return currentDate.year;
                }
            })(),
            start_date: (() => {
                if (options.hasOwnProperty('start_date') && typeof options.start_date === 'string') {
                    return options.start_date;
                } else {
                    return `${currentDate.full_first_day}`;
                }
            })(),
            end_date: (() => {
                if (options.hasOwnProperty('end_date') && typeof options.end_date === 'string') {
                    return options.end_date;
                } else {
                    return `${currentDate.full_last_day}`;
                }
            })(),
            pruneData: (() => {
                if (options.hasOwnProperty('pruneData') && typeof options.prune === 'boolean') {
                    return options.prune;
                } else {
                    return false;
                }
            })(),
        };
    }

    /**
     * Execute the operation.
     */
    execute() {
        const mlbRequest = new MlbRequest(this.action);
        mlbRequest
            .on('complete', (data) => this.emit(`${this.action}:complete`, data))
            .on('error', (error) => this.emit('error', error));
        mlbRequest.buildUrl(this.options).makeRequest();
    }
}

module.exports = CorneliusAction;
