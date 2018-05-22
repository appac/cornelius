const EventEmitter = require('events').EventEmitter;
const http = require('http');

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
