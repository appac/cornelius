const http = require('http'),
			Promise = require('bluebird'),
			url = require('url'),
			baseUrl = 'http://m.mlb.com/lookup/json';

let cornelius = function () {};

cornelius.prototype.search = function (query) {
	return new Promise(function (resolve, reject) {
		let error;
		if (!query || typeof(query) !== 'string') {
			error = new Error(`No search query provided.`);
		} else if (typeof(query) !== 'string') {
			error = new Error(`Expected query to be a string, but was given a ${typeof(query)}.`);
		}

		if (error) {
			reject(error);
		}

		callMlb(query)
			.then(function (data) {
				resolve(data);
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

cornelius.prototype.searchHistoric = function (query) {
	return new Promise(function (resolve, reject) {
		let error;
		if (!query || typeof(query) !== 'string') {
			error = new Error(`No search query provided.`);
		} else if (typeof(query) !== 'string') {
			error = new Error(`Expected query to be a string, but was given a ${typeof(query)}.`);
		}

		if (error) {
			reject(error);
		}

		callMlb(query, false)
			.then(function (data) {
				resolve(data);
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

cornelius.prototype.get = function (query, key) {
	return new Promise(function (resolve, reject) {
		let error;
		if(!query) {
			error = new Error('No player name provided.')
		} else if (typeof(query) !== 'string') {
			error = new Error(`Expected player name to be a string, but was given a ${typeof(query)}.`);
		} else if (query.split(' ').length < 1) {
			error = new Error(`Full player name required to get player details.`);
		} else if (!key) {
			error = new Error('No key provided.');
		} else if (typeof(key) !== 'string') {
			error = new Error(`Expected key to be a string, but was given a ${typeof(key)}.`);
		}

		if (error) {
			reject(error);
		}

		callMlb(query)
			.then(function (data) {
				requestedPlayer = findPlayerInResults(data, key);
				resolve(requestedPlayer);
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

cornelius.prototype.getHistoric = function (query, key) {
	return new Promise(function (resolve, reject) {
		let error;
		if(!query) {
			error = new Error('No player name provided.')
		} else if (typeof(query) !== 'string') {
			error = new Error(`Expected player name to be a string, but was given a ${typeof(query)}.`);
		} else if (query.split(' ').length < 1) {
			error = new Error(`Full player name required to get player details.`);
		} else if (!key) {
			error = new Error('No key provided.');
		} else if (typeof(key) !== 'string') {
			error = new Error(`Expected key to be a string, but was given a ${typeof(key)}.`);
		}

		if (error) {
			reject(error);
		}

		callMlb(query, false)
			.then(function (data) {
				requestedPlayer = findPlayerInResults(data, key);
				resolve(requestedPlayer);
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

module.exports = new cornelius;

function findPlayerInResults(mlbData, key) {
	if (!key) {
		return new Error('findPlayerInResults wasn\'t given a key.');
	} else if (typeof(key) !== 'string') {
		return new Error(`findPlayerInResults expected key to be a string, but was given a ${typeof(key)}.`);
	}
	function hasMatchingKey(player) {
		let keyUpper = key.toUpperCase();
		if (player.player_id === keyUpper || player.team_abbrev === keyUpper) {
			return true;
		} else {
			return false;
		}
	}

	let results = mlbData.search_player_all.queryResults.row;
	let resultsCount = mlbData.search_player_all.queryResults.totalSize;
	let requestedPlayer = {};

	if (resultsCount > 1) {
		let p = results.findIndex(hasMatchingKey);
		requestedPlayer = results[p];
	} else if (resultsCount == 1) {
		requestedPlayer = results;
	}

	if (!requestedPlayer) {
		return new Error('No player found with matching key.');
	}

	return requestedPlayer;

}

function callMlb(query, isActive) {
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
			res.on('data', (chunk) => { rawData += chunk; });
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
