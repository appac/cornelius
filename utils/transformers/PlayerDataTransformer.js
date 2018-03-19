const DataTransformer = require('./DataTransformer');

/**
 * Represents a data transformer for player data.
 */
class PlayerDataTransformer extends DataTransformer {
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
}

module.exports = PlayerDataTransformer;
