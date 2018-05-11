module.exports = {
    ACTIONS: {
        SEARCH: 'search',
        DETAILS: 'details',
        STATS: 'stats',
        INJURIES: 'injuries',
        TRANSACTIONS: 'transactions',
        NEWS: 'news',
    },
    ROLES: {
        HITTING: 'hitting',
        PITCHING: 'pitching',
        FIELDING: 'fielding',
    },
    BASE_URLS: {
        PUBLIC_LOOKUP: 'https://lookup-service-prod.mlb.com/lookup/json',
        STATS_API: `https://statsapi.mlb.com/api/v1`,
    },
};
