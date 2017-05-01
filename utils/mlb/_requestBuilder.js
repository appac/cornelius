const url = require('url');

let base = 'http://mlb.mlb.com/lookup/json/named.';
let endpoints = {
	search: 'search_player_all.bam',
	roster: 'roster_all.bam',
	stats: {
		hitting: 'sport_hitting_tm.bam',
		pitching: 'sport_pitching_tm.bam'
	}
};

function buildRequest(type, options) {
	let uri = base;
	let currentYear = new Date().getFullYear();

	switch (type) {
		case 'search':
			if (options.active === false) {
				uri += `${endpoints.search}?sport_code='mlb'&name_part='${options.query}%25'&active_sw='N'`;
			} else {
				uri += `${endpoints.search}?sport_code='mlb'&name_part='${options.query || options}%25'&active_sw='Y'`;
			}
			break;
		case 'roster':
			if (options.full) {
				uri += `${endpoints.roster}?team_id='${options.key || options}'`
			} else {
				uri += `${endpoints.roster}?team_id='${options.key || options}'&roster_all.col_in=name_display_first_last&roster_all.col_in=player_id`
			}
			break;
		case 'statsHitting':
			uri += `${endpoints.stats.hitting}?player_id=${options.id}&sport_hitting_tm.season=${options.year || currentYear}&game_type='R'&league_list_id='mlb'`;
			break;
		case 'statsPitching':
			uri += `${endpoints.stats.pitching}?player_id=${options.id}&sport_pitching_tm.season=${options.year || currentYear}&game_type='R'&league_list_id='mlb'`;
			break;
		default:
			break;
	}
	
	return url.parse(uri);

}

module.exports = buildRequest;
