const http = require('http'),
			url = require('url'),
			Promise = require('bluebird'),
			baseUrl = 'http://m.mlb.com/lookup/json';

let mlb = function () {}

mlb.prototype.search = function (query, isActive) {
	return new Promise(function (resolve, reject) {
		let uri;

		if (isActive === false) {
			uri = url.parse(baseUrl + '/named.search_player_all.bam?sport_code=\'mlb\'&name_part=\'' + query + '%25\'&active_sw=\'N\'');
		} else {
			uri = url.parse(baseUrl + '/named.search_player_all.bam?sport_code=\'mlb\'&name_part=\'' + query + '%25\'&active_sw=\'Y\'');
		}

		let reqOptions = {
			host: uri.host,
			path: uri.path
		};

		http.get(reqOptions, function (res) {
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
					let hasPlayerResults = parsedData.search_player_all.queryResults.totalSize > 0;
					if (!hasPlayerResults) {
						reject(new Error(`No player with the name '${query}' exists.`));
					}
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

mlb.prototype.roster = function (teamId) {
	return new Promise(function (resolve, reject) {
		let uri = url.parse(baseUrl + `/named.roster_all.bam?roster_all.col_in=player_html&roster_all.col_in=player_id&team_id=%27${teamId}%27&ovrd_enc=utf-8`);

		let reqOptions = {
			host: uri.host,
			path: uri.path
		}

		http.get(reqOptions, function (res) {
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

module.exports = new mlb;