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
        default:
            this.emit('error', 'No endpoint provided.');
            break;
        }
        this.url = url.parse(uri);
        return this;
    }
    /**
     * Make the request to MLB stats API using built URL.
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
