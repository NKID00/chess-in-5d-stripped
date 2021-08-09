# WIP

## Search Parameters

Search for sessions that:
 - has not started
 - matching variant and format (from list)
 - empty white or black field
 - is not in requestJoin
 - ranked matches quick play type

## Query Object

MongoDB query (given variables `username`, `variants`, `formats`, and `ranked`):

``` js
{
  $and: [
    { started: false },
    { variant: { $in: variants } },
    { format: { $in: formats } },
    { $or: [ { white: null }, { black: null } ] },
    { $not: { requestJoin: username } },
    { ranked: ranked }
  ]
}
```

## Process Flowchart

Mermaid flow chart (https://mermaid-js.github.io/mermaid-live-editor/)
``` mermaid
graph TD
  start([User triggers quick play process])
  search[Query server for existing sessions that match]
  start-->search
  found[Grab session with least amount of requestJoin users, prefer older sessions if tied]
  search-- If matching sessions found within 4 queries, querying every 1.5 secs -->found
  request[Submit request to join the session]
  found-->request
  joined[Submit ready response]
  request-- If host accepts request within 6 queries, querying every 0.333 secs -->joined
  startSession([Host starts session, quick play process complete])
  joined-->startSession
  create[Create session using parameters]
  search-- If no matching session found within query limits -->create
  accept[Accept join request]
  create-- If user requests to join session within 7 queries, querying every 0.333 secs -->accept
  accept-- If non-host user signals readiness within 6 queries, querying every 0.333 secs -->startSession
  destroy[Remove session, randomly wait 0, 0.333, 0.666, or 1 secs]
  destroy-->search
  create-- If no user requests to join within query limits -->destroy
  accept-- If user does not signal readiness within query limits -->destroy
  removeRequest[Remove request to join]
  request-- If host does not accept within query limits -->removeRequest
  removeRequest-->search
```

## TODO Ranked Search