# WIP

Format for all sessions (local or otherwise)

  - `id` - Unique string identifier.
  - `host` - Username of the user that created the session.
  - `white` - Username of the user/player playing white.
  - `black` - Username of the user/player playing black.
  - `variant` - String indicating which 5D Chess variant in play. Valid values are 'standard', 'defended pawn', 'half reflected', 'princess' or 'turn zero'.
  - `format` - String indicating timing format in use. Can be 'untimed', 'bullet', 'blitz', 'rapid', 'standard', 'tournament', or `<total minutes>:<total seconds>;incf<flat increment>;inct<timeline increment>` (see Timing section below).
  - `ranked` - Boolean indicating if session is ranked.
  - `ready` - Boolean indicating if non-host user/player is ready to play.
  - `requestJoin` - Array of usernames of users looking to join session.
  - `offerDraw` - Boolean indicating if current player is offering draw. Resets on submit.
  - `started` - Boolean indicating if session has started.
  - `startDate` - UNIX epoch time in milliseconds indicating when the session was started.
  - `ended` - Boolean indicating if session has ended.
  - `endDate` - UNIX epoch time in milliseconds indicating when the session was ended.
  - `processing` - Boolean indicating if server is processing session (mainly to indicate server is doing checkmate detection), timed controls are paused during processing.
  - `archiveDate` - UNIX epoch time in milliseconds indicating when the session will be archived.
  - `timed` - Object containing timing information (`null` if game is not timed).
    - `whiteDurationLeft` - Amount of time left for white to play.
    - `blackDurationLeft` - Amount of time left for black to play.
    - `startingDuration` - Amount of time to give to both players at the start of the game.
    - `perActionFlatIncrement` - Amount of time to give to player when their turn starts.
    - `perActionTimelineIncrement` - Amount of time to give to player when their turn starts (this scales per present timeline in play).
  - `board` - `Board` object representing the current session (https://5d-chess.gitlab.io/5d-chess-js/#/?id=board-1).
  - `actionHistory` - Array of `Action` objects representing the history of actions in current session (https://5d-chess.gitlab.io/5d-chess-js/#/?id=action).
  - `moveBuffer` - Array of `Move` objects representing the moves played by the current player in the current session (https://5d-chess.gitlab.io/5d-chess-js/#/?id=move).
  - `player` - String indicating the current player ('white' or 'black').
  - `winner` - String indicating the winning player ('white', 'black', or 'draw'). Will be `null` if current session has not ended yet.
  - `winCause` - String indicating the reason for winning ('timed_out', 'forfeit', or 'regular'). Stalemates results in 'regular', whereas draws results in 'forfeit'. Will be `null` if current session has not ended yet.
