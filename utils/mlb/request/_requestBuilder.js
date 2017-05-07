'use strict';

const url = require('url'),
	base = 'http://mlb.mlb.com/lookup/json/named.',
	endpoints = {
		search: 'search_player_all.bam',
		player_info: 'player_info.bam',
		roster: 'roster_40.bam',
		stats: {
			hitting: 'sport_hitting_tm.bam',
			pitching: 'sport_pitching_tm.bam'
		}
	};

function buildRequest(type, options) {
	let uri = base;

	switch (type) {
		case 'search':
			if (options.active === false) {
				uri += `${endpoints.search}?sport_code='mlb'&name_part='${options.query}%25'&active_sw='N'`;
			} else {
				uri += `${endpoints.search}?sport_code='mlb'&name_part='${options.query || options}%25'&active_sw='Y'`;
			}
			break;
		case 'get':
			uri += `${endpoints.player_info}?sport_code='mlb'&player_id='${options}'`;
			break;
		case 'roster':
			if (options.full) {
				uri += `${endpoints.roster}?team_id='${options.key || options}'`
			} else {
				uri += `${endpoints.roster}?team_id='${options.key || options}'&roster_all.col_in=name_display_first_last&roster_all.col_in=player_id`
			}
			break;
		case 'statsHitting':
			if (options.year) {
				uri += `${endpoints.stats.hitting}?player_id=${options.id || options}&sport_hitting_tm.season=${options.year}&game_type='R'&league_list_id='mlb'`;
			} else {
				uri += `${endpoints.stats.hitting}?player_id=${options.id || options}&game_type='R'&league_list_id='mlb'`;
			}
			break;
		case 'statsPitching':
			if (options.year) {
				uri += `${endpoints.stats.pitching}?player_id=${options.id || options}&sport_pitching_tm.season=${options.year}&game_type='R'&league_list_id='mlb'`;
			} else {
				uri += `${endpoints.stats.pitching}?player_id=${options.id || options}&game_type='R'&league_list_id='mlb'`;
			}
			break;
		default:
			return new Error('Invalid request type.');
	}

	return url.parse(uri);

}

module.exports = buildRequest;
