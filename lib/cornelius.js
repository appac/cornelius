const Promise = require('bluebird');
const CorneliusAction = require('./CorneliusAction');

/**
 * Represents Cornelius.
 */
class Cornelius {
    /**
     * @param {String} action
     * @param {Object} options
     * @return {Promise}
     * @memberof Cornelius
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
     * @param {String} action
     * @param {Object} options
     * @return {Promise}
     * @memberof Cornelius
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
