const Promise = require('bluebird'),
			teams = require('./team.manifest.json'),
			prune = require('./utils/prune'),
			find = require('./utils/find'),
			mlb = require('./utils/mlb');

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

		mlb.search(query)
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

		mlb.search(query, false)
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

		key = key.toUpperCase();
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

cornelius.prototype.prune = function (data) {
	let isPlayerData = data.hasOwnProperty('player_id');
	let isSearchResults = data.hasOwnProperty('search_player_all');
	let isRosterData = data.hasOwnProperty('roster_all');

	if (isPlayerData) {
		return prune.playerData(data);
	} else if (isSearchResults) {
		return prune.searchResults(data);
	} else if (isRosterData) {
		return prune.rosterData(data);
	} else {
		return new Error('Invalid data given to prune.');
	}

}

module.exports = new cornelius;
