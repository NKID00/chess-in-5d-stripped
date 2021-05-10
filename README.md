# Chess In 5D

## Introduction

Open source implementation of '5D Chess With Multiverse Time Travel'.

[![Pipeline Status](https://gitlab.com/alexbay218/chess-in-5d/badges/master/pipeline.svg)](https://gitlab.com/alexbay218/chess-in-5d/-/commits/master)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://gitlab.com/alexbay218/chess-in-5d)

Chess In 5D aims to reimplement the rules as found in the original.
This project looks to implement additional features also not found in the game:

### Standarized notation to record games in a text format

![Import Feature](/src/assets/rules/import_feature.gif)

### Save and analyze previous games

![Analyze Feature](/src/assets/rules/analyze_feature.gif)

### Bot API

![Bot Feature](/src/assets/rules/bot_feature.gif)

## Bot API usage

To use the bot api, please express the bot as a javascript function.

Here is the code from the default 'Random Bot'

``` js
const BotFunc = (chess) => {
  /*
    Notice: This bot/engine does not play competitively and is only here for demonstration purposes

    This bot picks a random valid action and plays it.

    Go to https://gitlab.com/alexbay218/chess-in-5d#bot-api-usage for more information on how to create your own bot

    In the future, a better default bot will replace this one.
  */
  var action = {
    action: chess.actionNumber,
    player: chess.player,
    moves: []
  };
  var actionMoves = [];
  var valid = false;
  while(!valid) {
    actionMoves = [];
    var submit = false;
    var tmpChess = chess.copy();
    while(!submit) {
      var moves = tmpChess.moves('object', true, true, true);
      if(moves.length > 0) {
        var move = moves[Math.floor(Math.random() * moves.length)];
        actionMoves.push(move);
        tmpChess.move(move);
      }
      else {
        submit = true;
      }
    }
    if(!tmpChess.inCheck) {
      valid = true;
    }
  }
  action.moves = actionMoves;
  console.log('Random Bot is making action:\n' + JSON.stringify(action));
  return action;
}
```

Here the function has three parameters: `chess`, `timed`, and `global`
 - `chess` - This is the instance of the Chess class (https://gitlab.com/alexbay218/5d-chess-js) representing the current game.
 - `timed` - Object containing timing information (`null` if game is not timed). All values are in seconds.
   - `whiteDurationLeft` - Amount of time left for white to play.
   - `blackDurationLeft` - Amount of time left for black to play.
   - `startingDuration` - Amount of time to give to both players at the start of the game.
   - `perActionFlatIncrement` - Amount of time to give to player when their turn starts.
   - `perActionTimelineIncrement` - Amount of time to give to player when their turn starts (this scales per present timeline in play).
 - `global` - This is a persistent empty object that allows for saving of data between function calls.

To be an actual bot, you then need to return an `Action` object as described here https://gitlab.com/alexbay218/5d-chess-js#schemas

The Debug mode will run the function in the main thread, otherwise it will run it as a Web Worker to prevent hanging.

## FAQ

### Is it any good?

Yes (maybe).

### You incorrectly evaluated this board as a checkmate (or not a checkmate)!

If you can provide me an action list (object, json, or notation) or the board state, and submit it as an issue to this repo (https://gitlab.com/alexbay218/5d-chess-js), I can get right on it. This goes for any other bugs. A good way to verify if it is correct or not is to repeat the same moves in the same order in '5D Chess With Multiverse Time Travel' and see if it matches.

### Why is this on GitLab instead of GitHub?

I made the switch from GitHub to GitLab mid 2019 when I was starting a new long term project called KSS. Back then, GitHub did not have many of the features it does now, such as integrated CI/CD and more. GitLab was the superior product in almost every way. Furthermore, as a believer in the open source, it seem ironic that open source software would be hosted on closed source platforms. With GitLab being open source, I can be sure that if GitLab.org crumbles, I can still maintain the overall project structure via GitLab instances. This allows me to preserve the Git repo itself, but also the issues, labels, rules, pipelines, etc. that are fundamental to a project. With GitHub, developers do not have this guarantee and they also do not have full control over their project structure.
For a (biased, but not untrue) comparison, visit this link [here](https://about.gitlab.com/devops-tools/github/decision-kit.html)

### Isn't the game copyrighted?

Yes, the game '5D Chess With Multiverse Time Travel' is under copyright by Thunkspace, LLC and any source code, written works, and other copyrightable materials are the property of Thunkspace, LLC. However, copyright does not extend to an idea, which include game rules. So as long as the new work does not contain a direct copy of the rules or other material within the original game. Well known precedent for this is Hasbro's lawsuit against Scrabulous in which they dropped it after Scrabulous removed material that could possible be considered violating copyright (https://www.cnet.com/news/hasbro-drops-scrabulous-lawsuit/).
Also of note is this article from the American Bar Association (https://www.americanbar.org/groups/intellectual_property_law/publications/landslide/2014-15/march-april/its_how_you_play_game_why_videogame_rules_are_not_expression_protected_copyright_law/).
Chess in 5D in no way aims to violate any copyright laws, but instead aims to be an open source implementation of the original ideas as presented by '5D Chess With Multiverse Time Travel'.

## Copyright

All source code is released under AGPL v3.0 (license can be found under the LICENSE file).

Chess piece images were derived from SVG files released under CC BY-SA v3.0 (license can be found under the PIECE_LICENSE file).

Any addition copyrightable material not covered under AGPL v3.0 is released under CC BY-SA v3.0.
