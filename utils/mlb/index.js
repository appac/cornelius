const mlbRequest = require('./request'),
			Promise = require('bluebird');

let mlb = function () {}

mlb.prototype.search = function (options) {
	return new Promise(function (resolve, reject) {

		let url = mlbRequest.build('search', options);

		mlbRequest.make(url)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

mlb.prototype.roster = function (options) {
	return new Promise(function (resolve, reject) {

		let url = mlbRequest.build('roster', options);

		mlbRequest.make(url)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			});

	});
}

mlb.prototype.stats = function (options) {
	return new Promise (function (resolve, reject) {
		let url;
		if (options.type === 'pitching') {
			url = mlbRequest.build('statsPitching', options); 
		} else {
			url = mlbRequest.build('statsHitting', options);
		}
		console.log(url);
		mlbRequest.make(url)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				reject(error);
			})
	});
}

module.exports = new mlb;
