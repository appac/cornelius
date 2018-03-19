const DataTransformer = require('./DataTransformer');

/**
 * Represents a data transformer for player search data.
 */
class SearchDataTransformer extends DataTransformer {
    /**
     * @param {object} originalData
     */
    constructor(originalData) {
        super(originalData);
    }
    /**
     * Transforms data associated with instance of
     * data transformer.
     */
    transform() {
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
}

module.exports = SearchDataTransformer;
