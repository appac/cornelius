const EventEmitter = require('events').EventEmitter;
const OPTION_TYPES = require('./CONFIG').OPTION_TYPES;
const PlayerRequest = require('./MlbRequest').PlayerRequest;
const TeamRequest = require('./MlbRequest').TeamRequest;
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
            type: (options.hasOwnProperty('type') && typeof options.type === OPTION_TYPES.TYPE) ? options.type.toUpperCase() : 'TEAM',
            role: (options.hasOwnProperty('role') && typeof options.role === OPTION_TYPES.ROLE) ? options.role.toLowerCase() : 'hitting',
            game_type: (options.hasOwnProperty('game_type') && typeof options.game_type === OPTION_TYPES.GAME_TYPE) ? options.game_type.toUpperCase() : 'R',
            season: (options.hasOwnProperty('season') && typeof options.season === OPTION_TYPES.SEASON) ? options.season : currentDate.year,
            start_date: (options.hasOwnProperty('start_date') && typeof options.start_date === OPTION_TYPES.START_DATE) ? options.start_date : currentDate.full_first_day,
            end_date: (options.hasOwnProperty('end_date') && typeof options.end_date === OPTION_TYPES.END_DATE) ? options.end_date : currentDate.full_last_day,
            league: (() => {
                if (options.hasOwnProperty('league') && typeof options.league === OPTION_TYPES.LEAGUE) {
                    const league = options.league.toLowerCase();
                    if (league === 'nl') {
                        return '104';
                    } else if (league === 'al') {
                        return '103';
                    }
                }
                return null;
            })(),
            pruneData: (options.hasOwnProperty('pruneData') && typeof options.pruneData === OPTION_TYPES.PRUNE) ? options.pruneData : true,
        };
    }

    /**
     * Execute the operation.
     * @private
     */
    execute() {
        let mlbRequest;
        const isTransactionsOrInjuries = (this.action === 'transactions' || this.action === 'injuries');
        if (this.subject === 'player') {
            mlbRequest = new PlayerRequest(this.action);
            mlbRequest
                .on('complete', (data) => {
                    let dataToEmit = data;
                    if (isTransactionsOrInjuries && this.options.id) {
                        const endpoint = Object.keys(data)[0];
                        const dataRow = data[endpoint].queryResults.row;
                        const filteredRow = dataRow.filter((item) => {
                            return item.player_id === this.options.id;
                        });
                        dataToEmit[endpoint].queryResults.row = filteredRow;
                        dataToEmit[endpoint].queryResults.totalSize = filteredRow.length;
                    }
                    this.emit(`${this.action}:complete`, dataToEmit);
                })
                .on('error', (error) => this.emit('error', error));
        } else if (this.subject === 'team') {
            mlbRequest = new TeamRequest(this.action);
            mlbRequest
                .on('complete', (data) => {
                    let dataToEmit = data;
                    if (isTransactionsOrInjuries && this.options.id) {
                        const endpoint = Object.keys(data)[0];
                        const dataRow = data[endpoint].queryResults.row;
                        const filteredRow = dataRow.filter((item) => {
                            return item.team_id === this.options.id;
                        });
                        dataToEmit[endpoint].queryResults.row = filteredRow;
                        dataToEmit[endpoint].queryResults.totalSize = filteredRow.length;
                    }
                    this.emit(`${this.action}:complete`, dataToEmit);
                })
                .on('error', (error) => this.emit('error', error));
        }
        mlbRequest.buildUrl(this.options).makeRequest();
    }
}

module.exports = CorneliusAction;
