'use strict';

function Cornelius() {}

Cornelius.prototype.playerSearch = require('./lib/playerSearch');
Cornelius.prototype.getPlayer = require('./lib/getPlayer');
Cornelius.prototype.getStats = require('./lib/getStats');
Cornelius.prototype.getRoster = require('./lib/getRoster');

module.exports = new Cornelius();
