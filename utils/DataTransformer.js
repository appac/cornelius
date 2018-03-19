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
        this.typeOfData = Object.keys(originalData)[0];
        this.transformableData = getTransformableData(originalData[this.typeOfData]);

        /**
         * Prunes MLB data down to the single row
         * needed for transformations to occur.
         * 
         * @return {array|null}
         */
        function getTransformableData(data) {
            const hasQueryResultsProp = data.hasOwnProperty('queryResults');
            if (hasQueryResultsProp) {
                const hasRowProp = data.queryResults.hasOwnProperty('row');
                if (hasRowProp) {
                    return data.queryResults.row;
                }
            }
            return null;
        }
    }

    /**
     * Using the type of data, calls the appropriate
     * transform function.
     */
    transform() {
        switch (this.typeOfData) {
            case 'search_player_all':
                this._transformSearchData();
                break;
            case 'player_info':
                this._transformPlayerData();
                break;
            case 'roster_40':
                this._transformRosterData();
                break;
            case 'roster_team_alltime':
                this._transformRosterAlltimeData();
                break;
            case 'sport_hitting_tm':
                this._transformStatsData();
                break;
            case 'sport_pitching_tm':
                this._transformStatsData();
                break;
            default:
                this.emit('error', new Error('Data does not match any transformable type.'));
                break;
        }
    }
    /**
     * Transforms search data.
     *
     * Emits a 'transform:success' event if data exists
     * and is successfully transformed, returning the
     * transformed data.
     *
     * Otherwise, emits a 'transform:nodata' event if
     * it is passed no data, returning an empty array.
     */
    _transformSearchData() {
        /**
         * Transform function.
         *
         * Called directly, passing in data, or
         * as a map callback.
         *
         * Returns transformed data.
         * @param {object} data
         * @return {object}
         */
        function transformer(data) {
            return {
                id: data.player_id,
                name: {
                    full: data.name_display_first_last,
                    first: data.name_first,
                    last: data.name_last,
                    roster: data.name_display_roster,
                },
                position: {
                    id: data.position_id,
                    code: data.position,
                },
                team: {
                    id: data.team_id,
                    name: data.team_full,
                    abbrev: data.team_abbrev,
                    code: data.team_code,
                    league: data.league,
                },
                date: {
                    pro_debut: data.pro_debut_date,
                    birth: data.birth_date,
                },
                geo: {
                    city: data.birth_city,
                    state: data.birth_state,
                    country: data.birth_country,
                    high_school: data.high_school,
                    college: data.college,
                },
                attribute: {
                    bats: data.bats,
                    throws: data.throws,
                    weight: data.weight,
                    height: {
                        feet: data.height_feet,
                        inches: data.height_inches,
                    },
                },
            };
        }
        if (!this.transformableData) {
            this.emit('transform:nodata', []);
        } else if (this.transformableData.length > 1) {
            const transformed = this.transformableData.map(transformer);
            this.emit('transform:success', transformed);
        } else {
            const transformed = [];
            transformed.push(transformer(this.transformableData));
            this.emit('transform:success', transformed);
        }
    }
    /**
     * Transforms search data.
     *
     * Emits a 'transform:success' event if data exists
     * and is successfully transformed, returning the
     * transformed data.
     *
     * Otherwise, emits a 'transform:nodata' event if
     * it is passed no data, returning an empty object.
     */
    _transformPlayerData() {
        /**
         * Transform function.
         *
         * Called directly, passing in data, or
         * as an array.map callback.
         *
         * Returns transformed data.
         * @param {object} data
         * @return {object}
         */
        function transformer(data) {
            return {
                id: data.player_id,
                jersey_number: data.jersey_number,
                status: {
                    full: data.status,
                    code: data.status_code,
                    date: data.status_date,
                },
                name: {
                    full: data.name_display_first_last,
                    first: data.name_first,
                    last: data.name_last,
                    roster: data.name_display_roster,
                },
                position: {
                    id: data.primary_position,
                    code: data.primary_position_txt,
                },
                team: {
                    id: data.team_id,
                    name: data.team_name,
                    abbrev: data.team_abbrev,
                    code: data.team_code,
                },
                date: {
                    debut: data.pro_debut_date,
                    birth: data.birth_date,
                },
                geo: {
                    city: data.birth_city,
                    state: data.birth_state,
                    country: data.birth_country,
                    high_school: data.high_school,
                    college: data.college,
                },
                attribute: {
                    age: data.age,
                    gender: data.gender,
                    bats: data.bats,
                    throws: data.throws,
                    weight: data.weight,
                    height: {
                        feet: data.height_feet,
                        inches: data.height_inches,
                    },
                },
            };
        }
        if (!this.transformableData) {
            this.emit('transform:nodata', {});
        } else {
            const transformed = transformer(this.transformableData);
            this.emit('transform:success', transformed);
        }
    }
    /**
     * Transforms current roster data.
     *
     * Emits a 'transform:success' event if data exists
     * and is successfully transformed, returning the
     * transformed data.
     *
     * Otherwise, emits a 'transform:nodata' event if
     * it is passed no data, returning an empty array.
     */
    _transformRosterData() {
        /**
         * Transform function.
         *
         * Called directly, passing in data, or
         * as an array.map callback.
         *
         * Returns transformed data.
         * @param {object} data
         * @return {object}
         */
        function transformer(data) {
            return {
                id: data.player_id,
                jersey_number: data.jersey_number,
                name: {
                    first: data.name_first,
                    last: data.name_last,
                    full: data.name_display_first_last,
                },
                status: {
                    code: data.status_code,
                },
                team: {
                    id: data.team_id,
                    name: data.team_name,
                    code: data.team_code,
                    abbrev: data.team_abbrev,
                },
                position: {
                    id: data.primary_position,
                    code: data.position_txt,
                },
                date: {
                    birth: data.birth_date,
                    pro_debut: data.pro_debut_date,
                },
                geo: {
                    college: data.college,
                },
                attribute: {
                    bats: data.bats,
                    throws: data.throws,
                    weight: data.weight,
                    height: {
                        feet: data.height_feet,
                        inches: data.height_inches,
                    },
                },
            };
        }
        /**
         * Transforms short form roster data.
         * @param {object} data
         * @return {object}
         */
        function transformerShort(data) {
            return {
                id: data.player_id,
                name: data.name_display_first_last,
            };
        }
        let transformed;
        if (!this.transformableData) {
            transformed = [];
            this.emit('transform:nodata', transformed);
        } else if (this.transformableData[0].hasOwnProperty('birth_date')) {
            transformed = this.transformableData.map(transformer);
            this.emit('transform:success', transformed);
        } else {
            transformed = this.transformableData.map(transformerShort);
            this.emit('transform:success', transformed);
        }
    }
    /**
     * Transforms all time roster data.
     *
     * Emits a 'transform:success' event if data exists
     * and is successfully transformed, returning the
     * transformed data.
     *
     * Otherwise, emits a 'transform:nodata' event if
     * there is no transformable data, returning an empty array.
     */
    _transformRosterAlltimeData() {
        /**
         * Transform function.
         *
         * Called directly, passing in data, or
         * as an array.map callback.
         *
         * Returns transformed data.
         * @param {object} data
         * @return {object}
         */
        function transformer(data) {
            return {
                id: data.player_id,
                jersey_number: data.jersey_number,
                name: {
                    first: data.name_first_last.split(' ')[0],
                    last: data.name_last_first.split(' ')[0],
                    full: data.name_first_last,
                },
                status: {
                    short: data.status_short,
                    still_active: (data.active_sw === 'Y') ? true : false,
                    current_roster: (data.current_sw === 'Y') ? true : false,
                    forty_man: (data.forty_man_sw === 'Y') ? true : false,
                },
                team: {
                    id: data.team_id,
                },
                position: {
                    id: data.primary_position,
                    designation: data.position_desig,
                },
                date: {
                    birth: data.birth_date,
                },
                attribute: {
                    tenure: data.roster_years,
                    bats: data.bats,
                    throws: data.throws,
                    weight: data.weight,
                    height: {
                        feet: data.height_feet,
                        inches: data.height_inches,
                    },
                },
            };
        }
        /**
         * Transforms short form roster data.
         * @param {object} data
         * @return {object}
         */
        function transformerShort(data) {
            return {
                id: data.player_id,
                name: data.name_first_last,
            };
        }
        let transformed;
        if (!this.transformableData) {
            transformed = [];
            this.emit('transform:nodata', transformed);
        } else if (this.transformableData[0].hasOwnProperty('birth_date')) {
            transformed = this.transformableData.map(transformer);
            this.emit('transform:success', transformed);
        } else {
            transformed = this.transformableData.map(transformerShort);
            this.emit('transform:success', transformed);
        }
    }
    /**
     * Transforms stats data.
     *
     * Emits a 'transform:success' event if data exists
     * and is successfully transformed, returning the
     * transformed data.
     *
     * Otherwise, emits a 'transform:nodata' event if
     * there is no transformable data, returning an empty array.
     */
    _transformStatsData() {
        /**
         * Transform function.
         *
         * Called directly, passing in data, or
         * as an array.map callback.
         *
         * Returns transformed data.
         * @param {object} data
         * @return {object}
         */
        function transformer(data) {
            const props = Object.keys(data);
            const restruct = {
                    id: '',
                    team: {},
                    league: {},
                    sport: {},
                };
            let teamPattern;
            let leaguePattern;
            let sportPattern;
            [teamPattern, leaguePattern, sportPattern] = [/team/, /league/, /sport/];

            return props.reduce((restructured, prop) => {
                if (/team|league|sport/.test(prop)) {
                    if (teamPattern.test(prop)) {
                        restructured.team[prop] = data[prop];
                    } else if (leaguePattern.test(prop)) {
                        if (prop === 'league') {
                            restructured.league.league_abbrev = data[prop];
                        } else {
                            restructured.league[prop] = data[prop];
                        }
                    } else if (sportPattern.test(prop)) {
                        restructured.sport[prop] = data[prop];
                    }
                } else {
                    if (prop === 'player_id') {
                        restructured.id = data[prop];
                    } else {
                        restructured[prop] = data[prop];
                    }
                }
                return restructured;
            }, restruct);
        }
        let transformed;
        if (!this.transformableData) {
            transformed = [];
            this.emit('transform:nodata', transformed);
        } else if (this.transformableData.length > 1) {
            transformed = this.transformableData.map(transformer);
            this.emit('transform:success', transformed);
        } else {
            transformed = [];
            transformed.push(transformer(this.transformableData));
            this.emit('transform:success', transformed);
        }
    }
}

module.exports = DataTransformer;
