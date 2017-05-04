const Promise = require('bluebird'),
			prune = require('./utils/prune'),
			validation = require('./utils/validate'),
			mlb = require('./utils/mlb');

let cornelius = function () {};

cornelius.prototype.searchPlayer = function (options) {
	return new Promise(function (resolve, reject) {

		let error;
		if (options.key) {
			error = validation.handler('get', options);
		} else {
			error = validation.handler('search', options);
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

cornelius.prototype.getRoster = function (options) {
	return new Promise(function (resolve, reject) {

		let error;
		error = validation.handler('roster', options);

		if (error) {
			reject(error);
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
		error = validation.handler('stats', options);

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
