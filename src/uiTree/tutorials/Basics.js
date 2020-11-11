import React from 'react';

import TutorialGamePlayer from 'components/TutorialGamePlayer';

const tutorialArray = [
  {
    text: `## Welcome
Welcome to the world of Chess in 5D!

Chess in 5D looks to faithfully implement the rules of the game
'5D Chess with Multidimensional Time Travel' by Connor Peterson.

Here in these series of tutorials, we'll be learning how to play the game of Chess in 5D.

We'll be walking through the basics of how to use the user interface to play Chess in 5D in this tutorial.`
  },
  {
    text: `## Menus (Top)

![Top bar with three buttons](top_three.png)

Looking at the top bar, we currently have three buttons.

![Chat Button](chat_button.png)

In network play, an additional 'chat' button is available for player to player communication.`,
    assets: {
      'top_three.png': require('assets/tutorials/basics/top_three.png'),
      'chat_button.png': require('assets/tutorials/basics/chat_button.png')
    }
  },
  {
    text: `## Menus (Top / Tutorial)

![Tutorial Button](tutorial_button.png)

This button hides and shows this tutorial box. Go ahead and try this button now.

You will only find this button in the tutorials section of Chess in 5D.`,
    assets: {
      'tutorial_button.png': require('assets/tutorials/basics/tutorial_button.png')
    }
  },
  {
    text: `## Menus (Top / Notation)

![Notation Button](notation_button.png)

This button hides and shows the notation box, which imports and exports games.
The notation box also works to show past actions.

Working with this box is beyond the scope of this tutorial, so we'll skip this for now.

![Notation Box](notation_box.png)`,
    assets: {
      'notation_button.png': require('assets/tutorials/basics/notation_button.png'),
      'notation_box.png': require('assets/tutorials/basics/notation_box.png')
    }
  },
  {
    text: `## Menus (Top / Settings)

![Settings Button](settings_button.png)

This button hides and shows the box to change several settings for displaying the game.

Working with this box is beyond the scope of this tutorial, so we'll skip this for now.

![Settings Box](settings_box.png)`,
    assets: {
      'settings_button.png': require('assets/tutorials/basics/settings_button.png'),
      'settings_box.png': require('assets/tutorials/basics/settings_box.png')
    }
  },
  {
    text: `## Menus (Top / Second Row)

![Action Buttons](action_buttons.png)

Looking at the second row of the top bar, we currently have two buttons and an action indicator.

This row only shows up in the Match Analyzer and tutorials. This is used primarily to navigate the game history.`,
    assets: {
      'action_buttons.png': require('assets/tutorials/basics/action_buttons.png')
    }
  },
  {
    text: `## Menus (Top / Second Row / Action Indicator)

![Action Indicator](action_indicator.png)

This indicator shows what the current action number is.
Because the game of Chess in 5D sometimes requires multiple moves, the list of moves played before submitting is referred to as an action.

Action number refers to the nth action the current list of moves would be.

For example, an action number of 1 during white's turn indicates the current moves being played by white is white's first action.

Another example, an action number of 7 during black's turn indicates the current moves being played by black is black's seventh action.`,
    assets: {
      'action_indicator.png': require('assets/tutorials/basics/action_indicator.png')
    }
  },
  {
    text: `## Menus (Top / Second Row / Revert)

![Revert Button](revert_button.png)

This button is used go back one action within the game history.

On devices with a keyboard, the 'Left Arrow' key also triggers this function.`,
    assets: {
      'revert_button.png': require('assets/tutorials/basics/revert_button.png')
    }
  },
  {
    text: `## Menus (Top / Second Row / Forward)

![Forward Button](forward_button.png)

This button is used go forward one action within the game history.

On devices with a keyboard, the 'Right Arrow' key also triggers this function.`,
    assets: {
      'forward_button.png': require('assets/tutorials/basics/forward_button.png')
    }
  },
  {
    text: `## Menus (Bottom)

(WIP Insert Image)

Looking at the bottom bar, we currently have three buttons and one status indicator.`
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
    text: `## Making a move

(WIP Insert Image)

Let's make the first move. Following the picture shown above, move the e2 pawn to e3.

If you make the wrong move, go ahead and use the undo button.

Don't click on the submit button yet.`,
    import: ''
  },
  {
    text: `## Submitting an action

(WIP Insert Image)

Let's submit the move we just made. In the tutorials, whenever an action is needed, clicking on the next button will also act as a submit button.

For now, try clicking on the submit button instead.`,
    moveBuffer: [{"promotion":null,"enPassant":null,"castling":null,"start":{"timeline":0,"turn":1,"player":"white","coordinate":"e2","rank":2,"file":5},"end":{"timeline":0,"turn":1,"player":"white","coordinate":"e3","rank":3,"file":5},"player":"white"}]
  },
  {
    text: `## Finished

That's it for this tutorial! Go ahead and go to the next tutorial to learn more about movement.`
  }
];

export default class Basics extends React.Component {
  render() {
    return (
      <TutorialGamePlayer
        tutorialArray={tutorialArray}
      />
    );
  }
}
