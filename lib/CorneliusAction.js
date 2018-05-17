const EventEmitter = require('events').EventEmitter;
const MlbRequest = require('./MlbRequest');
/**
 * Represents some Cornelius action.
 */
class CorneliusAction extends EventEmitter {
    /**
     * Create an action.
     * @private
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
                    return {
                        value: options.query,
                        valid: true,
                    };
                } else {
                    return {
                        value: '',
                        valid: false,
                    };
                }
            })(),
            active: (() => {
                if (options.hasOwnProperty('active') && typeof options.active === 'boolean') {
                    return {
                        value: options.active,
                        valid: true,
                    };
                } else {
                    return {
                        value: true,
                        valid: true,
                    };
                }
            })(),
            id: (() => {
                if (options.id && Array.isArray(options.id)) {
                    return {
                        value: options.id.toString(),
                        valid: true,
                    };
                } else if (options.id && typeof options.id === 'string') {
                    return {
                        value: options.id,
                        valid: true,
                    };
                } else {
                    return {
                        value: '',
                        valid: false,
                    };
                }
            })(),
            stat_type: (() => {
                if (options.hasOwnProperty('type') && typeof options.type === 'string') {
                    return {
                        value: options.type.toUpperCase(),
                        valid: true,
                    };
                } else {
                    return {
                        value: 'TEAM',
                        valid: true,
                    };
                }
            })(),
            stat_role: (() => {
                if (options.hasOwnProperty('role') && typeof options.role === 'string') {
                    return {
                        value: options.role.toUpperCase(),
                        valid: true,
                    };
                } else {
                    return {
                        value: 'HITTING',
                        valid: true,
                    };
                }
            })(),
            stat_game_type: (() => {
                if (options.hasOwnProperty('stat_game_type') && typeof options.stat_game_type === 'string') {
                    return {
                        value: options.stat_game_type.toUpperCase(),
                        valid: true,
                    };
                } else {
                    return {
                        value: 'R',
                        valid: true,
                    };
                }
            })(),
            stat_season: (() => {
                if (options.hasOwnProperty('season') && typeof options.season === 'string') {
                    return {
                        value: options.season,
                        valid: true,
                    };
                } else {
                    return currentDate.year;
                }
            })(),
            start_date: (() => {
                if (options.hasOwnProperty('start_date') && typeof options.start_date === 'string') {
                    return {
                        value: options.start_date,
                        valid: true,
                    };
                } else {
                    return {
                        value: `${currentDate.full_first_day}`,
                        valid: true,
                    };
                }
            })(),
            end_date: (() => {
                if (options.hasOwnProperty('end_date') && typeof options.end_date === 'string') {
                    return {
                        value: options.end_date,
                        valid: true,
                    };
                } else {
                    return {
                        value: `${currentDate.full_last_day}`,
                        valid: true,
                    };
                }
            })(),
            pruneData: (() => {
                if (options.hasOwnProperty('pruneData') && typeof options.prune === 'boolean') {
                    return {
                        value: options.prune,
                        valid: true,
                    };
                } else {
                    return {
                        value: true,
                        valid: true,
                    };
                }
            })(),
        };
    }

    /**
     * Execute the operation.
     * @private
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
