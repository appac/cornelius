'use strict';

/**
 * Given an array of search results, or single search result object,
 * returns a pruned/restructured copy.
 * 
 * If given an array, uses array.map to process each object in the array.
 * 
 * @param {Object|Array} data - Raw search results. 
 * @return {Object|Array} - Pruned/restructured search results.
 */
function pruneSearchData(data) {
    function restructure(data) {
        return {
            id: data.player_id,
            name: {
                full: data.name_display_first_last,
                first: data.name_first,
                last: data.name_last,
                roster: data.name_display_roster
            },
            position: {
                id: data.position_id,
                code: data.position
            },
            team: {
                id: data.team_id,
                name: data.team_full,
                abbrev: data.team_abbrev,
                code: data.team_code,
                league: data.league
            },
            date: {
                pro_debut: data.pro_debut_date,
                birth: data.birth_date
            },
            geo: {
                city: data.birth_city,
                state: data.birth_state,
                country: data.birth_country,
                high_school: data.high_school,
                college: data.college
            },
            attribute: {
                bats: data.bats,
                throws: data.throws,
                weight: data.weight,
                height: {
                    feet: data.height_feet,
                    inches: data.height_inches
                }
            }
        };
    }
    if (data.length > 1) {
        return data.map(restructure);
    } else {
        return restructure(data);
    }
}

/**
 * Given a `player_info` object, returns a pruned copy.
 * 
 * @param {Object} data - Raw player data. 
 * @return {Object} - Pruned/restructured player data.
 * 
 */
function prunePlayerInfo(data) {
    function restructure(data) {
        return {
            id: data.player_id,
            jersey_number: data.jersey_number,
            status: {
                full: data.status,
                code: data.status_code,
                date: data.status_date
            },
            name: {
                full: data.name_display_first_last,
                first: data.name_first,
                last: data.name_last,
                roster: data.name_display_roster
            },
            position: {
                id: data.primary_position,
                code: data.primary_position_txt
            },
            team: {
                id: data.team_id,
                name: data.team_name,
                abbrev: data.team_abbrev,
                code: data.team_code
            },
            date: {
                debut: data.pro_debut_date,
                birth: data.birth_date
            },
            geo: {
                city: data.birth_city,
                state: data.birth_state,
                country: data.birth_country,
                high_school: data.high_school,
                college: data.college
            },
            attribute: {
                age: data.age,
                gender: data.gender,
                bats: data.bats,
                throws: data.throws,
                weight: data.weight,
                height: {
                    feet: data.height_feet,
                    inches: data.height_inches
                }
            }
        };
    }
    return restructure(data);
}

/**
 * Given an `roster_40` array, returns a pruned/restructured copy. 
 * 
 * This function also handles short form roster data (just a name and ID for each player).
 * It determines short form roster data by looking for a `pro_debut_date` property on the
 * first element of the roster array. This property is only present on full/long form roster data.
 * 
 * @param {Array} data - Raw roster data.
 * @return {Array} - Pruned/restructured roster data.
 */
function pruneRosterData(data) {
    function restructure(data) {
        return {
            id: data.player_id,
            jersey_number: data.jersey_number,
            name: {
                first: data.name_first,
                last: data.name_last,
                full: data.name_display_first_last
            },
            status: {
                code: data.status_code
            },
            team: {
                id: data.team_id,
                name: data.team_name,
                code: data.team_code,
                abbrev: data.team_abbrev
            },
            position: {
                id: data.primary_position,
                code: data.position_txt
            },
            date: {
                birth: data.birth_date,
                pro_debut: data.pro_debut_date
            },
            geo: {
                college: data.college
            },
            attribute: {
                bats: data.bats,
                throws: data.throws,
                weight: data.weight,
                height: {
                    feet: data.height_feet,
                    inches: data.height_inches
                }
            }
        };
    }
    function restructureShort(data) {
        return {
            id: data.player_id,
            name: data.name_display_first_last
        };
    }
    if (data[0].hasOwnProperty('pro_debut_date')) {
        return data.map(restructure);
    } else {
        return data.map(restructureShort);
    }

}

/**
 * Given either a `sport_hitting_tm` or `sport_pitching_tm` stats data object,
 * returns a pruned/restructured copy.
 * 
 * Typically this function will only receive a single stats object to prune,
 * but if it does receive an array of objects, they are handled via array.map.
 * 
 * @param {Object} data - Raw stat data.
 * @return {Object|Array} - Pruned/restructured stats data.
 */
function pruneStatData(data) {
    function restructure(data) {
        const props = Object.keys(data),
            restruct = {
                id: '',
                team: {},
                league: {},
                sport: {}
            };

        return props.reduce((restructured, prop) => {
            if (/team/.test(prop)) {
                restructured.team[prop] = data[prop];
            } else if (/league/.test(prop)) {
                restructured.league[prop] = data[prop];
            } else if (/sport/.test(prop)) {
                restructured.sport[prop] = data[prop];
            } else if (prop === 'player_id') {
                restructured.id = data[prop];
            } else {
                restructured[prop] = data[prop];
            }
            return restructured;
        }, restruct);
    }
    if (data.length > 1) {
        return data.map(restructure);
    } else {
        return restructure(data);
    }
}

/**
 * Given a raw MLB data object, determines what type of data it is
 * by checking the first property on the object. 
 * 
 * The object is then passed on to an appropriate pruner, or an
 * error is returned (to be thrown by the caller) if none can be found.
 * 
 * @private
 * @param {Object} rawData - Raw MLB data.
 * @returns {Object|Array} - Returns an object or array of objects.
 */
function pruneHandler(rawData) {
    const dataType = Object.keys(rawData)[0];

    if (dataType === 'search_player_all') {
        return pruneSearchData(rawData[dataType].queryResults.row);
    } else if (dataType === 'player_info') {
        return prunePlayerInfo(rawData[dataType].queryResults.row);
    } else if (dataType === 'roster_40') {
        return pruneRosterData(rawData[dataType].queryResults.row);
    } else if (dataType === 'sport_hitting_tm' || dataType === 'sport_pitching_tm') {
        return pruneStatData(rawData[dataType].queryResults.row);
    } else {
        return new Error('Data does not match any pruneable type.');
    }
}

module.exports = pruneHandler;
