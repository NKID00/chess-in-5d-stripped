# Chess in 5D Rules

## Work In Progress

These rules are still a work in progress.

## Introduction

The game of Chess in 5D looks to faithfully implement the original rules of Standard in the game '5D Chess with Multidimensional Time Travel' as created by Connor Peterson. These rules below attempt to explain it.

When looking at the name Chess in 5D, it sounds just like any other multidimensional chess variant using an increasing amount of spatial dimensions.
However, in this variant, there are three spatial dimensions and two temporal dimensions instead.

Here are the dimensions listed:
 - Rank - The vertical axis same as regular chess
 - File - The horizontal axis same as regular chess
 - Height - Third spatial dimension that is not used within the game
 - Turn - The first temporal (time-based) dimension, in which pieces travel back in time
 - Timeline - The second temporal dimension in which pieces travel across separate timelines

This may look confusing at first, so an example game may help explain.

# Example Game / How To Play

Open another tab to follow along [https://chessin5d.net/#/local/game/human](https://chessin5d.net/#/local/game/human). Uncheck the 'Timed Game' checkbox and click on the 'Start' button.

![Starting Board](/assets/start.gif)

Here is the starting board of Chess in 5D. This is the exact same starting board as regular chess. In fact, when not utilizing the temporal dimensions, Chess in 5D pieces move along the Rank / File dimension in the same way as regular chess.

Let's make the first move: `1w. 1:e2:e3` (regular chess equivalent is `e3`). To do this, select the `e2` pawn and then select the `e3` square. Do not press the 'Submit' button first.

*We'll go over the notation later*

![1w. 1:e2:e3](/assets/1w1e2e3.gif)

Here, notice two boards have been created. The first original board is unchanged and the new board has the pawn moved. This represents a timeline, with boards on the left representing the past.

Also, notice that the two boards have two different outlines, one white and one black. The board on the left has the white outline and the board on the right has the black outline. These represent the player's turn when that board was in play.

In order to finish white's turn, click on the 'Submit' button.

![Submitting 1w. 1:e2:e3](/assets/1w1e2e3submit.gif)

Notice the board outlines changing from thin to thick. Boards with a thick border indicates that a move still needs to be played (this is called the "Present", which is an important term).

Doing the similar process above, let's play the move: `1b. 1:e7:e6` (regular chess equivalent is `e6`).

After moving the pawn, press the submit button.

![1b. 1:e7:e6](/assets/1b1e7e6.gif)

By now, you can see more and more boards get created every move that gets played.

Let's make our first move using time travel.

We are going to play this move: `2w. 2:Nb1<+1>1:b3` (no regular chess equivalent)

To play this move, select the knight on `b1` on the right most board. Then select the `b3` square on the left most board. Submit when done.

![2w. 2:Nb1<+1>1:b3](/assets/2w2Nb1+1+1b3.gif)

What is happening here?!?

If you think about how time travel works in fiction, one of the common problems with time travel is the 'Grandfather Paradox'. This is the idea that if you can travel back in time and you kill your grandfather, how can you be born to travel back in time? In order to avoid this paradox, the game of Chess in 5D creates a new timeline whenever a move would change the past of a timeline.

This new timeline is the board below the four other boards.

Here in this move, the knight moved two turns into the past. Because you cannot have a paradox, a new timeline is spawned. This timeline now has the new knight, where as the original timeline has the knight missing.

We'll go over how the pieces can move along the Turn / Timeline dimension later, for now assume this is a legal move.

Play these two moves: `2b. 1+1:e7:e6` and `3w. 2+1:e2:e3`

These are the chess equivalent of `e6` and `e3` on the lower board.

![3w. 2+1:e2:e3](/assets/3w2+1e2e3.gif)

What is going on now?!?

There are now two boards on the top and bottom with thick borders. This means you need to make a move on each board.

Let's play two more pawn moves: `3b. 2+1:a7:a6` and `3b. 2:a7:a6`

These are the chess equivalent of `a6` on the two boards on the right.

![3b. 2:a7:a6](/assets/3b2a7a6.gif)

Now let's play our first timeline traveling move: `4w. 3+1:Nb3<>+0:b5` (no regular)

![4w. 3+1:Nb3<>+0:b5](/assets/4w3+1Nb3+0b5.gif)

This move represents our first piece traveling across timelines.

Because piece can move across both time and timelines, pieces can attack into the past and across different timelines. Furthermore, since timelines are created by attempts to travel to the past, things get problematic fast.

This is the crux of what makes Chess in 5D complicated.

# Piece Movements

Chess in 5D piece have the same Rank / File movement as regular chess pieces. Castling and En Passant in the Rank / File dimension is the same (though when looking for if a square is under attack for castling, Turn / Timeline movements attacking a square is still part of the calculation).

We'll look at how pieces move / capture from the easiest piece to understand to the hardest.

## Rooks

The rook is the easiest piece to understand.

In the regular game of chess, the rook can move as many squares along one dimension.

This means that when extended to Chess in 5D, the rook can only move:
 - Left or Right along the File dimension
 - Up or Down along the Rank dimension
 - Forward or Back along the Turn dimension (realistically, the rook can only move back in time)
 - Across timelines in the Timeline dimension

Capturing is the same as normal chess, if you can move to the same location as an opponent piece, you can capture that piece.

## Bishops

Bishops in the regular game of chess moves along two dimensions an equal amount of squares.

For example, a `Ba3c5` move results in moving 2 squares to the right (from White's perspective) and 2 squares up.

When extending to Chess in 5D, the bishop can still only move along two dimensions, but it can chose any of the two dimensions.

This means bishops can do moves like this:
 - Move 1 square up and 1 square to the right
 - Move back in time 2 turns and 2 squares to the left
 - Move across 5 timelines towards the opponent's backline and 5 turns into the past.

## Pawn

Pawns are the most complicated piece in terms of movement.

When trying to move across the Turn / Timeline dimension, pawns can only move forward across the opponents timelines.

What does this mean? 

