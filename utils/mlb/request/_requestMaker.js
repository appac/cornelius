/* jslint node: true */
/* jslint esversion: 6 */

'use strict';

const http = require('http'),
			Promise = require('bluebird');

function requestMaker (url) {
	return new Promise(function (resolve, reject) {

		let options = {
			host: url.host,
			path: url.path
		};

		http.get(options, function (res) {
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

			res.setEncoding('utf8');

			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					resolve(parsedData);
				} catch (e) {
					reject(e)
				}
			});
		}).on('error', (e) => {
			reject(e);
		});
	});
}

module.exports = requestMaker;
