'use strict';

const prune = require('../utils/prune');

/**
 * @name cornelius.pruneData
 * @description Takes raw player, roster, stats or search data and returns it in a pruned format.
 * This usually means organising objects and renaming properties for readability.
 * In some cases (stats) it simply strips extraneous properties and structure.
 * @summary Prune a given data object.
 *
 * @public
 * @deprecated - pruneData will be deprecated in future versions. Switch to providing a `prune` flag to `options`.
 * @param {Object} data - Data you want pruned.
 * @returns {Object} -  Pruned version of the original data.
 * @example <caption>Prune stat data via chaining</caption>
 * cornelius.getStats('594798')
 *   .then(cornelius.prune)
 *   .then(function (data) {
 *     // do stuff with pruned stat data
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   })
 * @example <caption>Prune stat data without chaining</caption>
 * cornelius.getStats('594798')
 *   .then(function (data) {
 *     // do stuff with stat data, like pruning
 *     var pruned = cornelius.prune(data);
 *   })
 *   .catch(function (error) {
 *     // handle error
 *   });
 */
function pruneData(data) {
    let prunedData = prune.handler(data);
    return prunedData;
}

module.exports = pruneData;
