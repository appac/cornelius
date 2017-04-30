# Change Log
## [Unreleased]
### Added
- Player status functionality
- Player stats functionality

## [0.3.3] - 2017-04-25
### Added
- This CHANGELOG.md

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
