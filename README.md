# Cornelius

Cornelius provides a consistent interface for grabbing data from a number of Major League Baseball endpoints.

All of the data Cornelius returns is property of MLB Advanced Media, and subject to their [usage terms](http://gdx.mlb.com/components/copyright.txt).

# Getting Started

Install Cornelius with `npm install` or `yarn add`:

```sh
yarn add cornelius
```

Import Cornelius into your project:

```javascript
const connie = require('cornelius');
```

# Usage

Cornelius' functionality is broken down into two core methods, `player` and `team`. Each method will return data determined by the `action` provided.

```javascript
// Using the 'transactions' action, get all
// player transactions for the current month
connie.player('transactions')
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

You can be more specific about the data you want, by providing an `options` object to Cornelius.

For example, the `transactions` action takes a `start_date` and `end_date` in YYYYMMDD format, to limit results to a specific period.

```javascript
// Passing an options object, get all transactions between
// 1st May 2017, and 10th May 2017
connie.player('transactions', {start_date: '20170501', end_date: '20170510'})
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

Option property names are deliberately generic, since they may be shared across different actions/methods.

## Player Actions

### `'search'`

- `query` `String` *`required`* - Search query e.g. 'Yoenis Cespedes'
- `active` `Boolean` `true` - Active or historic players flag

Search for a player by a given query.

### `'details'`

- `id` `String` *`required`* - A player ID e.g. '493316'

Get details for a given player.

### `'stats'`

- `id` `String` *`required`* - A player ID e.g. '493316'
- `stat_role` `String` `'HITTING'` - Role to get stats for
- `stat_type` `String` `'TEAM'` - Context of stats
- `season` `String` `CURRENT_YEAR` - The season to get data for e.g. '2018'
- `game_type` `String` `'R'` - Game type code e.g. 'R'

Get a player's stats for a given season, game type, role and context.

`role` determines what to get stats for; 'hitting', 'pitching' or 'fielding'.

`type` determines the context of the stats; 'team', 'league' or 'career'.

`team` stats will break down stats across multiple teams if a player has moved team mid-season. `league` stats will do the same, splitting stats per league. `career` stats collates all of a player's stats regardless of team or league.

### `'transactions'`

- `id` `String` - A player ID e.g. '493316'
- `start_date` `String` `FIRST_OF_MONTH` - The start date for a period e.g. '20170501'
- `end_date` `String` `CURRENT_DATE` - The end date for a period e.g. '20170510'

Get transactions over a given period.

If start and end dates are omitted, this returns transactions
over the current month (up to the current day).

If `id` is omitted, this returns all transactions regardless of player. With an `id` option, the results
are filtered to only include transactions that feature the given player id.


### `'news'`

- `id` `String` - A player ID e.g. '493316'
- `limit` `Number` `5` - Limit the number of results

Get news stories up to a limit.

If `id` is omitted, this returns all news stories regardless of player. With an `id` option, the results
are filtered to only include transactions that feature the given player id.

### `'injuries'`

- `id` `String` - A player ID e.g. '493316'

Get current injuries.

If `id` is omitted, this returns all injuries regardless of player. With an `id` option, the results
are filtered to only include injuries that feature the given player id.

## Team Actions

### `'list'`

- `league` `String` - A league code e.g. 'NL'

By default, gets all Major League teams.

If a `league` option is passed, you can define 'AL' or 'NL' to only get teams for American or National Leagues respectively.

### `'details'`

- `id` `String` *`required`* - A team ID e.g. '121'

Get details for a given team.

### `'roster'`

- `id` `String` *`required`* - A team ID e.g. '121'
- `roster_type` `String` `active` - The roster type e.g. 'TEAM'

Get a given roster type for a given team.

### `'coaches'`

- `id` `String` *`required`* - A team ID e.g. '121'

Get the current coaching staff for a given team.

### `'affiliates'`

- `id` `String` *`required`* - A team ID e.g. '121'

Get affiliate organisations for a given team. This includes organisations from AAA down to Summer League.

### `'leaders'`

- `id` `String` *`required`* - A team ID e.g. '121'
- `metric` `String` *`required`* - Metric to get leader data for e.g. 'homeRuns'
- `game_type` `String` `'R'` - Game type code e.g. 'R'
- `season` `String` `CURRENT_YEAR` - The season to get data for e.g. '2018'
- `limit` `Number` `5` - Limit the number of results

Get team leaders for a given metric.

### `'transactions'`

- `id` `String` - A team ID e.g. '121'
- `start_date` `String` `FIRST_OF_MONTH` - The start date for a period e.g. '20170501'
- `end_date` `String` `CURRENT_DATE` - The end date for a period e.g. '20170510'

Get transactions over a given period.

If start and end dates are omitted, this returns transactions
over the current month (up to the current day).

If `id` is omitted, this returns all transactions regardless of team. With an `id` option, the results
are filtered to only include transactions that feature the given team id.


### `'news'`

- `id` `String` - A team ID e.g. '121'
- `limit` `Number` `5` - Limit the number of results

Get news stories up to a limit.

If `id` is omitted, this returns all news stories regardless of team. With an `id` option, the results
are filtered to only include transactions that feature the given team id.

### `'injuries'`

- `id` `String` - A team ID e.g. '121'

Get current injuries.

If `id` is omitted, this returns all injuries regardless of team. With an `id` option, the results
are filtered to only include injuries that feature the given team id.

# License

[MIT](LICENSE.md)
