# Chess in 5D Rules

## Work In Progress

These rules are still a work in progress. Rules are outdated compared to the tutorials.

## Introduction

The game of Chess in 5D looks to faithfully implement the original rules of Standard in the game '5D Chess with Multidimensional Time Travel' as created by Connor Peterson. These rules below attempt to explain it.

When looking at the name Chess in 5D, it sounds just like any other multidimensional chess variant using an increasing amount of spatial dimensions.
However, in this variant, there are three spatial dimensions and two temporal dimensions instead.

Here are the dimensions listed:
 - Rank - The vertical axis same as regular chess.
 - File - The horizontal axis same as regular chess.
 - Height - Third spatial dimension that is not used within the game.
 - Turn - The first temporal (time-based) dimension, in which pieces travel back in time.
 - Timeline - The second temporal dimension in which pieces travel across separate timelines.

This may look confusing at first, so an example game may help explain.

## Example Game / How To Play

Open another tab to follow along [https://chessin5d.net/#/local/game/human](https://chessin5d.net/#/local/game/human). Uncheck the 'Timed Game' checkbox and click on the 'Start' button.

![Starting Board](start.gif)

Here is the starting board of Chess in 5D. This is the exact same starting board as regular chess. In fact, when not utilizing the temporal dimensions, Chess in 5D pieces move along the Rank / File dimension in the same way as regular chess.

Let's make the first move: `1w. 1:e2:e3` (regular chess equivalent is `e3`). To do this, select the `e2` pawn and then select the `e3` space. Do not press the 'Submit' button first.

*We'll go over the notation later*

![1w. 1:e2:e3](1w1e2e3.gif)

Here, notice two boards have been created. The first original board is unchanged and the new board has the pawn moved. This represents a timeline, with boards on the left representing the past.

Also, notice that the two boards have two different outlines, one white and one black. The board on the left has the white outline and the board on the right has the black outline. These represent the player's turn when that board was in play.

In order to finish white's turn, click on the 'Submit' button.

![Submitting 1w. 1:e2:e3](1w1e2e3submit.gif)

Notice the board outlines changing from thin to thick. Boards with a thick border indicates that a move still needs to be played (this is called the "Present", which is an important term).

Doing the similar process above, let's play the move: `1b. 1:e7:e6` (regular chess equivalent is `e6`).

After moving the pawn, press the submit button.

![1b. 1:e7:e6](1b1e7e6.gif)

By now, you can see more and more boards get created every move that gets played.

Let's make our first move using time travel.

We are going to play this move: `2w. 2:Nb1<+1>1:b3` (no regular chess equivalent)

To play this move, select the knight on `b1` on the right most board. Then select the `b3` space on the left most board. Submit when done.

![2w. 2:Nb1<+1>1:b3](2w2Nb1+1+1b3.gif)

What is happening here?!?

If you think about how time travel works in fiction, one of the common problems with time travel is the 'Grandfather Paradox'. This is the idea that if you can travel back in time and you kill your grandfather, how can you be born to travel back in time? In order to avoid this paradox, the game of Chess in 5D creates a new timeline whenever a move would change the past of a timeline.

This new timeline is the board below the four other boards.

Here in this move, the knight moved two turns into the past. Because you cannot have a paradox, a new timeline is spawned. This timeline now has the new knight, where as the original timeline has the knight missing.

We'll go over how the pieces can move along the Turn / Timeline dimension later, for now assume this is a legal move.

Play these two moves: `2b. 1+1:e7:e6` and `3w. 2+1:e2:e3`

These are the chess equivalent of `e6` and `e3` on the lower board.

![3w. 2+1:e2:e3](3w2+1e2e3.gif)

What is going on now?!?

There are now two boards on the top and bottom with thick borders. This means you need to make a move on each board.

Let's play two more pawn moves: `3b. 2+1:a7:a6` and `3b. 2:a7:a6`

These are the chess equivalent of `a6` on the two boards on the right.

![3b. 2:a7:a6](3b2a7a6.gif)

Now let's play our first timeline traveling move: `4w. 3+1:Nb3<>+0:b5` (no regular)

![4w. 3+1:Nb3<>+0:b5](4w3+1Nb3+0b5.gif)

This move represents our first piece traveling across timelines.

Because piece can move across both time and timelines, pieces can attack into the past and across different timelines. Furthermore, since timelines are created by attempts to travel to the past, things get problematic fast.

This is the crux of what makes Chess in 5D complicated.

## Terms and Definitions

Let's get a few definitions out of the way:
 - Move - A move is considered as a single movement of a piece (Capturing, En Passant, and Castling are considered a single move).
 - Action - A collection of moves that when submitted results in other player's time to play.
 - Action Number - A number starting from 1 that indicates both the current player and how many actions has been taken. Increments by 1 for a player every time an action is played
 - Turn - A movable dimension within the game. A single turn has both white and black actions.
 - Timeline - A movable dimension within the game. Timelines contain multiple boards across turns.
 - Rank - A movable dimension within the game. Same as standard chess.
 - File - A movable dimension within the game. Same as standard chess.
 - Full Board - A full board is considered as the full board state between actions. Contains all timelines, turns, and singular boards with all pieces.
 - Backline - Each player has a backline, which is the latest timeline create by each opponent.

*Notice: the previous example did not use these terms for the sake of easier introduction, as explaining terms before context would not make sense*

## Piece Movements

Chess in 5D piece have the same Rank / File movement as regular chess pieces. Castling and En Passant in the Rank / File dimension is the same (though when looking for if a space is under attack for castling, Turn / Timeline movements attacking a space is still part of the calculation).

We'll look at how pieces move / capture from the easiest piece to understand to the hardest.

### Rooks

![Rook Move](rook_move.png)

The rook is the easiest piece to understand.

In the regular game of chess, the rook can move as many spaces along one dimension.

This means that when extended to Chess in 5D, the rook can only move:
 - Left or Right along the File dimension
 - Up or Down along the Rank dimension
 - Forward or Back along the Turn dimension (realistically, the rook can only move back in time)
 - Across timelines in the Timeline dimension

Capturing is the same as normal chess, if you can move to the same location as an opponent piece, you can capture that piece.

### Bishops

![Bishop Move](bishop_move.png)

Bishops in the regular game of chess moves along two dimensions an equal amount of spaces.

For example, a `Ba3c5` move results in moving 2 spaces to the right (from White's perspective) and 2 spaces up.

When extending to Chess in 5D, the bishop can still only move along two dimensions, but it can chose any of the two dimensions.

This means bishops can do moves like this:
 - Move 1 space up and 1 space to the right
 - Move back in time 2 turns and 2 spaces to the left
 - Move across 5 timelines towards the opponent's backline and 5 turns into the future

### Queens

![Queen Move](queen_move.png)

Queens in the regular game of chess can move up to two dimensions and an equal amount of spaces along the selected dimensions.

When extending to Chess in 5D, the queen can move along any amount of dimensions.

This means queens can do moves like this:
 - Move 4 spaces up
 - Move 3 turns into the past, 3 spaces up, and 3 spaces to the left
 - Move across 5 timelines towards the opponent's backline, 5 turns into the past, 5 spaces up, and 5 spaces to the left

### Kings

![King Move](king_move.png)

Follows the same movement directions as the queen, but can only do 1 space instead.

This means kings can do moves like this:
 - Move 1 spaces up
 - Move 1 turns into the past, 1 spaces up, and 1 spaces to the left
 - Move across 1 timelines towards the opponent's backline, 1 turn into the future, 1 spaces up, and 1 spaces to the left

### Knights

![Knight Move](knight_move.png)

Knights work in regular chess by moving 2 spaces in one dimension and 1 in another.

When extending to Chess in 5D, the knight can moving 2 spaces in one dimension and 1 in another, but they can chose any dimension they want.

This means knights can do moves like this:
 - Move 1 space up and 2 spaces to the right
 - Move back in time 2 turns and 1 space to the left
 - Move across 2 timelines towards the opponent's backline and 1 turn into the past

### Pawn

![Pawn Move](pawn_move.png)

![Pawn Capture](pawn_capture.png)

Pawns are the most complicated piece in terms of movement.

When trying to move across the Turn / Timeline dimension, pawns can only move across timelines towards the backline.

When trying to capture across the Turn / Timeline dimension, pawns can only move across timelines towards the backline and one turn into the past or future.

### En Passant

![Pawn En Passang](pawn_en_passant.png)

Currently En Passant is only possible via the regular chess move. Extending this into Chess in 5D is unclear at this time.

### Castling

![Castling](castling.png)

Currently Castling is only possible via the regular chess move. Extending this into Chess in 5D is unclear at this time.

### Promotion

![Promotion](pawn_promote.gif)

Currently Promotion is only possible via the regular chess move. Extending this into Chess in 5D is unclear at this time.

## Notation

Notation used: `(Action #)(Color). (Turn #)[+/- Line #]:[Piece](Coord)[<+/- New Line #>][Dest Turn #][Dest +/- Line #]:[Capture][Promotion Piece](Dest Coord)[En Passant][Check/Checkmate/Stalemate]`

This is the notation for a single move. To delimit between moves, either a newline or semicolon is acceptable.

  - `(Action #)` - **\[Required\]** Action Number, the all moves within the referred action are required to indicate which action the move is a part of. Formatted as an integer starting from 1.
  - `(Color). ` - **\[Required\]** Lowercase character indicating player color (`b` or `w`) of the player that made the move. A `.` and space is required after the character.
  - `(Turn #)` - **\[Required\]** Turn number of the starting location of the piece to be moved. Formatted as an integer starting from 1.
  - `[+/- Line #]` - Timeline number of the starting location of the piece to be moved. If timeline is 0, nothing should be in the term. A `+` or `-` character is required to precede the number (expressed as integer).
  - `[Piece]` - Piece character as found in SAN notation. Must be capitalized. King is `K` and Knight is `N` (pawn is an empty character). This term is not strictly required within library usage and is used for human readability purposes.
  - `(Coord)` - **\[Required\]** Coordinate of starting rank and file of the piece to be moved. Formatted in the SAN notation coordinate system `[a-h][1-8]`. First character must be lowercase.
  - `[<+/- New Line #>]` - Timeline number of newly created timelines. This term is required if new timelines are created or the destination location has a different turn and/or timeline of the starting location (in this case, if no timeline is created, `<>` is used). The internal number (within the `<>` separator), is not strictly required within library usage and is used for human readability purposes.
  - `[Dest Turn #]` - Turn number of destination location. Required if this term is different from starting location. Same format as `(Turn #)` (see above).
  - `[Dest +/- Line #]` - Timeline number of destination location. Required if this term is different from starting location. Same format as `[+/- Line #]` (see above).
  - `[Capture]` - Indicate if this movement captures a piece. If this move captures a piece, the character `x` is used. This term is not strictly required within library usage and is used for human readability purposes.
  - `[Promotion Piece]` - Used during pawn promotion to indicate what piece type the pawn is being promoted to. Same as above, the piece character is the same as SAN notation. Must be capitalized. Knight is still a `N`. Strictly required during promotion.
  - `(Dest Coord)` - **\[Required\]** Coordinate of destination rank and file of the piece to be moved. Same format as `(Coord)` (see above).
  - `[En Passant]` - Indicate if move is an En Passant capture. Characters in use is `e.p.`. Strictly required during En Passant capture.
  - `[Check/Checkmate/Stalemate]` - Indicate if the action this move belongs to results in check, checkmate, or stalemate for the opponent. Check is `+`, checkmate is `#`, and stalemate is `=`. The library will attach this term to the last move within the action. This term is not strictly required within library usage and is used for human readability purposes.

Notation exceptions for castling:

  - Queenside Castling: `(Action #)(Color). (Turn #)[+/- Line #]:0-0-0`
  - Kingside Castling: `(Action #)(Color). (Turn #)[+/- Line #]:0-0`

## Checkmate

Checkmate occurs when no possible action can be taken to avoid any king being captured (past, present, or future).

Checkmate occurs also when the present cannot be advanced, i.e. no possible action can be taken.

*Note: sometimes the only option is to escape to the past through a new timeline*

## Stalemate

Stalemate occurs when no possible moves can be played across all present boards, but no kings are under attack.
