module.exports = {
    ACTIONS: {
        SEARCH: 'search',
        DETAILS: 'details',
        STATS: 'stats',
        INJURIES: 'injuries',
        TRANSACTIONS: 'transactions',
        NEWS: 'news',
    },
    STAT_TYPES: {
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
    BASE_URLS: {
        PUBLIC_LOOKUP: 'https://lookup-service-prod.mlb.com/json/named.',
        STATS_API: `https://statsapi.mlb.com/api/v1`,
    },
};
