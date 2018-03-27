'use strict';

const url = require('url');
const base = 'http://lookup-service-prod.mlb.com/json/named.';
const endpoints = {
        search: 'search_player_all.bam',
        player_info: 'player_info.bam',
        roster: 'roster_40.bam',
        stats: {
            hitting: 'sport_hitting_tm.bam',
            pitching: 'sport_pitching_tm.bam',
        },
    };


/**
 * Builds the MLB request url.
 *
 * @private
 * @param {string} type - The type of request - determines the endpoint to use.
 * @param {Object|string} options - The options to make the request with.
 * @return {Object} url - Parsed URL object.
 */
function buildRequest(type, options) {
    let uri = base;

    switch (type) {
    case 'search_player_all':
        uri += `${endpoints.search}?sport_code='mlb'&name_part='${options.query}%25'&active_sw='${options.active ? 'Y' : 'N'}'`;
        break;
    case 'player_info':
        uri += `${endpoints.player_info}?sport_code='mlb'&player_id='${options.player_id}'`;
        break;
    case 'roster_40':
        if (options.short === true) {
            uri += `${endpoints.roster}?team_id='${options.team_id}'&roster_40.col_in=name_display_first_last&roster_40.col_in=player_id`;
        } else {
            uri += `${endpoints.roster}?team_id='${options.team_id}'`;
        }
        break;
    case 'roster_team_alltime':
        uri += `roster_team_alltime.bam?team_id='${options.team_id}'&start_season='${options.season.start}'&end_season='${options.season.end}'`;
        if (options.short === true) {
            uri += '&roster_team_alltime.col_in=name_first_last&roster_team_alltime.col_in=player_id';
        }
        break;
    case 'sport_hitting_tm':
        if (options.season) {
            uri += `${endpoints.stats.hitting}?player_id=${options.player_id}&sport_hitting_tm.season=${options.season}&game_type='R'&league_list_id='mlb'`;
        } else {
            uri += `${endpoints.stats.hitting}?player_id=${options.player_id}&game_type='R'&league_list_id='mlb'`;
        }
        break;
    case 'sport_pitching_tm':
        if (options.season) {
            uri += `${endpoints.stats.pitching}?player_id=${options.player_id}&sport_pitching_tm.season=${options.season}&game_type='R'&league_list_id='mlb'`;
        } else {
            uri += `${endpoints.stats.pitching}?player_id=${options.player_id}&game_type='R'&league_list_id='mlb'`;
        }
        break;
    default:
        return;
    }

    return url.parse(uri);
}

module.exports = buildRequest;
