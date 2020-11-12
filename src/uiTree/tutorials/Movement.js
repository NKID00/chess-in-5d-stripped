import React from 'react';

import TutorialGamePlayer from 'components/TutorialGamePlayer';

export default class Movement extends React.Component {
  render() {
    return (
      <TutorialGamePlayer
        tutorialArray={[
          {
            text: `## Welcome

Welcome to the tutorial on movement.

We'll be walking through how pieces move and some of the concepts tied to movement in this tutorial.`
          },
          {
            text: `## Regular Movement

In the game of Chess in 5D, every piece can move the same way as they can in regular chess.

It is only when we try to extend past the two dimensions that things get complicated.`
          },
          {
            text: `## Concept 1 - Time / Turn Dimension

Let's make a move and submit. Move the pawn on e2 to e3 and submit.

(WIP Insert Image)

(Note: this is the same move in the previous tutorial)`,
            import: '',
            moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":1,"player":"white","coordinate":"e2","rank":2,"file":5},"end":{"timeline":0,"turn":1,"player":"white","coordinate":"e3","rank":3,"file":5},"player":"white"}]
          },
          {
            text: `## Concept 1 - Time / Turn Dimension

Here we have two boards.

(WIP Insert Image)

Notice the board on the left is still the original board with the starting positions of regular chess.
The board on the right has the pawn move actually displayed.

**What is going on?!?**

What's actually going on is that the board on the left represents the past, and the board on the right represents the present.

Additionally, the boards have different colored borders.

The board on the left is bordered white to represent that this board is the board that white can play on.

The board on the right is bordered black to represent that this board is the board that black can play on.`,
            import: '1w. 1:e2:e3'
          },
          {
            text: `## Concept 1 - Time / Turn Dimension

Let's play a couple more actions as both black and white player. Look at the turn indicator to keep track of which player is currently playing.

*Remember that an action is simply the list of moves a player plays before submitting. This 'list of moves' can be just one move.*

As black, move the pawn on e6 to e5 and submit (do this on the board on the right).

(WIP Insert Image)`,
            import: '1w. 1:e2:e3',
            moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":1,"player":"black","coordinate":"e7","rank":7,"file":5},"end":{"timeline":0,"turn":1,"player":"black","coordinate":"e6","rank":6,"file":5},"player":"black"}]
          },
          {
            text: `## Concept 1 - Time / Turn Dimension

As white, move the bishop on f1 to d3 and submit (do this on the board on the very right).

(WIP Insert Image)`,
            import: '1w. 1:e2:e3 ; 1b. 1:e7:e6',
            moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":2,"player":"white","coordinate":"f1","rank":1,"file":6},"end":{"timeline":0,"turn":2,"player":"white","coordinate":"d3","rank":3,"file":4},"player":"white"}]
          },
          {
            text: `## Concept 1 - Time / Turn Dimension

By now you should see there are 4 boards in a line from left to right, each show the moves of each player from past to present.

(WIP Insert Image)

The further to the left you go, the further into the past you go.

Notice the labels on the top of the board ('1T', '2T'). These indicate which turn the board belongs to.

The board with the white border and labeled 1T is the board that white played on during their first turn.

This 'line of boards' is known as the turn dimension. The further to the left you go, the further into the past you go.

**Why is there two '1T' labels and two '2T' labels?**

In regular chess, a turn consists of both a white move and black move. This convention carries over to Chess in 5D.`,
            import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3'
          },
          {
            text: `## Concept 2 - Time Travel

Alright, so here is where Chess in 5D differs from regular chess.

Since we can see the turn dimension as a series of boards in a horizontal line, we can do something that we can't in regular chess.

We can move pieces **back in time!**

Let's try this out, make the knight move shown below (moving from b8 to b6 one turn back) and submit.

(WIP Insert Image)

If you are confused as to how the knight can make this move, we'll go over all the piece moves later.
For now, just assume that this move is possible.`,
            import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3',
            moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":2,"player":"black","coordinate":"b8","rank":8,"file":2},"end":{"timeline":0,"turn":1,"player":"black","coordinate":"b6","rank":6,"file":2},"player":"black"}]
          },
          {
            text: `## Concept 2 - Time Travel

Here we can see there is a new 2T board above the 4 boards we saw earlier.

(WIP Insert Image)

**What just happened?!?**

If you just considered what happened, the knight essentially just travelled back in time by 1 turn.

In order to avoid the grandfather paradox, a whole new timeline is created.
So now you have two timelines:
  - The bottom main timeline (0L), we have 5 boards with the knight vanishing from this timeline when it travelled back into the past.
  - The top new timeline (-1L), we have 1 board with the knight appearing at where it was trying to go to (b6). This timeline is created from black's 1T board on the bottom timeline (0L).

You can think about it like this: When the knight moved back in time, the timeline split into two timelines. One that has the knight travel back in time, disappearing from the timeline and one that has the knight appear at the point it's trying to travel back too.

*Note: The grandfather paradox refers to the idea that if you were to travel into the past and kill your grandfather, how can you exist to kill your grandfather? Chess in 5D resolves this by essentially saying when you travel back in time, you also travel to a new timeline.
So you really travel to a new timeline that is an exact copy of the point in time you were trying to travel to. This means when you kill your grandfather, you actually kill a copy of your grandfather. In timeline you came from, your grandfather was never killed.*`,
            import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6'
          },
          {
            text: `## Concept 3 - The Present

Okay, so we just have our black knight travel back in time.

**What happens now?**

`
          },
          {
            text: `## Menus (Bottom / Status)

(WIP Insert Image)

This status indicator shows multiple states. By default, it shows which player is currently allowed to play.

(WIP Insert Image)

When one player is in check, a second indicator shows up indicating this.

(WIP Insert Image)

When one player wins, this indicator shows this.

(WIP Insert Image)

When a tie occurs, this indicator shows this.`
          },
          {
            text: `## Menus (Bottom / Re-center)

(WIP Insert Image)

This button is used to re-align the main view to show the current board. If the main view gets scrolled offscreen, use this button to reset the view.

On devices with a keyboard, the 'Tab' key also triggers this function.`
          },
          {
            text: `## Menus (Bottom / Undo)

(WIP Insert Image)

This button is used to undo moves that the current player played. You can do this before you submit.

This is needed because sometimes multiple moves need to be played.

On devices with a keyboard, the 'Z' and 'Backspace' keys also trigger this function.`
          },
          {
            text: `## Menus (Bottom / Submit)

(WIP Insert Image)

This button is used to submit moves that the current player played.

This is needed because sometimes multiple moves need to be played.

On devices with a keyboard, the 'F' and 'Enter' keys also trigger this function.`
          },
          {
            text: `## Finished

That's it for this tutorial! Go ahead and go to the next tutorial to learn more about movement.

To exit, click on the logo or 'Chess in 5D' text in the top bar to return to the main menu.`
          }
        ]}
      />
    );
  }
}
