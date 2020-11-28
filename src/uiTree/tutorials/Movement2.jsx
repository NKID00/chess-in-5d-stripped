import React from 'react';

import TutorialGamePlayer from 'components/TutorialGamePlayer';

const tutorialArray = [
  {
    text: `## Welcome

Welcome to the second tutorial on movement.

We'll be walking through how each piece moves in this tutorial.`
  },
  {
    text: `## Review

Let's do a quick review. In the previous tutorial ('Movement'), we looked at both the concept of time travel and timeline travel.

We also briefly talked about both turns and timelines being dimensions. Let's clarify that concept.`
  },
  {
    text: `## Dimensions

Dimensions refers to the classical mathematical definition of a measurement axis in the mathematical space.

Let's go over all the dimensions that exist within Chess in 5D:
- X / File - The X / File dimension is the horizontal dimension within a single board. This dimension also exists in regular chess (labeled as a-g in SAN notation).
- Y / Rank - The Y / Rank dimension is the vertical dimension within a single board. This dimension also exists in regular chess (labeled as 1-8 in SAN notation).
- T / Turn - The T / Turn dimension is the time dimension within the full board. Within Chess in 5D, this dimension is represented as a horizontal line of boards. This dimension doesn't exist in regular chess.
- L / Timeline - The L / Timeline dimension is the dimension spanning timelines within the full board. Within Chess in 5D, this dimension is represented as a vertical line of boards. This dimension doesn't exist in regular chess.

These dimensions are how pieces can move, so understanding these four dimensions is important.`
  },
  {
    text: `## Dimensions

Now that we understand that Chess in 5D is played across four dimensions, this begs the question:

**Why is this game called Chess in 5D?**

If we look at the four dimensions, two of them are spatial and two of them are temporal (time-based).

In common parlance, time is refered to as the fourth dimension. So if we look at the list dimensions in the real world, it's more like this:
- 1st Dimension - X or width
- 2nd Dimension - Y or height
- 3rd Dimension - Z or depth
- 4th Dimension - T or time

Because of this we can consider this game to be played across 5 dimensions with the third (depth) unused.

This is why this game is called Chess in 5D. Chess played in 5 dimensions.`
  },
  {
    text: `## Regular Movement

In the game of Chess in 5D, every piece can move the same way as they can in regular chess.

Consider regular chess move as moves on the first two dimensions (File and Rank).

It is only when we try to extend past the two dimensions that things get complicated.`
  },
  {
    text: `## Capturing

Capturing works just like normal chess.

For all pieces except for the pawn, if you can move to the space an opponent's piece, you can capture that piece.`,
    import: ''
  },
  {
    text: `## Rook

Let's start with the easiest piece to understand first.

In regular chess, the rook can move along any number of spaces in one dimension.

For example, rooks can move 3 spaces to the right (along the File dimension).

When extending to Chess in 5D, rooks can also move along any number of spaces in a single dimension.

This means the rook can move:
- Left or Right along the File dimension
- Up or Down along the Rank dimension
- Forward or Back along the Turn dimension (realistically, the rook can only move back in time)
- Across timelines in the Timeline dimension

This picture shows rook movements.

![Rook moves](rook_move.png)

Feel free to try out rook movements here using the d3 rook on the -1L timeline.`,
    import: '1w. 1:a2:a4 ; 1b. 1:a7:a5 ; 2w. 2:h2:h3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Ra1:a3 ; 3b. 2-1:a7:a5 ; 4w. 3-1:Ra3:d3 ; 4w. 3:h3:h4 ; 4b. 3-1:h7:h6 ; 4b. 3:h7:h6',
    assets: {
      'rook_move.png': require('assets/rules/rook_move.png')
    }
  },
  {
    text: `## Bishop

Bishops in the regular game of chess moves along two dimensions an equal amount of spaces.

For example, a \`Ba3c5\` move results in moving 2 spaces to the right (from White's perspective) and 2 spaces up.

When extending to Chess in 5D, the bishop can still only move along two dimensions, but it can chose any of the two dimensions.

This means bishops can do moves like this:
- Move 1 space up and 1 space to the right
- Move back in time 2 turns and 2 spaces to the left
- Move 5 timelines up and 5 turns into the future

This picture shows bishop movements.

![Bishop moves](bishop_move.png)

Feel free to try out bishop movements here using the e5 bishop on the 0L timeline.`,
    import: '1w. 1:b2:b3 ; 1b. 1:a7:a6 ; 2w. 2:Bc1:b2 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:a2:a3 ; 3b. 2-1:a7:a6 ; 4w. 3:Bb2:e5 ; 4w. 3-1:h2:h3 ; 4b. 3-1:h7:h6 ; 4b. 3:h7:h6',
    assets: {
      'bishop_move.png': require('assets/rules/bishop_move.png')
    }
  },
  {
    text: `## Queen

Queens in the regular game of chess can move up to two dimensions and an equal amount of spaces along the selected dimensions.

When extending to Chess in 5D, the queen can move along any amount of dimensions.

This means queens can do moves like this:
- Move 4 spaces up
- Move 3 turns into the past, 3 spaces up, and 3 spaces to the left
- Move across 5 timelines towards the opponent's backline, 5 turns into the past, 5 spaces up, and 5 spaces to the left

This picture shows queen movements.

![Queen moves](queen_move.png)

Feel free to try out queen movements here using the f5 queen on the 0L timeline.`,
    import: '1w. 1:e2:e3 ; 1b. 1:a7:a6 ; 2w. 2:Qd1:f3 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:a2:a3 ; 3b. 2-1:a7:a6 ; 4w. 3:Qf3:f5 ; 4w. 3-1:a3:a4 ; 4b. 3-1:a6:a5 ; 4b. 3:a6:a5',
    assets: {
      'queen_move.png': require('assets/rules/queen_move.png')
    }
  },
  {
    text: `## King

Follows the same movement directions as the queen, but can only do 1 space instead.

This means kings can do moves like this:
- Move 1 spaces up
- Move 1 turns into the past, 1 spaces up, and 1 spaces to the left
- Move across 1 timelines towards the opponent's backline, 1 turn into the future, 1 spaces up, and 1 spaces to the left

This picture shows king movements.

![King moves](king_move.png)

Feel free to try out king movements here using the f4 king on the 0L timeline.`,
    import: `1w. 1:d2:d3 ; 1b. 1:a7:a6 ; 2w. 2:Ke1:d2 ; 2b. 2:h7:h6 ; 3w. 3:Kd2:e3 ; 3b. 3:Nb8<-1>2:b6 ; 4w. 3-1:a2:a3 ; 4b. 3-1:h7:h6 ; 5w. 4-1:Kd2:e1 ; 5w. 4:Ke3:f4 ; 5b. 4-1:Nb6:a4 ; 5b. 4:b7:b6`,
    assets: {
      'king_move.png': require('assets/rules/king_move.png')
    }
  },
  {
    text: `## Knight

Knights work in regular chess by moving 2 spaces in one dimension and 1 in another.

When extending to Chess in 5D, the knight can moving 2 spaces in one dimension and 1 in another, but they can chose any dimension they want.

This means knights can do moves like this:
- Move 1 space up and 2 spaces to the right
- Move back in time 2 turns and 1 space to the left
- Move across 2 timelines towards the opponent's backline and 1 turn into the past

This picture shows knight movements.

![Knight moves](knight_move.png)

Feel free to try out knight movements here using the e5 knight on the 0L timeline.`,
    import: '1w. 1:Ng1:f3 ; 1b. 1:a7:a6 ; 2w. 2:Nf3:e5 ; 2b. 2:Nb8<-1>1:b6 ; 3w. 2-1:Nf3:g1 ; 3b. 2-1:a7:a6 ; 4w. 3:a2:a3 ; 4w. 3-1:a2:a3 ; 4b. 3-1:h7:h6 ; 4b. 3:h7:h6',
    assets: {
      'knight_move.png': require('assets/rules/knight_move.png')
    }
  },
  {
    text: `## Concept 1 - The Backline

Before we look at pawn movement, we need to understand the concept of *The Backline*.

If we look at the concept of the backrank in regular chess, the backrank is defined as the very last rank that is toward's the opponent's direction.

For white, rank 8 is the backrank and black's backrank is rank 1.

In Chess in 5D, an additional concept called *The Backline* is similar.

Instead of describing the opponent's side within the Rank dimension, *The Backline* describes the opponent's side within the Timeline dimension.

Formally defined, *The Backline* is the opponent's highest (technically the latest) timeline.

For white, the negative timeline with the largest number is *The Backline*.

For black, the positive timeline with the largest number is *The Backline*.

For example, if the game has timelines -1L, 0L, 1L, 2L, then the white's backline is -1L and black's backline is 2L.`
  },
  {
    text: `## Pawn (Movement)

Pawns are the most complicated piece in terms of movement.

Pawn's in Chess in 5D have the exact same Rank / File dimension movement.

When trying to move across the Turn / Timeline dimension, pawns can only move across timelines towards *The Backline*.

Similar to regular chess, if a pawn has not moved yet, they can move two spaces towards *The Backline*.

This picture shows pawn movement.

![Pawn move](pawn_move.png)

Feel free to try out pawn movements here using the e2 pawn on the +1L timeline.`,
    import: '1w. 1:e2:e3 ; 1b. 1:a7:a6 ; 2w. 2:Nb1<+1>1:b3 ; 2b. 1+1:Nb8<-1>+0:b6 ; 3w. 2-1:a2:a3 ; 3w. 2+1:a2:a3 ; 3b. 2-1:a7:a6 ; 3b. 2+1:a7:a6 ; 3b. 2:h7:h6',
    assets: {
      'pawn_move.png': require('assets/rules/pawn_move.png')
    }
  },
  {
    text: `## Pawn (Capture)

Just like pawns in regular chess, pawn capture is different from pawn movement.

When trying to capture across the Turn / Timeline dimension, pawns can only move across timelines towards *The Backline* and one turn into the past or future.

This picture shows pawn capture.

![Pawn capture](pawn_capture.png)

Feel free to try out pawn captures here using the e5 pawn on the +1L timeline.`,
    import: '1w. 1:a2:a3 ; 1b. 1:e7:e5 ; 2w. 2:Nb1<+1>1:b3 ; 2b. 1+1:d7:d6 ; 3w. 2+1:e2:e4 ; 3b. 2+1:a7:a6 ; 3b. 2:a7:a6 ; 4w. 3+1:e4:e5 ; 4w. 3:h2:h3 ; 4b. 3+1:h7:h6 ;4b. 3:h7:h6',
    assets: {
      'pawn_capture.png': require('assets/rules/pawn_capture.png')
    }
  },
  {
    text: `## Pawn (En Passant)

Currently en passant capture is only possible via the regular chess move. Extending this past the two regular dimensions is unclear at this time.

This picture shows en passant capture.

![Pawn en passant](pawn_en_passant.png)

Feel free to try out pawn en passant capture on the e5 pawn.`,
    import: '1w. 1:e2:e4 ; 1b. 1:a7:a6 ; 2w. 2:e4:e5 ; 2b. 2:d7:d5',
    assets: {
      'pawn_en_passant.png': require('assets/rules/pawn_en_passant.png')
    }
  },
  {
    text: `## Pawn (Castling)

Currently castling is only possible via the regular chess move. Extending this past the two regular dimensions is unclear at this time.

This picture shows both queenside and kingside castling.

![Castling](castling.png)

Feel free to try out queenside and kingside castling on the e1 king.

*Note: When determining if castling is possible by checking if the king is under attack (or if spaces the king moves through is under attack), Chess in 5D only looks at pieces within the same board.
Pieces attacking from other timelines are not considered.
This is primarily because the castling move could be considered invalid if pieces in the future attack into the past castling move.*`,
    import: '1w. 1:d2:d3 ; 1b. 1:a7:a6 ; 2w. 2:Bc1:e3 ; 2b. 2:b7:b6 ; 3w. 3:g2:g3 ; 3b. 3:c7:c6 ; 4w. 4:Bf1:g2 ; 4b. 4:d7:d6 ; 5w. 5:Ng1:f3 ; 5b. 5:e7:e6 ; 6w. 6:Nb1:c3 ; 6b. 6:f7:f6 ; 7w. 7:Qd1:d2 ; 7b. 7:g7:g6',
    assets: {
      'castling.png': require('assets/rules/castling.png')
    }
  },
  {
    text: `## Promotion

Currently Promotion is only possible via the regular chess move. Extending this past the two regular dimensions is unclear at this time.

This picture shows promotion to queen.

![Pawn promotion](pawn_promote.gif)

Feel free to try out promotion using the a7 pawn.`,
    import: '1w. 1:a2:a4 ; 1b. 1:b7:b5 ; 2w. 2:a4:xb5 ; 2b. 2:a7:a6 ; 3w. 3:b5:xa6 ; 3b. 3:Nb8:c6 ; 4w. 4:a6:a7 ; 4b. 4:Ra8:b8',
    assets: {
      'pawn_promote.gif': require('assets/rules/pawn_promote.gif')
    }
  },
  {
    text: `## Finished

That's it for this tutorial!

Clicking on the next button below will take you to the next tutorial ('Checkmate'), which will teach you about how to actually win.

To exit to the main menu, click on the logo or 'Chess in 5D' text in the top bar.`
  }
];

export default class Movement2 extends React.Component {
  render() {
    return (
      <TutorialGamePlayer
        tutorialArray={tutorialArray}
        next='/tutorial/checkmate'
      />
    );
  }
}
