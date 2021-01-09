import React from 'react';

import TutorialGamePlayer from 'components/TutorialGamePlayer';

const tutorialArray = [
  {
    text: `## Welcome

Welcome to the tutorial on movement.

We'll be walking through some of the concepts tied to movement in this tutorial.

Individual piece movements are covered in the tutorial 'Movement Part 2'.`
  },
  {
    text: `## Concept 1 - Time / Turn Dimension

Let's make a move and submit. Move the pawn on e2 to e3 and submit.

![Pawn move from e2 to e3](we2e3.gif)

*Note: This is the same move in the previous tutorial*`,
    import: '',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":1,"player":"white","coordinate":"e2","rank":2,"file":5},"end":{"timeline":0,"turn":1,"player":"white","coordinate":"e3","rank":3,"file":5},"player":"white"}],
    assets: {
      'we2e3.gif': require('assets/tutorials/basics/we2e3.gif')
    }
  },
  {
    text: `## Concept 1 - Time / Turn Dimension

Here we have 2 boards.

![Two boards](two_board.png)

Notice the board on the left is still the original board with the starting positions of regular chess.
The board on the right has the pawn move displayed.

**What is going on?!?**

What's actually going on is that the board on the left represents the past, and the board on the right represents the present.

Additionally, the boards have different colored borders.

The board on the left is colored white to represent that this board is the board that white can play on.

The board on the right is colored black to represent that this board is the board that black can play on.`,
    import: '1w. 1:e2:e3',
    assets: {
      'two_board.png': require('assets/tutorials/movement/two_board.png')
    }
  },
  {
    text: `## Concept 1 - Time / Turn Dimension

Let's play a couple more actions as both the black and white players. Remember to look at the turn indicator to keep track of which player is currently playing.

*Remember that an action is simply the list of moves a player makes before submitting. This 'list of moves' can just be one move.*

As black, move the pawn on e7 to e6 and submit (do this on the board on the right).

![Pawn move from e7 to e6](be7e6.gif)`,
    import: '1w. 1:e2:e3',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":1,"player":"black","coordinate":"e7","rank":7,"file":5},"end":{"timeline":0,"turn":1,"player":"black","coordinate":"e6","rank":6,"file":5},"player":"black"}],
    assets: {
      'be7e6.gif': require('assets/tutorials/movement/be7e6.gif')
    }
  },
  {
    text: `## Concept 1 - Time / Turn Dimension

As white, move the bishop on f1 to d3 and submit (do this on the board on the very right).

![Bishop move from f1 to d3](wf1d3.gif)`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":2,"player":"white","coordinate":"f1","rank":1,"file":6},"end":{"timeline":0,"turn":2,"player":"white","coordinate":"d3","rank":3,"file":4},"player":"white"}],
    assets: {
      'wf1d3.gif': require('assets/tutorials/movement/wf1d3.gif')
    }
  },
  {
    text: `## Concept 1 - Time / Turn Dimension

By now you should see there are 4 boards in a line from left to right, each show the moves of each player from past to present.

![Four boards](four_board.png)

The further to the left you go, the further into the past you go.

Notice the labels on the top of the board ('T1', 'T2'). These indicate which turn the board belongs to.

The board with the white border and labeled T1 is the board that white played on during their first turn.

This 'line of boards' is known as the turn dimension. The further to the left you go, the further into the past you go.

**Why is there two 'T1' labels and two 'T2' labels?**

In regular chess, a turn consists of both a white move and black move. This convention carries over to Chess in 5D. Both the white and black boards have the same turn label since they both belong to the same turn.`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3',
    assets: {
      'four_board.png': require('assets/tutorials/movement/four_board.png')
    }
  },
  {
    text: `## Concept 2 - Time Travel

Alright, so here is where Chess in 5D differs from regular chess.

Since we can see the turn dimension as a series of boards in a horizontal line, we can do something that we can't in regular chess.

We can move pieces **back in time!**

Let's try this out, make the knight move back in time as shown below. The knight should be moving from b8 on the T2 black board to b6 on the T1 black board.
Go ahead and submit after you make this move.

![Knight move from b8 to b6](bb8b6.gif)

If you are confused as to how the knight can make this move, we'll go over all the piece moves in the next tutorial ('Movement Part 2').
For now, just assume that this move is possible.`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":2,"player":"black","coordinate":"b8","rank":8,"file":2},"end":{"timeline":0,"turn":1,"player":"black","coordinate":"b6","rank":6,"file":2},"player":"black"}],
    assets: {
      'bb8b6.gif': require('assets/tutorials/movement/bb8b6.gif')
    }
  },
  {
    text: `## Concept 2 - Time Travel

Here we can see there is a new T2 board above the 4 boards we saw earlier.

![Five boards](five_board.png)

**What just happened?!?**

If you just considered what happened, the knight essentially just travelled back in time by 1 turn.

In order to avoid the grandfather paradox, a whole new timeline is created.
So now you have two timelines:
- The bottom main timeline (0L), we have 5 boards with the knight vanishing from this timeline when it travelled back into the past.
- The top new timeline (-1L), we have 1 board with the knight appearing at where it was trying to go to (b6). This timeline is created from black's T1 board on the original timeline (0L).

You can think about it like this: When the knight moved back in time, the timeline split into two timelines.
The knight disappears from the original timeline and remerges into the new timeline.

Notice that the timelines have a label on the very left and very right ('0L' and '-1L'). These labels indicate the timeline number of the timeline (0 is the original timeline, -1 is the new timeline).

As to how these timeline numbers are determined, we'll cover this in the tutorial 'Timelines'. For now, just assume they are correct.

*Note: The grandfather paradox refers to the idea that if you were to travel into the past and kill your grandfather, how can you exist to kill your grandfather? Chess in 5D resolves this by essentially saying when you travel back in time, you also travel to a new timeline.
So you really travel to a new timeline that is an exact copy of the point in time you were trying to travel to. This means when you kill your grandfather, you actually kill a copy of your grandfather. In timeline you came from, your grandfather was never killed.*`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6',
    assets: {
      'five_board.png': require('assets/tutorials/movement/five_board.png')
    }
  },
  {
    text: `## Concept 3 - The Present

Okay, so we just had our black knight travel back in time.

**What happens now?**

As the white player, we are now required to play on the top timeline.

This is because the top timeline (-1L) has the earliest 'latest board'.

![Five boards](five_board.png)

**What does this mean?**

Each timeline has a 'latest board'.
This is defined as the board with the highest turn number (black bordered boards are higher than white bordered boards).

So when we are looking at which timeline each player needs to move, we look for which of the 'latest boards' of
all the timelines has the lowest turn number (or the 'earliest').

This board is known as *The Present*. Sometimes multiple boards may be part of *The Present*.`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6',
    assets: {
      'five_board.png': require('assets/tutorials/movement/five_board.png')
    }
  },
  {
    text: `## Concept 3 - The Present

Let's play a couple more actions on the top timeline only (-1L).

As white, move the bishop on f1 to d3 and submit.

![Bishop move from f1 to d3 on the -1L timeline](wf1d3-1l.gif)`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":-1,"turn":2,"player":"white","coordinate":"f1","rank":1,"file":6},"end":{"timeline":-1,"turn":2,"player":"white","coordinate":"d3","rank":3,"file":4},"player":"white"}],
    assets: {
      'wf1d3-1l.gif': require('assets/tutorials/movement/wf1d3-1l.gif')
    }
  },
  {
    text: `## Concept 3 - The Present

As black, move the pawn on e7 to e6 and submit.

![Pawn move from e8 to e6 on the -1L timeline](be8e6-1l.gif)`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Bf1:d3',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":-1,"turn":2,"player":"black","coordinate":"e7","rank":7,"file":5},"end":{"timeline":-1,"turn":2,"player":"black","coordinate":"e6","rank":6,"file":5},"player":"black"}],
    assets: {
      'be8e6-1l.gif': require('assets/tutorials/movement/be8e6-1l.gif')
    }
  },
  {
    text: `## Concept 3 - The Present

Now that both timelines have the same turn number in their 'latest board', which one of them is considered *The Present*?

![Two board in The Present](two_board_present.png)

**Both of them are!**

As mentioned earlier, multiple boards may be part of *The Present*.

If we make the same calulation, both boards are the earliest 'latest board' (since there is no other timelines than these two).`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Bf1:d3 ; 3b. 2-1:e7:e6',
    assets: {
      'two_board_present.png': require('assets/tutorials/movement/two_board_present.png')
    }
  },
  {
    text: `## Concept 4 - Action vs Move

**What happens now?**

Since we have two boards that are in *The Present*, we need to play on both boards.

This means we need to make a move on both the top and bottom boards.

This example shows what an action is in comparison to a move.

Let's make some formal definitions for both actions and moves:
- Move - Defined as a singluar piece movement or capture. This also includes en passant, promotion, and castling.
- Action - Defined as a group of one or more moves that a player makes during their turn.

*Note: Castling technically involves two piece movements, but for purposes of this current and future discussions, castling is considered a single move*`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Bf1:d3 ; 3b. 2-1:e7:e6'
  },
  {
    text: `## Concept 4 - Action vs Move

Let's play our first action consisting of more than one move.

As white, move the knight on b1 to c3 on both the top and bottom timelines and then submit.

![Knight move from b1 to c3 on top and bottom timelines](wb1c3.gif)

*Note: To continue on in the tutorial, play on the top board first then the bottom.
In the future, please follow the same move order as requested in the tutorial. Some actions require a specific move order.*`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Bf1:d3 ; 3b. 2-1:e7:e6',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":-1,"turn":3,"player":"white","coordinate":"b1","rank":1,"file":2},"end":{"timeline":-1,"turn":3,"player":"white","coordinate":"c3","rank":3,"file":3},"player":"white"},{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":3,"player":"white","coordinate":"b1","rank":1,"file":2},"end":{"timeline":0,"turn":3,"player":"white","coordinate":"c3","rank":3,"file":3},"player":"white"}],
    assets: {
      'wb1c3.gif': require('assets/tutorials/movement/wb1c3.gif')
    }
  },
  {
    text: `## Concept 5 - Timeline Travel

For our final concept, let's make another interesting move.

Let's play our first timeline travel move.

As black, move the knight on the top board at g8 to g6 on the bottom board.

![Knight move from g8 to g6 (from top board to bottom board)](bg8g6.gif)

If you are confused as to how the knight can make this move, we'll go over all the piece moves in the next tutorial ('Movement Part 2').
For now, just assume that this move is possible.`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Bf1:d3 ; 3b. 2-1:e7:e6 ; 4w. 3-1:Nb1:c3 ; 4w. 3:Nb1:c3',
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":-1,"turn":3,"player":"black","coordinate":"g8","rank":8,"file":7},"end":{"timeline":0,"turn":3,"player":"black","coordinate":"g6","rank":6,"file":7},"player":"black"}],
    assets: {
      'bg8g6.gif': require('assets/tutorials/movement/bg8g6.gif')
    }
  },
  {
    text: `## Concept 5 - Timeline Travel

**What just happened?!?**

Just like the time travel move we played earlier, the game of Chess in 5D allows for pieces to **move across timelines!**

Because of this, you can consider the multiple timelines (top and bottom boards) as another dimension. This dimension is known as the timeline dimension.

In fact, some pieces can also move both back in time and across timelines **within the same move!**

These two movement types are what make the game of Chess in 5D different from regular chess.`,
    import: '1w. 1:e2:e3 ; 1b. 1:e7:e6 ; 2w. 2:Bf1:d3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Bf1:d3 ; 3b. 2-1:e7:e6 ; 4w. 3-1:Nb1:c3 ; 4w. 3:Nb1:c3 ; 4b. 3-1:Ng8<>+0:g6'
  },
  {
    text: `## Finished

That's it for this tutorial!

Clicking on the next button below will take you to the next tutorial ('Movement Part 2'), which will teach you about piece movement.

To exit to the main menu, click on the logo or 'Chess in 5D' text in the top bar.`
  }
];

export default class Movement extends React.Component {
  render() {
    return (
      <TutorialGamePlayer
        tutorialArray={tutorialArray}
        next='/tutorial/movement2'
      />
    );
  }
}
