const PLAYER_CONSTANTS = {
    ACTIONS: {
        SEARCH: 'search',
        DETAILS: 'details',
        STATS: 'stats',
        INJURIES: 'injuries',
        TRANSACTIONS: 'transactions',
        NEWS: 'news',
    },
    ENDPOINTS: {
        WSFB: {
            BASE: 'http://mlb.mlb.com/fantasylookup/json/named.',
            NEWS: 'wsfb_news_browse',
            INJURIES: 'wsfb_news_injury',
        },
        PUBLIC_LOOKUP: {
            BASE: 'http://lookup-service-prod.mlb.com/json/named.',
            SEARCH: 'search_player_all',
            STATS: {
                HITTING: {
                    TEAM: 'sport_hitting_tm',
                    LEAGUE: 'sport_career_hitting_lg',
                    CAREER: 'sport_career_hitting',
                },
                PITCHING: {
                    TEAM: 'sport_pitching_tm',
                    LEAGUE: 'sport_career_pitching_lg',
                    CAREER: 'sport_career_pitching',
                },
                FIELDING: {
                    TEAM: 'sport_fielding_tm',
                    LEAGUE: 'sport_career_fielding_lg',
                    CAREER: 'sport_career_fielding',
                },
            },
            TRANSACTIONS: 'transaction_all',
        },
        STATS_API: {
            BASE: 'http://statsapi.mlb.com/api/v1',
        },
    },
};

const TEAM_CONSTANTS = {
    ACTIONS: {
        LIST: 'list',
        DETAILS: 'details',
        COACHES: 'coaches',
        AFFILIATES: 'affiliates',
        LEADERS: 'leaders',
        ROSTER: 'roster',
        INJURIES: 'injuries',
        TRANSACTIONS: 'transactions',
    },
    ENDPOINTS: {
        WSFB: {
            BASE: 'http://mlb.mlb.com/fantasylookup/json/named.',
            INJURIES: 'wsfb_news_injury',
        },
        PUBLIC_LOOKUP: {
            BASE: 'http://lookup-service-prod.mlb.com/json/named.',
            TRANSACTIONS: 'transaction_all',
        },
        STATS_API: {
            BASE: 'http://statsapi.mlb.com/api/v1',
        },
    },
};

const OPTION_TYPES = {
    QUERY: 'string',
    ACTIVE: 'boolean',
    ID: 'string',
    TYPE: 'string',
    ROLE: 'string',
    GAME_TYPE: 'string',
    SEASON: 'string',
    START_DATE: 'string',
    END_DATE: 'string',
    LEAGUE: 'string',
    PRUNE: 'boolean',
};

module.exports = {
    PLAYER: PLAYER_CONSTANTS,
    TEAM: TEAM_CONSTANTS,
    OPTION_TYPES: OPTION_TYPES,
};
