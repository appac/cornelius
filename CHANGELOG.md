# Change Log
## [Unreleased]
### Added
- Player status functionality

## [1.0.0] - 2017-05-01
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
