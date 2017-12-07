'use strict';

function Cornelius() {}

Cornelius.prototype.searchPlayer = require('./lib/searchPlayer');
Cornelius.prototype.getPlayer = require('./lib/getPlayer');
Cornelius.prototype.getStats = require('./lib/getStats');
Cornelius.prototype.getRoster = require('./lib/getRoster');

module.exports = new Cornelius();
