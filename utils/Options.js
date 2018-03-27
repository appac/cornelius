/**
 * Represents options given to utility functions.
 *
 * @private
 */
class Options {
    /**
     * @param {object} options
     */
    constructor(options) {
        this.prune = (options.hasOwnProperty('prune') && typeof options.prune === 'boolean')
            ? options.prune
            : true;
    }
};


/**
 * Represents options given to searchPlayer function.
 * @private
 */
class SearchPlayerOptions extends Options {
    /**
     * @param {object} options
     */
    constructor(options) {
        super(options);
        this.query = (options.hasOwnProperty('query') && typeof options.query === 'string') ? options.query : '';
        this.active = (options.hasOwnProperty('active') && typeof options.active === 'boolean') ? options.active : true;
    }
};

/**
 * Represents options given to getPlayer function.
 * @private
 */
class GetPlayerOptions extends Options {
    /**
     * @param {object} options
     */
    constructor(options) {
        super(options);
        this.player_id = (options.hasOwnProperty('player_id') && typeof options.player_id === 'string') ? options.player_id : '';
    }
};

/**
 * Represents options given to getStats function.
 *
 * Extends GetPlayerOptions as they share a `player_id` property.
 *
 * @private
 */
class GetStatsOptions extends GetPlayerOptions {
    /**
     * @param {object} options
     */
    constructor(options) {
        super(options);
        this.pitching = (options.hasOwnProperty('pitching') && typeof options.pitching === 'boolean') ? options.pitching : false;
        this.year = (options.hasOwnProperty('year') && typeof options.year === 'string') ? options.year : null;
    }
};

/**
 * Represents options given to getRoster function.
 * @private
 */
class GetRosterOptions extends Options {
    /**
     * @param {object} options
     */
    constructor(options) {
        super(options);
        this.team_id = (options.hasOwnProperty('team_id')) ? options.team_id : '';
        this.short = (options.hasOwnProperty('short') && typeof options.short === 'boolean') ? options.short : false;
        this.endpoint = (options.hasOwnProperty('season')) ? 'roster_team_alltime' : 'roster_40';
        if (options.hasOwnProperty('season') && typeof options.season === 'string') {
            this.season = setSeasons(options.season);
        }

        /**
         * Splits the given season string and
         * stores it as seasons property.
         *
         * @private
         * @param {string} season
         * @return {object}
         */
        function setSeasons(season) {
            const s = season.split(' ');
            if (s.length > 1) {
                const [seasonStart, seasonEnd] = s;
                return {
                    start: seasonStart,
                    end: seasonEnd,
                };
            } else {
                return {
                    start: s[0],
                    end: s[0],
                };
            }
        }
    }
};

module.exports = {
    SearchPlayerOptions: SearchPlayerOptions,
    GetPlayerOptions: GetPlayerOptions,
    GetStatsOptions: GetStatsOptions,
    GetRosterOptions: GetRosterOptions,
};
