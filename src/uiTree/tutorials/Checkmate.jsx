import React from 'react';

import TutorialGamePlayer from 'components/TutorialGamePlayer';

const tutorialArray = [
  {
    text: `## Welcome

Welcome to the tutorial on checkmate and other conditions.`
  },
  {
    text: `## Checkmate

In regular chess, checkmate occurs when the player moves in such a way that the opponent has no more legal moves while in check.

In the game of Chess in 5D, this definition is still the same. However there are a couple of interesting concepts.`
  },
  {
    text: `## Checkmate

Let's take a look at a regular chess checkmate in the context of Chess in 5D.

Here we will be looking at the Scholar's mate.`,
    import: '1w. 1:e2:e4 ; 1b. 1:e7:e5 ; 2w. 2:Bf1:c4 ; 2b. 2:Nb8:c6 ; 3w. 3:Qd1:h5 ; 3b. 3:Ng8:f6 ; 4w. 4:Qh5:xf7'
  },
  {
    text: `## Checkmate

Just like regular chess, the black player cannot prevent the white queen from capturing their king.

Here, they cannot capture nor block the white queen on f7. This is needed to prevent the king capture.`
  },
  {
    text: `## Checkmate (Past King)

Because pieces in Chess in 5D can capture back in time, past kings can be captured.

This mean players can be in check via a move that threats to capture their past king.`
  },
  {
    text: `## Checkmate (Past King)

Let's look at a 5D version of Fool's mate.`,
    import: '1w. 1:f2:f3 ; 1b. 1:e7:e6 ; 2w. 2:d2:d3 ; 2b. 2:Qd8:f6 ; 3w. 3:Ke1:d2 ; 3b. 3:Qf6:h4'
  },
  {
    text: `## Checkmate (Past King)

Here since the black queen on h4 can capture the white king on e1 (at turn 1), white cannot block this move.

The only option is to capture the black queen, which white cannot do.`
  },
  {
    text: `## Softmate

Softmate refers to a situation in which the only valid action to escape check is to create a new past timeline.

This involves moving the present into the past.

*Note: Softmate does not end the game.*`
  },
  {
    text: `## Softmate

Let's take a look at a modified Scholar's mate resulting in a softmate.`,
    import: '1w. 1:b2:b4 ; 1b. 1:e7:e5 ; 2w. 2:Ng1<+1>1:g3 ; 2b. 1+1:e7:e5 ; 3w. 2+1:e2:e4 ; 3b. 2:Nb8:c6 ; 3b. 2+1:Nb8:c6 ; 4w. 3+1:Qd1:h5 ; 4w. 3:Bc1:b2 ; 4b. 3+1:Ng8:f6 ; 4b. 3:Ng8:f6 ; 5w. 4:Bb2<>+1:b3 ; 5b. 4:Nc6:xb4 ; 5b. 4+1:Nc6:d4 ; 6w. 5+1:Qh5:xf7 ; 6w. 5:Nb1:c3'
  },
  {
    text: `## Softmate
    
Here, the only valid actions result in the present being moved to a time before the check occurs.

Feel free to experiment with actions here that escape the current check.

One valid action is to move the black knight on f6 (at turn 5 and timeline 0) one turn into the past (any square will do).`
  },
  {
    text: `## Finished

That's it for this tutorial!

To exit to the main menu, click on the next button, the logo, or 'Chess in 5D' text in the top bar.`
  }
];

export default class Checkmate extends React.Component {
  render() {
    return (
      <TutorialGamePlayer
        tutorialArray={tutorialArray}
        next='/'
      />
    );
  }
}
