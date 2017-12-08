# Change Log

## [2.0.0] - 2017-12-08

### Changed

- All Cornelius methods now **require** an options object.
- Cornelius methods no longer throw errors if an options object is missing a property or has an invalid property. Instead, a request will be attempted using fallback values, and if no results or data could be retrieved, an empty array or object will be returned.
- Data is now pruned by default, which can be disabled by setting `prune: false` in the options object of a method.
- `getRoster` now takes a `short` option rather than a `full` option, and returns the long form player data by default.
  - Previously short form player data was returned with rosters by default, and long form player data could be gotten using the `full: true` option.
  - Now, long form player data is returned by default and you can set `short: true` if you'd like short form player data instead.
- There are no longer trailing underscores on the team/player/league/sport properties for pruned stats.
- Player objects that are pruned have had their `attributes` properties renamed to `attribute` in all pruning functions.
  - Some functions were using one or the other property name. All now consistently use `attribute`.
- Pruning functionality has been refactored into a single file for easier maintenance.
- Pruning functions are now pure.
- Data used to test against is now generated via requests to MLB the first time tests are run (and only thereafter if data is missing), and is no longer distributed with Cornelius.
- Switched from jshint to eslint
  - Files were tidied to meet new eslint rules.
- Stats pruning now uses a more generalised function.
  - Since there weren't any changes to the stats properties themselves, checking for the type of stats wasn't needed. The stats pruner now simply collates team/player/league/sport properties and leaves the statistics themselves untouched as before.
- Testing is now done using Tape and Faucet.

### Removed

- Find utilities were removed as they were largely unused.
- Validation utilities were removed in lieu of classes setting defaults for method options.
- The `pruneData` method has been removed. Pruning (or not) is handled by the `prune` option.



## [1.1.0] - 2017-07-04
### Changed
- On pruning stats data, certain properties are now organised.
  - Ex: `team_id`, `team_abbrev`, `team_short` etc. are now organised into a `_team` object property.

## [1.0.1] - 2017-05-15
### Changed
- Utility functions no longer throw errors, so *valid* queries that result in no data won't cause terminations.
  - Ex: If you perform a search with a query that has no resulting players, you'll get an empty array.
  - Ex: If `prune` can't select an appropriate pruner, it will return the original data.
  - Ex: If a specific pruner can't find relevant data to prune, it will return an empty object or array depending on the data.
  - Ex: If `validate` is given invalid options, it will *return* an error that will be used to reject the promise it was called in.
  - See readme for more details.
- Pruning of different types of player data has now been seperated out.

## [1.0.0] - 2017-05-12
### Added
- This changelog
- `getStats` functionality for getting player stats
- `validate` utility - validates options for core functions.

### Changed
- `get` is now `getPlayer`.
- `searchPlayer`, `getPlayer`, `getRoster`, and `getStats` now all take an `options` object with varying properties - see readme
- Pruning can now be handled by passing a `prune` flag via the options object.
  - `cornelius.prune` will be deprecated in later versions.
- `getPlayer` now uses the `player_info` endpoint to get a specific player by ID.
  - This means results are accurate and Cornelius no longer needs to check whether you want an active/historic player.
- Core functions abstracted out into `/lib`.
- Utility functions (further) abstracted out into `/utils`.

### Removed
- `searchHistoric`
- `get`
- `getHistoric`

## [0.3.2] - 2017-04-24
### Changed
- Updated repository url in package.json

## [0.3.1] - 2017-04-24
### Changed
- Module description in package.json
- Util functions moved to `utils/[function]`
- Util functions error messages made more descriptive
- find.teamId key param is uppercased within the function now, not before it's handed to it
- find.teamId now actually verifies a key has been given, and is of valid type
- Team manifest moved to utils/find since find is what will be using it
- Test specs separated into `[util].spec.js` files
- Tests completely re-written for all utility functions
- Mock data for testing moved to test/mock

### Removed
- index.spec.js - see changes

## [0.3.0] - 2017-04-21
### Added
- Team manifest file for getting team IDs
- Roster functionality
  - `getRoster`
- getRoster tests
- Pruning for roster data

### Changed
- README.md updated to clarify the ownership and usage terms of the data Cornelius returns.
- README.md updated with roster documentation

## [0.2.0] - 2017-04-20
### Added
- Pruning functionality for search results and player objects
- Pruning tests

### Changed
- README.md updated with pruning documentation

## [0.1.1] - 2017-04-20
### Changed
- README.md updated with historic search/get documentation


## [0.1.0] - 2017-04-20
### Added
- History player functionality
  - `searchHistoric`
  - `getHistoric`

### Changed
- `callMlb` function now has `isActive` param


## [0.0.2] - 2017-04-19
### Changed
- Repository url in package.json

## [0.0.1] - 2017-04-19
### Added
- LICENSE.md
- README.md
- Player Functionality
  - `get`
  - `search`
- get/search tests
