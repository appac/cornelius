const Promise = require('bluebird'),
			prune = require('./utils/prune'),
			find = require('./utils/find'),
			mlb = require('./utils/mlb');

let cornelius = function () {};

cornelius.prototype.searchPlayer = function (options) {
	return new Promise(function (resolve, reject) {
		let error;

		if (typeof options === 'object') {
			if (!options.query) {
				error = new Error(`searchPlayer - No search query provided.`);
			} else if (typeof options.query !== 'string') {
				error = new Error(`searchPlayer - Expected query to be a string, but was given a ${typeof(options.query)}.`);
			} else if (options.key && typeof options.key !== 'string') {
				error = new Error(`searchPlayer - Expected key to be a string, but was given a ${typeof(options.key)}.`)
			} else if (options.active && typeof options.active !== 'boolean') {
				error = new Error(`searchPlayer - Expected active to be a boolean, but was given a ${typeof(options.active)}.`)
			}
		}

		if (error) {
			reject(error);
		}

		mlb.search(options)
			.then(data => {
				if (options.key) {
					let requestedPlayer = find.player(data, options);
					data = requestedPlayer;
				}
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

cornelius.prototype.getRoster = function (options) {
	return new Promise(function (resolve, reject) {
		let error;
		if (typeof options === 'object') {
			if (!options.key) {
				error = new Error('No key provided to getRoster.');
			} else if (options.key.length < 2) {
				error = new Error('Key provided to getRoster is too short.');
			} else if (typeof(options.key) !== 'string') {
				error = new Error(`Expected key to be a string, but was given a ${typeof(options.key)}.`);
			} else if (options.full && typeof (options.full) !== 'boolean') {
				error = new Error (`Expected full to be a boolean, but was given a ${typeof(options.full)}.`)
			}
		}

		if (error) {
			reject(error);
		}

		let teamId = find.teamId(options.key || options);

		if (!teamId) {
			error = new Error(`No team matching '${options.key || options}' found.`);
			reject(error);
		} else {
			if (options.key) {
				options.key = teamId;
			} else {
				options = teamId;
			}
		}

		mlb.roster(options)
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
		} else if (options.type && typeof(options.type) !== 'string') {
			error = new Error(`getStats - Expected role to be a string but was given a '${typeof(options.type)}'.`)
		} else if (options.year && typeof(options.year) !== 'string') {
			error = new Error(`getStats - Expected year to be a string but was given a '${typeof(options.year)}'.`)
		}

		if (error) {
			reject(error);
		}

		mlb.stats(options)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});


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
