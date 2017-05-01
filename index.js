const Promise = require('bluebird'),
			prune = require('./utils/prune'),
			find = require('./utils/find'),
			mlb = require('./utils/mlb');

let cornelius = function () {};

cornelius.prototype.searchPlayer = function (options) {
	return new Promise(function (resolve, reject) {
		let error;
		if (!options.query) {
			error = new Error(`searchPlayer - No search query provided.`);
		} else if (typeof(options.query) !== 'string') {
			error = new Error(`searchPlayer - Expected query to be a string, but was given a ${typeof(options.query)}.`);
		}

		if (error) {
			reject(error);
		}

		mlb.search(options)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
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

		mlb.search(query)
			.then(function (data) {
				let requestedPlayer = find.player(data, key);
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

		mlb.search(query, false)
			.then(function (data) {
				let requestedPlayer = find.player(data, key);
				resolve(requestedPlayer);
			})
			.catch(function (error) {
				reject(error);
			});

	});
}

cornelius.prototype.getRoster = function (key) {
	return new Promise(function (resolve, reject) {
		let error;
		if (!key) {
			error = new Error('No key provided to getRoster.');
		} else if (key.length < 2) {
			error = new Error('Key provided to getRoster is too short.');
		} else if (typeof(key) !== 'string') {
			error = new Error(`Expected key to be a string, but was given a ${typeof(key)}.`);
		}

		if (error) {
			reject(error);
		}

		// key = key.toUpperCase();
		let teamId = find.teamId(key);

		if (!teamId) {
			error = new Error(`No team matching '${key}' found.`);
			reject(error);
		}
			
		mlb.roster(teamId)
			.then(function (data) {
				resolve(data);
		})
		.catch(function (error) {
				reject(error);
		});

	});
}

cornelius.prototype.getStats = function (options) {
	return new Promise (function (resolve, reject) {
		let error;

		if (!options.id) {
			error = new Error(`getStats - No id provided.`);
		} else if (typeof(options.id) !== 'string') {
			error = new Error(`getStats - Expected id to be a string but was given a '${typeof(options.id)}'.`)
		} else if (options.role && typeof(options.role) !== 'string') {
			error = new Error(`getStats - Expected role to be a string but was given a '${typeof(options.role)}'.`)
		} else if (options.year && typeof(options.year) !== 'string') {
			error = new Error(`getStats - Expected year to be a string but was given a '${typeof(options.year)}'.`)
		}

		if (error) {
			reject(error);
		}

		if (options.role === 'pitching') {
			mlb.pitchingStats(options.id, options.year)
				.then(function (data) {
					resolve(data);
				})
				.catch(function (error) {
					reject(error)
				});
		} else {
			mlb.hittingStats(options.id, options.year)
				.then(function (data) {
					resolve(data);
				})
				.catch(function (error) {
					reject(error);
				});
		}


	});
}

cornelius.prototype.prune = function (data) {
	let isPlayerData = data.hasOwnProperty('player_id');
	let isSearchResults = data.hasOwnProperty('search_player_all');
	let isRosterData = data.hasOwnProperty('roster_all');
	let isPlayerStats = data.hasOwnProperty('sport_hitting_tm') || data.hasOwnProperty('sport_pitching_tm');

	if (isPlayerData) {
		return prune.playerData(data);
	} else if (isSearchResults) {
		return prune.searchResults(data);
	} else if (isRosterData) {
		return prune.rosterData(data);
	} else if (isPlayerStats) {
		return prune.playerStats(data);
	} else {
		return new Error('Invalid data given to prune.');
	}

}

module.exports = new cornelius;
