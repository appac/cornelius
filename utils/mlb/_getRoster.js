const mlbRequest = require('./request');
const DataTransformer = require('../DataTransformer');

/**
 * Represents options given to MLB Request Builder.
 */
class RosterOptions {
    /**
     * Sets fallback values for options properties.
     *
     * @param {object} options
     */
    constructor(options) {
        this.team_id = options.team_id || -1;
        this.short = (options.hasOwnProperty('short') && typeof (options.full === 'boolean')) ? options.short : false;
        this.prune = (options.hasOwnProperty('prune') && typeof (options.prune === 'boolean')) ? options.prune : true;
        this.endpoint = (options.hasOwnProperty('season') ? 'roster_team_alltime' : 'roster_40');
        if (options.hasOwnProperty('season') && typeof (options.season) === 'string') {
            this.setSeasons(options.season);
        }
    }

    /**
     * Splits the `seasons` property into individual strings
     * to be stored as seasonStart and seasonEnd properties.
     * @param {string} seasons
     */
    setSeasons(seasons) {
        const s = seasons.split(' ');

        if (s.length > 1) {
            if (s[0] < s[1]) {
                this.seasonStart = s[0];
                this.seasonEnd = s[1];
            } else {
                this.seasonStart = s[1];
                this.seasonEnd = s[0];
            }
        } else {
            this.seasonStart = s[0];
            this.seasonEnd = s[0];
        }
    }
}

/**
 * Constructs and makes call to MLB for a roster.
 *
 * @private
 * @param {Object} options - The options to make the request with.
 * @param {string} options.team_id - ID of team to get roster for.
 * @param {boolean} [options.short=false] - Whether players in the roster should have their full info.
 * @param {boolean} [options.prune=true] - Whether the data received should be pruned.
 * @return {Promise} - Promise to be fulfilled with roster data, or error.
 */
function getRoster(options) {
    return new Promise(function(resolve, reject) {
        const o = new RosterOptions(options);
        const url = mlbRequest.build(o.endpoint, o);

        if (!url) {
            reject(new Error(`Error building ${o.endpoint} request URL.`));
        }

        mlbRequest.make(url)
            .then((data) => {
                if (o.prune === true) {
                    const dataTransformer = new DataTransformer(data);
                    dataTransformer.on('transform:success', (transformedData) => {
                        resolve(transformedData);
                    }).on('transform:nodata', (emptyData) => {
                        resolve(emptyData);
                    }).on('error', (err) => {
                        reject(err);
                    });
                    dataTransformer.transform();
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = getRoster;
