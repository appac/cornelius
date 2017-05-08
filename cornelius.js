'use strict';

function cornelius () {}

cornelius.prototype.searchPlayer = require('./lib/searchPlayer');
cornelius.prototype.getPlayer = require('./lib/getPlayer');
cornelius.prototype.getStats = require('./lib/getStats');
cornelius.prototype.getRoster = require('./lib/getRoster');
cornelius.prototype.pruneData = require('./lib/pruneData');

module.exports = new cornelius();
