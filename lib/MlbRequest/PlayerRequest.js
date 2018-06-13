const MlbRequest = require('./Request');
const url = require('url');

const CONSTANTS = require('../CONFIG').PLAYER;
const ACTIONS = CONSTANTS.ACTIONS;
const PUBLIC_LOOKUP = CONSTANTS.ENDPOINTS.PUBLIC_LOOKUP;
const STATS_API = CONSTANTS.ENDPOINTS.STATS_API;
const WSFB = CONSTANTS.ENDPOINTS.WSFB;

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
            uri = `${PUBLIC_LOOKUP.BASE}${PUBLIC_LOOKUP.SEARCH}.bam?sport_code='mlb'&name_part='${options.query}%25'&active_sw='${options.active ? 'Y' : 'N'}'`;
            break;
        case ACTIONS.DETAILS:
            uri = `${STATS_API.BASE}/people/?personIds=${options.id}`;
            break;
        case ACTIONS.STATS:
            const statEndpoint = PUBLIC_LOOKUP.STATS[options.stat_role][options.stat_type];
            uri = `${PUBLIC_LOOKUP.BASE}${statEndpoint}.bam?player_id=${options.id}&league_list_id='mlb_hist'&${statEndpoint}.season=${options.season}&game_type='${options.game_type}'`;
            break;
        case ACTIONS.INJURIES:
            uri = `${WSFB.BASE}${WSFB.INJURIES}.bam`;
            break;
        case ACTIONS.NEWS:
            uri = `${WSFB.BASE}${WSFB.NEWS}.bam?player_id='${options.id}'&wsfb_news_browse.recPP=15&wsfb_news_browse.recSP=1`;
            break;
        case ACTIONS.TRANSACTIONS:
            uri = `${PUBLIC_LOOKUP.BASE}${PUBLIC_LOOKUP.TRANSACTIONS}.bam?sport_code='mlb'&start_date=${options.start_date}&end_date=${options.end_date}`;
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
