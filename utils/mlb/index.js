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

mlb.prototype.hittingStats = function (playerId, year) {
	return new Promise (function (resolve, reject) {
		if (!year) {
			year = '2017'
		}

		let uri = url.parse(baseUrl + `/named.sport_hitting_tm.bam?game_type=%27R%27&league_list_id=%27mlb%27&player_id=${playerId}&sport_hitting_tm.season=${year}`);

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

mlb.prototype.pitchingStats = function (playerId, year) {
	//mlb.mlb.com/lookup/json/named.sport_pitching_tm.bam?game_type=%27R%27&league_list_id=%27mlb%27&player_id=519242&sport_pitching_tm.season=2016
	return new Promise (function (resolve, reject) {
		if (!year) {
			year = '2017'
		}

		let uri = url.parse(baseUrl + `/named.sport_pitching_tm.bam?game_type=%27R%27&league_list_id=%27mlb%27&player_id=${playerId}&sport_pitching_tm.season=${year}`);

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
