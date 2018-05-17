module.exports = {
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
            NEWS: 'wsfb_news_browse',
            INJURIES: 'wsfb_news_injury',
        },
        PUBLIC_LOOKUP: {
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
            ROSTER: {
                FORTY: 'roster_40',
                ALL: 'roster_all',
            },
            TRANSACTIONS: 'transaction_all',
        },
    },
    BASE_URLS: {
        PUBLIC_LOOKUP: 'http://lookup-service-prod.mlb.com/json/named.',
        STATS_API: `http://statsapi.mlb.com/api/v1`,
        WSFB: `http://mlb.mlb.com/fantasylookup/json/named.`,
    },
};
