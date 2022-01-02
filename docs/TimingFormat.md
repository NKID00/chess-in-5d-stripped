# WIP

JSON Format for timing information (milliseconds)

  - `whiteDurationLeft` - Amount of time left for white to play.
  - `blackDurationLeft` - Amount of time left for black to play.
  - `startingDuration` - Amount of time to give to both players at the start of the game.
  - `flatIncrement` - Amount of time to give to player when their turn starts.
  - `presentIncrement` - Amount of time to give to player when their turn starts (this scales per present timeline in play).
  - `activeIncrement` - Amount of time to give to player when their turn starts (this scales per active timeline in play).
  - `timelineIncrement` - Amount of time to give to player when their turn starts (this scales per timeline in play).
  - `flatDelay` - Amount of delay to give to player when their turn starts.
  - `presentDelay` - Amount of delay to give to player when their turn starts (this scales per present timeline in play).
  - `activeDelay` - Amount of delay to give to player when their turn starts (this scales per active timeline in play).
  - `timelineDelay` - Amount of delay to give to player when their turn starts (this scales per timeline in play).

String format

Base string:

`<Duration left (min, use 0 if required)>:<Duration left (sec)>`

Additional terms (deliminate with `;`):

flat increment = `inc<flat increment (secs)>`
present increment = `incp<present increment (secs)>`
active increment = `inca<present increment (secs)>`
timeline increment = `inct<present increment (secs)>`
flat delay = `del<flat delay (secs)>`
present delay = `delp<present delay (secs)>`
active delay = `dela<present delay (secs)>`
timeline delay = `delt<present delay (secs)>`

Example:

`90;incp30` = 90 minute starting duration with 30 second increment per present timeline.

`0:30;inca10;delp2` = 30 second starting duration with 10 second increment (per active timeline) and 2 second delay (per present timeline).

For the format string to indicating standard time controls, these are the following values:

  - 'bullet' - Starting duration of 5 minutes.
  - 'blitz' - Starting duration of 10 minutes with 5 second delay for each present timeline.
  - 'rapid' - Starting duration of 20 minutes with 10 second delay for each present timeline.
  - 'standard' - Starting duration of 40 minutes with 20 second delay for each present timeline.
  - 'tournament' - Starting duration of 80 minutes with 40 second delay for each present timeline.
