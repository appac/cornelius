const Promise = require('bluebird');
const CorneliusAction = require('./CorneliusAction');

/**
 * Represents Cornelius module.
 * @private
 */
class Cornelius {
    /**
     * Makes Cornelius functions available.
     */
    constructor() {
    }

    /**
     * @name cornelius.player
     * @description Searches for players or gets individual player details.
     *
     * `action` should be a string, and determines what player data is requested
     * and returned. The table below details all valid operations.
     *
     * |    Action  |  Options  |   Description |
     * | ------------- | --------- | ------------- |
     * | `search`  | `query`  | Searches for players.      |
     * | `details` | `id`     | Gets details for a player, or players.    |
     * | `stats`   | `id`, `season`, `type` | Get stats for a player, or players. |
     *
     *
     * The `details` and `stats` operations also accept an array of player IDs.
     *
     *
     * @summary Get player information.
     * @public
     * @param {string} action
     * @param {object} options
     * @param {string} [options.query]
     * @param {string[]} [options.id]
     * @param {string|number} [options.season]
     * @param {boolean} [options.prune=true]
     * @return {Promise}
     * @example <caption>Search for an active player</caption>
     * cornelius.player('search', {
     *  query: 'wright',
     * }).then(data => console.log(data)).catch(err => console.log(err));
     * @example <caption>Get player details</caption>
     * cornelius.player('details', {
     *  id: 493316,
     * }).then(data => console.log(data)).catch(err => console.log(err));
     * @example <caption>Get player stats</caption>
     * cornelius.player('stats', {
     *  id: 493316,
     * }).then(data => console.log(data)).catch(err => console.log(err));
     */
    player(action, options) {
        return new Promise((resolve, reject) => {
            const corneliusAction = new CorneliusAction('player', action, options);
            corneliusAction
                .on(`${action}:complete`, (data) => resolve(data))
                .on('error', (error) => reject(error));
            corneliusAction.execute();
        });
    }

    /**
     * @name cornelius.team
     * @description Searches for teams, or gets individual team details.
     *
     * `action` should be a string,and determines what team data is requested and returned.
     *
     * @public
     * @param {string} action
     * @param {object} options
     * @return {Promise}
     */
    team(action, options) {
        return new Promise((resolve, reject) => {
            const corneliusAction = new CorneliusAction('team', action, options);
            corneliusAction
                .on(`${action}:complete`, (data) => resolve(data))
                .on('error', (error) => reject(error));
            corneliusAction.execute();
        });
    }
}

module.exports = new Cornelius();
