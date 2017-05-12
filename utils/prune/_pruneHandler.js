'use strict';

let prunePlayerData = require('./_playerData'),
		pruneSearchResults = require('./_searchResults.js'),
		pruneRosterData = require('./_rosterData'),
		prunePlayerStats = require('./_playerStats');

/**
 * Checks the type of data, hands it off to appropriate pruner.
 * 
 * @private
 * @param {Object} data - The raw data.
 * @throws Throws an error if type of data cannot be determined.
 */
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
			throw new Error('Invalid data, cannot prune.');
	}

}
/**
 * Checks data to determine what type it is.
 * 
 * @private
 * @param {Object} data - The raw data to be checked
 * @returns {string} - A string denoting the type of data it was given.
 */
function checkTypeOfData(data) {
	let isPlayerData = data.hasOwnProperty('player_id') || data.hasOwnProperty('player_info');
	let isSearchResults = data.hasOwnProperty('search_player_all');
	let isRosterData = data.hasOwnProperty('roster_40');
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
