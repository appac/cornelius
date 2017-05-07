/* jslint node: true */
/* jslint esversion: 6 */

'use strict';

const Promise = require('bluebird'),
			prune = require('./utils/prune'),
			validation = require('./utils/validate'),
			mlb = require('./utils/mlb');

let cornelius = function () {};

cornelius.prototype.searchPlayer = function (options) {
	return new Promise(function (resolve, reject) {

		let error;
		error = validation.handler('search', options);

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

cornelius.prototype.getPlayer = function (options) {
		return new Promise(function (resolve, reject) {

		let error;
		error = validation.handler('get', options);

		if (error) {
			reject(error);
		}

		mlb.player(options)
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
	let prunedData = prune.handler(data);
	return prunedData;
}

module.exports = new cornelius;
