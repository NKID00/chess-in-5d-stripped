# WIP

## Format for all sessions (local or otherwise)

  - `id` - Unique string identifier.
  - `host` - Username of the user that created the session (missing on local play, `null` if 5d-chess-server game).
  - `white` - Username of the user/player playing white ('' if no name).
  - `black` - Username of the user/player playing black ('' if no name).
  - `variant` - String indicating which 5D Chess variant in play. [TODO add variants here].
  - `format` - String indicating timing format in use. Can be 'untimed', 'bullet', 'blitz', 'rapid', 'standard', 'tournament', or [TODO add formatting here].
  - `ranked` - Boolean indicating if session is ranked.
  - `ready` - Boolean indicating if non-host user/player is ready to play (missing on local play).
  - `requestJoin` - Array of usernames of users looking to join session (missing on local play).
  - `offerDraw` - Boolean indicating if current player is offering draw. Resets on submit.
  - `started` - Boolean indicating if session has started.
  - `startDate` - UNIX epoch time in milliseconds indicating when the session was started.
  - `ended` - Boolean indicating if session has ended.
  - `endDate` - UNIX epoch time in milliseconds indicating when the session was ended. Will be `null` if current session has not ended yet.
  - `processing` - Boolean indicating if server is processing session (mainly to indicate checkmate detection), timed controls are paused during processing.
  - `timed` - Object containing timing information (`null` if game is not timed). [TODO Add 5d-chess-clock reference]
  - `board` - `Board` object representing the current session (https://5d-chess.gitlab.io/5d-chess-js/#/?id=board-1).
  - `actionHistory` - Array of `Action` objects representing the history of actions in current session (https://5d-chess.gitlab.io/5d-chess-js/#/?id=action).
  - `moveBuffer` - Array of `Move` objects representing the moves played by the current player in the current session (https://5d-chess.gitlab.io/5d-chess-js/#/?id=move).
  - `comments` - Array of comments [TODO add comment support to 5d-chess-js].
  - `metadata` - Array of tag pairs (format `{ name: 'Name', value: 'Value' }`).
  - `player` - String indicating the current player ('white', 'black', or `null`).
  - `winner` - String indicating the winning player ('white', 'black', or 'draw'). Will be `null` if current session has not ended yet.
  - `winCause` - String indicating the reason for winning ('time', 'forfeit', or 'regular'). Stalemates results in 'regular', whereas draws results in 'forfeit'. Will be `null` if current session has not ended yet.

## 5DPGN Tag Transformation

```
[Board "<variant>"]
[Size "<dimensions extracted from board>"]
[Mode "5D"]
[Date "YYYY.MM.DD <startDate>"]
[Time "HH:MM:SS <startDate>"]
[EndDate "YYYY.MM.DD <endDate>"]
[EndTime "HH:MM:SS <endDate>"]
[SessionId "<id>"]
[SessionHost "<host>"] may be missing
[White "<white>"]
[Black "<black>"]
[Result "<winner> using <white score>-<black score> format"]
[TimeControl "<format>"] may be missing
[Termination "<winCause>"]
```

## Session Types

 - Local - Check if `host` field is missing
 - Server Game - Check if `host` field is `null`
 - Server Session - Check if `host` field is an non-empty string

 - Ongoing Session - Check if `started` field is `true` and `ended` field is `false`
 - Ended Session - Check if `ended` field is `true`