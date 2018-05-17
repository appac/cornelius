const EventEmitter = require('events').EventEmitter;
const url = require('url');
const http = require('http');

const ACTIONS = require('./Config').ACTIONS;
const BASE_URLS = require('./Config').BASE_URLS;
const PUBLIC_ENDPOINTS = require('./Config').ENDPOINTS.PUBLIC_LOOKUP;
const STATS_ENDPOINTS = require('./Config').ENDPOINTS.PUBLIC_LOOKUP.STATS;
const WSFB_ENDPOINTS = require('./Config').ENDPOINTS.WSFB;

/**
 * Represents an MLB Request.
 */
class MlbRequest extends EventEmitter {
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
            uri = `${BASE_URLS.PUBLIC_LOOKUP}${PUBLIC_ENDPOINTS.SEARCH}.bam?sport_code='mlb'&name_part='${options.query.value}%25'&active_sw='${options.active.value ? 'Y' : 'N'}'`;
            break;
        case ACTIONS.DETAILS:
            uri = `${BASE_URLS.STATS_API}/people/?personIds=${options.id.value}`;
            break;
        case ACTIONS.STATS:
            const statEndpoint = STATS_ENDPOINTS[options.stat_role.value][options.stat_type.value];
            uri = `${BASE_URLS.PUBLIC_LOOKUP}${statEndpoint}.bam?player_id=${options.id.value}&league_list_id='mlb_hist'&${statEndpoint}.season=${options.stat_season.value}&game_type='${options.stat_game_type.value}'`;
            break;
        case ACTIONS.INJURIES:
            uri = `${BASE_URLS.WSFB}${WSFB_ENDPOINTS.INJURIES}.bam`;
            break;
        case ACTIONS.NEWS:
            uri = `${BASE_URLS.WSFB}${WSFB_ENDPOINTS.NEWS}.bam?player_id='${options.id.value}'`;
            break;
        case ACTIONS.TRANSACTIONS:
            uri = `${BASE_URLS.PUBLIC_LOOKUP}${PUBLIC_ENDPOINTS.TRANSACTIONS}.bam?sport_code='mlb'&start_date=${options.start_date.value}&end_date=${options.end_date.value}`;
            break;
        default:
            this.emit('error', 'No endpoint provided.');
            break;
        }
        this.url = url.parse(uri);
        return this;
    }
    /**
     * Make the request to MLB stats API using built URL.
     * @private
     */
    makeRequest() {
        http.get({
            method: 'GET',
            protocol: this.url.protocol,
            host: this.url.host,
            path: this.url.path,
        }, (res) => {
            const statusCode = res.statusCode;
            const statusMessage = res.statusMessage;
            const contentType = res.headers['content-type'];

            let error;

            if (statusCode !== 200) {
                error = new Error(`${statusCode} - ${statusMessage}.`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error(`Invalid content type received. Expected JSON, got ${contentType}`);
            }

            if (error) {
                res.resume();
                this.emit('error', error);
            }

            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    this.emit('complete', parsedData);
                } catch (e) {
                    this.emit('error', e);
                }
            });
        }).on('error', (e) => {
            this.emit('error', e);
        });
    }
}

module.exports = MlbRequest;
