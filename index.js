const http = require('http'),
			Promise = require('bluebird'),
			url = require('url'),
			baseUrl = 'http://m.mlb.com/lookup/json',
			teams = require('./team.manifest.json');

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

cornelius.prototype.getRoster = function (key) {
	return new Promise(function (resolve, reject) {
		key = key.toUpperCase();
		let teamID = getTeamID(key);
		if (!teamID) {
			return new Error(`No team matching '${key}' found.`);
		}
		rosterCall(teamID)
			.then(function (data) {
				resolve(data);
		})
		.catch(function (error) {
				reject(error);
		});

	});
}

cornelius.prototype.prune = function (data) {
	let isPlayerData = data.hasOwnProperty('player_id');
	let isSearchResults = data.hasOwnProperty('search_player_all');
	let isRosterData = data.hasOwnProperty('roster_all');
	if (isPlayerData) {
		return prunePlayerData(data);
	} else if (isSearchResults) {
		return pruneSearchResults(data);
	} else if (isRosterData) {
		return pruneRosterData(data);
	} else {
		return new Error('Invalid data given to prune.');
	}

}

module.exports = new cornelius;

function prunePlayerData(data) {
	let player = {
		id: data.player_id,
		name: {
			full: data.name_display_first_last,
			first: data.name_first,
			last: data.name_last,
			roster: data.name_display_roster
		},
		position: {
			id: data.position_id,
			code: data.position
		},
		team: {
			id: data.team_id,
			name: data.team_full,
			abbrev: data.team_abbrev,
			code: data.team_code,
			league: data.league
		},
		date: {
			pro_debut: data.pro_debut_date,
			birth: data.birth_date
		},
		geo: {
			city: data.birth_city,
			state: data.birth_city,
			country: data.birth_country,
			high_school: data.high_school,
			college: data.college
		},
		attribute: {
			bats: data.bats,
			throws: data.throws,
			weight: data.weight,
			height: {
				feet: data.height_feet,
				inches: data.height_inches
			}
		}
	};

	return player;

}

function pruneSearchResults(data) {
	let resultsCount = data.search_player_all.queryResults.totalSize;
	let prunedResults = [];

	if (resultsCount > 1) {
		let searchResults = data.search_player_all.queryResults.row;

		searchResults.forEach(function (player) {
			let prunedPlayer = prunePlayerData(player);
			prunedResults.push(prunedPlayer);
		});
	} else {
		let player = data.search_player_all.queryResults.row;
		let prunedPlayer = prunePlayerData(player);

		prunedResults.push(prunedPlayer);
	}

	return prunedResults;

}

function pruneRosterData(data) {
	let prunedData = [];
	let roster = data.roster_all.queryResults.row;

	roster.forEach(function (player) {
		let name = player.player_html;
		name = name.replace(/\,/g,"").split(' ').reverse().join(' ');
		let prunedPlayer = {
			id: player.player_id,
			name: name
		}
		prunedData.push(prunedPlayer);
	});

	return prunedData;
}

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

function getTeamID(key) {
	let teamID;

	teams.forEach(function (team) {
		let team_abbrev = team.name_abbrev.toUpperCase();
		let team_name = team.name_display_full.toUpperCase();

		if (key == team_abbrev || key == team.team_id || key == team_name) {
			teamID = team.team_id;
		}

	});

	return teamID;
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

function rosterCall(teamID) {
	return new Promise(function (resolve, reject) {
		let uri = url.parse(baseUrl + `/named.roster_all.bam?roster_all.col_in=player_html&roster_all.col_in=player_id&team_id=%27${teamID}%27&ovrd_enc=utf-8`);

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
			res.on('data', (chunk) => { rawData += chunk; });
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
