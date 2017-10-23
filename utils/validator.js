'use strict';

/**
 * Given an `options` object, verified all properties
 * and values meet requirements for their give method.
 * 
 * Returns an Error if validation was not successful, or `null` otherwise.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|null} - An error, or null if validation successful.
 */
function validateSearchOptions(options) {
    let error = null;

    if (!options) {
        error = new Error('No options provided.');
    } else if (typeof options === 'object') {
        if (!options.query) {
            error = new Error('No query provided.');
        } else if (typeof options.query !== 'string') {
            error = new Error(`Expected query to be a string, but was given a ${typeof (options.query)}.`);
        } else if (options.active && typeof options.active !== 'boolean') {
            error = new Error(`Expected active to be a boolean, but was given a ${typeof (options.active)}.`);
        } else if (options.prune && typeof options.prune !== 'boolean') {
            error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
        }
    } else if (typeof options !== 'string') {
        error = new Error(`Expected options to be a string or object, but was given a ${typeof (options)}.`);
    }
    return error;
}

/**
 * Given an `options` object, verified all properties
 * and values meet requirements for their give method.
 * 
 * Returns an Error if validation was not successful, or `null` otherwise.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|undefined} - An error, or null if validation successful.
 */
function validateGetOptions(options) {
    let error = null;

    if (!options) {
        error = new Error('No options provided.');
    } else if (typeof options === 'object') {
        if (!options.player_id) {
            error = new Error('No player ID provided.');
        } else if (typeof options.player_id !== 'string') {
            error = new Error(`Expected player_id to be a string, but was given a ${typeof (options.player_id)}.`);
        } else if (options.prune && typeof options.prune !== 'boolean') {
            error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
        }
    } else if (typeof options !== 'string') {
        error = new Error(`Expected options to be a string or object, but was given a ${typeof (options)}.`);
    }
    return error;
}

/**
 * Given an `options` object, verified all properties
 * and values meet requirements for their give method.
 * 
 * Returns an Error if validation was not successful, or `null` otherwise.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|undefined} - An error, or null if validation successful.
 */
function validateRosterOptions(options) {
    let error = null;

    if (!options) {
        error = new Error('No options provided.');
    } else if (typeof options === 'object') {
        if (!options.team_id) {
            error = new Error('No team_id provided.');
        } else if (typeof options.team_id !== 'string') {
            error = new Error(`Expected team_id to be a string, but was given a ${typeof (options.team_id)}.`);
        } else if (options.full && typeof options.full !== 'boolean') {
            error = new Error(`Expected full to be a boolean, but was given a ${typeof (options.full)}.`);
        } else if (options.prune && typeof options.prune !== 'boolean') {
            error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
        }
    } else if (typeof options !== 'string') {
        error = new Error(`Expected options to be a string or object, but was given a ${typeof (options)}.`);
    }
    return error;
}

/**
 * Given an `options` object, verified all properties
 * and values meet requirements for their give method.
 * 
 * Returns an Error if validation was not successful, or `null` otherwise.
 * 
 * @private
 * @param {Object} options - The options to validate.
 * @returns {Error|undefined} - An error, or null if validation successful.
 */
function validateStatsOptions(options) {
    let error = null;

    if (!options) {
        error = new Error('No options provided.');
    } else if (typeof options === 'object') {
        if (!options.player_id) {
            error = new Error('No player_id provided.');
        } else if (typeof options.player_id !== 'string') {
            error = new Error(`Expected player_id to be a string, but was given a ${typeof (options.player_id)}.`);
        } else if (options.pitching && typeof options.pitching !== 'boolean') {
            error = new Error(`Expected pitching to be a boolean, but was given a ${typeof (options.pitching)}.`);
        } else if (options.year && typeof options.year !== 'string') {
            error = new Error(`Expected year to be a string, but was given a ${typeof (options.year)}.`);
        } else if (options.prune && typeof options.prune !== 'boolean') {
            error = new Error(`Expected prune flag to be boolean, but was given a ${typeof (options.prune)}.`);
        }
    } else if (typeof options !== 'string') {
        error = new Error(`Expected options to be a string or object, but was given a ${typeof (options)}.`);
    }
    return error;
}

module.exports = {
    searchOptions: validateSearchOptions,
    playerOptions: validateGetOptions,
    rosterOptions: validateRosterOptions,
    statsOptions: validateStatsOptions
};
