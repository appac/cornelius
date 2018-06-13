const MlbRequest = require('./Request');
const url = require('url');

const CONSTANTS = require('../CONFIG').TEAM;
const ACTIONS = CONSTANTS.ACTIONS;
const PUBLIC_LOOKUP = CONSTANTS.ENDPOINTS.PUBLIC_LOOKUP;
const STATS_API = CONSTANTS.ENDPOINTS.STATS_API;
const WSFB = CONSTANTS.ENDPOINTS.WSFB;

/**
 * Represents an MLB Request.
 */
class TeamRequest extends MlbRequest {
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
        case ACTIONS.LIST:
            uri = `${STATS_API.BASE}/teams?leagueIds=${options.league || '103, 104'}`;
            break;
        case ACTIONS.DETAILS:
            uri = `${STATS_API.BASE}/teams/${options.id}`;
            break;
        case ACTIONS.COACHES:
            uri = `${STATS_API.BASE}/teams/${options.id}/coaches`;
            break;
        case ACTIONS.AFFILIATES:
            uri = `${STATS_API.BASE}/teams/${options.id}/affiliates`;
            break;
        case ACTIONS.LEADERS:
            uri = `${STATS_API.BASE}/teams/${options.id}/leaders`;
            break;
        case ACTIONS.ROSTER:
            uri = `${STATS_API.BASE}/teams/${options.id}/roster/${options.roster_type}`;
            break;
        case ACTIONS.TRANSACTIONS:
            uri = `${PUBLIC_LOOKUP.BASE}${PUBLIC_LOOKUP.TRANSACTIONS}.bam?sport_code='mlb'&start_date='${options.start_date}'&end_date='${options.end_date}'`;
            break;
        case ACTIONS.NEWS:
            uri = `${WSFB.BASE}${WSFB.NEWS}.bam?team_id='${options.id}'&wsfb_news_browse.recPP=15&wsfb_news_browse.recSP=1`;
            break;
        case ACTIONS.INJURIES:
            uri = `${WSFB.BASE}${WSFB.INJURIES}.bam`;
            break;
        default:
            this.emit('error', 'No endpoint provided.');
            break;
        }
        this.url = url.parse(uri);
        return this;
    }
}

module.exports = TeamRequest;
