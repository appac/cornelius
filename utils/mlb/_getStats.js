let mlbRequest = require('./request'),
		find = require('../find');

function getStats (options) {
	return new Promise (function (resolve, reject) {
		let url;
		
		if (options.type === 'pitching') {
			url = mlbRequest.build('statsPitching', options); 
		} else {
			url = mlbRequest.build('statsHitting', options);
		}

		mlbRequest.make(url)
			.then(data => {
				if (options.year) {
					resolve(data);
				} else {
					// TODO: Add a function that handles grabbing the latest stats (in find?)
					let latestStats = find.latestStats(data);
					resolve(latestStats);
				}
			})
			.catch(error => {
				reject(error);
			})
	});
}

module.exports = getStats;
