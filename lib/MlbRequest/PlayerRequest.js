const MlbRequest = require('./Request');
const url = require('url');

const ACTIONS = require('./Config').PLAYER_ACTIONS;
const BASE_URLS = require('./Config').BASE_URLS;
const PUBLIC_ENDPOINTS = require('./Config').ENDPOINTS.PUBLIC_LOOKUP;
const STATS_ENDPOINTS = require('./Config').ENDPOINTS.PUBLIC_LOOKUP.STATS;
const WSFB_ENDPOINTS = require('./Config').ENDPOINTS.WSFB;

/**
 * Represents an MLB Request.
 */
class PlayerRequest extends MlbRequest {
    /**
     * Create MLB request.
     * @private
     * @param {string} endpoint
     */
    constructor(endpoint) {
        super();
        this.endpoint = endpoint;
        this.url = null;
    }
    /**
     * Builds a URL object to be used by http.
     * Returns `this` for chaining.
     * @private
     * @param {object} options
     * @return {object}
     */
    buildUrl(options) {
        let uri = '';
        switch (this.endpoint) {
        case ACTIONS.SEARCH:
            uri = `${BASE_URLS.PUBLIC_LOOKUP}${PUBLIC_ENDPOINTS.SEARCH}.bam?sport_code='mlb'&name_part='${options.query}%25'&active_sw='${options.active ? 'Y' : 'N'}'`;
            break;
        case ACTIONS.DETAILS:
            uri = `${BASE_URLS.STATS_API}/people/?personIds=${options.id}`;
            break;
        case ACTIONS.STATS:
            const statEndpoint = STATS_ENDPOINTS[options.stat_role][options.stat_type];
            uri = `${BASE_URLS.PUBLIC_LOOKUP}${statEndpoint}.bam?player_id=${options.id}&league_list_id='mlb_hist'&${statEndpoint}.season=${options.stat_season}&game_type='${options.stat_game_type}'`;
            break;
        case ACTIONS.INJURIES:
            uri = `${BASE_URLS.WSFB}${WSFB_ENDPOINTS.INJURIES}.bam`;
            break;
        case ACTIONS.NEWS:
            uri = `${BASE_URLS.WSFB}${WSFB_ENDPOINTS.NEWS}.bam?player_id='${options.id}'`;
            break;
        case ACTIONS.TRANSACTIONS:
            uri = `${BASE_URLS.PUBLIC_LOOKUP}${PUBLIC_ENDPOINTS.TRANSACTIONS}.bam?sport_code='mlb'&start_date=${options.start_date}&end_date=${options.end_date}`;
            break;
        default:
            this.emit('error', 'No endpoint provided.');
            break;
        }
        this.url = url.parse(uri);
        return this;
    }
}

module.exports = PlayerRequest;
