'use strict';

const http = require('http');
const Promise = require('bluebird');

/**
 * Makes the request to MLB.
 *
 * @private
 * @param {Object} url - Parsed URL object.
 * @return {Promise} - Promise to be fulfilled with JSON parsed response data, or error.
 */
function requestMaker(url) {
    return new Promise((resolve, reject) => {
        const options = {
            host: url.host,
            path: url.path,
        };

        http.get(options, (res) => {
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
                reject(error);
            }

            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

module.exports = requestMaker;
