const http = require('http'),
			Promise = require('bluebird'),
			url = require('url'),
			baseUrl = 'http://m.mlb.com/lookup/json';

var cornelius = function () {};

cornelius.prototype.findPlayer = function (playerName, pruned) {
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
					if (pruned === true) {
						const prunedData = pruneData(parsedData);
						resolve(prunedData);
					}
					resolve(parsedData.search_player_all.queryResults);
				} catch (e) {
					reject(e.message)
				}
			});
		}).on('error', (e) => {
			reject(e.message);
		});

	});
};

cornelius.prototype.getPlayer = function (playerName, givenKey) {
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
						const player = findPlayerInResults(parsedData, givenKey);
						resolve(player);
					} catch (e) {
						reject(e.message)
					}
				});
			}).on('error', (e) => {
				reject(e.message);
			});

	});
};

module.exports = new cornelius();

function findPlayerInResults(data, key) {
	var resultsCount = data.search_player_all.queryResults.totalSize;
	var requestedPlayer = {};
	var key = key.toUpperCase();

	function hasMatchingKey(player) {
		if (player.team_abbrev === key || player.player_id === key) {
			return true;
		}
		return false;
	}

	if (resultsCount > 1) {
		var results = data.search_player_all.queryResults.row;
		var p = results.findIndex(hasMatchingKey);
		requestedPlayer = results[p];
	}

	return requestedPlayer
	
}



function pruneData(data) {
	var prunedData = [];
	var players = data.search_player_all.queryResults.row;

	if (data.search_player_all.queryResults.totalSize > 0) {
		players.forEach(function(player) {
			prunedData.push(player);
		});
	}

	return prunedData;

}
