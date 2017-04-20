Cornelius lets you grab data from MLB's `/lookup/json` routes. All data is property of MLB Advanced Media, and subject to their [usage terms](http://gdx.mlb.com/components/copyright.txt).

# Install
```sh
npm install --save cornelius
```

# Usage
```javascript
var cornelius = require('cornelius');
```

## Searching
---
## cornelius.search(query)
To search for a player by name, use `cornelius.search`. For best results, the query should be a player surname.
```javascript
cornelius.search('young')
    .then(function (results) {
        // do stuff with search results
    })
    .catch(function (error) {
        // handle error
    });
```

## cornelius.searchHistoric(query)
To search for a player that is no longer active in the major leagues, use `cornelius.searchHistoric`.
```javascript
cornelius.searchHistoric('griffey')
    .then(function (results) {
        // do stuff with search results
    })
    .catch(function (error) {
        // handle error
    });
```
## Getting
---
## cornelius.get(playerName, key)
To grab a specific player, use `cornelius.get`.
- `playerName` should be the full player's name 
- `key` can be either the team abbreviation (`team_abbrev`), or the player's ID (`player_id`)*

**Find both in search results*

Beware that grabbing a player by their team abbreviation has it's limitations. See the limitations section below.
```javascript
// getting Chris Young of the Kansas City Royals via team abbreviation
cornelius.get('chris young', 'kc')
    .then(function (player) {
        // do stuff with player data
    })
    .catch(function (error) {
        //handle error
    });
// getting Chris Young of the Boston Red Sox via player ID
cornelius.get('chris young', '455759')
    .then(function (player) {
        // do stuff with player data
    })
    .catch(function (error) {
        //handle error
    });
```

## cornelius.getHistoric(playerName, key)
To get a player that is no longer active in the major leagues, use ``cornelius.getHistoric``.
```javascript
cornelius.getHistoric('ken griffey', 'sea')
	.then(function (player) {
		// do stuff with player data
	})
	.catch(function (error) {
		// handle error
	});
```

*The above example is a great way of seeing the team abbreviation as a key limitation. Ken Griffey Sr. and Ken Griffey Jr. both played for the Seattle Mariners (SEA). With the team abbreviation as a key, you'll get one Griffey, but not necessarily the one you want.*

## Pruning Data
---
## cornelius.prune(data)

By default, cornelius returns unmodified search results, and unmodified player objects from MLB. If you'd like either to be pruned, you can use `cornelius.prune`.

```javascript
cornelius.search('young')
	.then(cornelius.prune)
	.then(function (data) {
		// data is now pruned, do stuff
	})
	.catch(function (error) {
		// handle error
	});
```

You can also use prune outside of a promise chain.

```javascript
cornelius.get('young', 'bos')
	.then(function (data) {
		let prunedData = cornelius.prune(data);
	})
	.catch(function (error) {
		// handle error
	})
```

# Limitations
## Team abbreviation as key
`cornelius.get` receives the same results as `cornelius.search`, using the key you provide to determine which player object to return. 

If two players share a name, `team_abbrev` as a key can differentiate between the two. But if they were to also share a team, `team_abbrev` as a key would not work. In such a situation, use the player’s ID as the key instead.

# Todos

 - ~~Support historic/non-active players~~
 - Add player stats - `cornelius.stats(playerName, key)`
 - Add player status - `cornelius.status(playerName, key)`
 - Add team rosters - `cornelius.roster(teamName)`
 - ~~Add pruned/cleaned data option~~

# License

MIT
