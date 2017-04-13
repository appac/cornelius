const http = require('http'),
			Promise = require('bluebird'),
			url = require('url'),
			baseUrl = 'http://m.mlb.com/lookup/json';

var cornelius = function () {};

cornelius.prototype.search = function (playerName) {
	return new Promise(function (resolve, reject) {

		var uri = url.parse(baseUrl + '/named.search_player_all.bam?sport_code=\'mlb\'&name_part=\'' + playerName + '%25\'&active_sw=\'Y\'');

		var options = {
			host: uri.host,
			path: uri.path
		};

		http.get(options, function (res) {
			const statusCode = res.statusCode;
			const contentType = res.headers['content-type'];

			let error;

			if (statusCode !== 200) {
				error = new Error(`${statusCode} - Request failed.`);
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error(`Invalid content type received. Expected JSON, got ${contentType}`);
			}
			if (error) {
				res.resume();
				reject(error.message);
			}

			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					resolve(parsedData);
				} catch (e) {
					reject(e.message)
				}
			});
		}).on('error', (e) => {
			reject(e.message);
		});

	});
};

cornelius.prototype.get = function (playerName, givenKey) {
		console.log('This gets a player by name and key (player ID or team abbrev).');
};

module.exports = new cornelius();