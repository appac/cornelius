'use strict';

let prunePlayerData = require('./_playerData'),
	pruneSearchResults = require('./_searchResults.js'),
	pruneRosterData = require('./_rosterData'),
	prunePlayerStats = require('./_playerStats');

function pruneHandler(data) {

	let typeOfData = checkTypeOfData(data);

	switch (typeOfData) {
		case 'player':
			return prunePlayerData(data);
		case 'search':
			return pruneSearchResults(data);
		case 'roster':
			return pruneRosterData(data);
		case 'stats':
			return prunePlayerStats(data);
		default:
			return new Error('Invalid data, cannot prune.');
	}

}

function checkTypeOfData(data) {
	let isPlayerData = data.hasOwnProperty('player_id') || data.hasOwnProperty('player_info');
	let isSearchResults = data.hasOwnProperty('search_player_all');
	let isRosterData = data.hasOwnProperty('roster_all');
	let isPlayerStats = data.hasOwnProperty('sport_hitting_tm') || data.hasOwnProperty('sport_pitching_tm');

	if (isPlayerData) {
		return 'player';
	} else if (isSearchResults) {
		return 'search';
	} else if (isRosterData) {
		return 'roster';
	} else if (isPlayerStats) {
		return 'stats';
	} else {
		return;
	}

}

module.exports = pruneHandler;
