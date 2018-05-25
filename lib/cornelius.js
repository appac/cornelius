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
     * and returned.
     *
     * @summary Get player information.
     * @public
     * @param {string} action
     * @param {object} options
     * @return {Promise}
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
     * @summary Get team information.
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
