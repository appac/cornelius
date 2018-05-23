const MlbRequest = require('./Request');
const url = require('url');

const CONSTANTS = require('./CONSTANTS').TEAM;
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
    }
}

module.exports = TeamRequest;
