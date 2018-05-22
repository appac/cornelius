const MlbRequest = require('./Request');
const url = require('url');

const ACTIONS = require('../Config').TEAM_ACTIONS;
const BASE_URLS = require('../Config').BASE_URLS;
const PUBLIC_ENDPOINTS = require('../Config').ENDPOINTS.PUBLIC_LOOKUP;
const STATS_ENDPOINTS = require('../Config').ENDPOINTS.PUBLIC_LOOKUP.STATS;
const WSFB_ENDPOINTS = require('../Config').ENDPOINTS.WSFB;

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
