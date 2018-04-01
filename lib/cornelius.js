/**
 * Represents Cornelius module.
 * @private
 */
class Cornelius {
    /**
     * Makes Cornelius functions available.
     */
    constructor() {
        this.player = require('./player');
        this.team = require('./getStats');
    }
}

module.exports = new Cornelius();
