import React from 'react';

import { Flex, Text } from 'rebass';
import { withSnackbar } from 'notistack';
import Chess from '5d-chess-js';
import Checkbox from '@material-ui/core/Checkbox';

import TimedGamePlayer from 'components/TimedGamePlayer';
import BotImport from 'components/BotImport';
import BotWorker from 'workerize-loader!uiTree/games/BotWorker'; // eslint-disable-line import/no-webpack-loader-syntax

var bw1 = new BotWorker();
var bw2 = new BotWorker();

const defaultBot = `(Chess, chessInstance) => {
  /*
    Notice: This bot/engine does not play competitively and is only here for demonstration purposes

    This bot picks a random valid action and plays it.

    Go to https://gitlab.com/alexbay218/chess-in-5d for more information on how to create your own bot

    In the future, a better default bot will replace this one.
  */
  var action = {
    action: chessInstance.actionNumber,
    player: chessInstance.player,
    moves: []
  };
  var actionMoves = [];
  var valid = false;
  while(!valid) {
    actionMoves = [];
    var submit = false;
    var tmpChess = new Chess(chessInstance.export());
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
  console.log('Random Bot is making action: ' + JSON.stringify(action));
  return action;
};`;

class LocalComputerOnly extends React.Component {
  timedGameRef = React.createRef();
  bot1Global = {};
  bot2Global = {};
  state = {
    start: false,
    ended: false,
    debug: false,
    botFunc1: defaultBot,
    botFunc2: defaultBot
  };
  async compute() {
    if(!this.state.ended) {
      if(
        (await this.timedGameRef.current.gameRef.current.chess.player === 'white' && this.state.debug1) ||
        (await this.timedGameRef.current.gameRef.current.chess.player !== 'white' && this.state.debug2)
      ) {
        try {
          var botFunc = new Function('Chess', 'chessInstance', 'GPU', 'global', 'return ' + (await this.timedGameRef.current.gameRef.current.chess.player === 'white' ? this.state.botFunc1 : this.state.botFunc2))(); // eslint-disable-line no-new-func
          var action = botFunc(Chess, new Chess(await this.timedGameRef.current.gameRef.current.chess.exportFunc()), undefined, (await this.timedGameRef.current.gameRef.current.chess.player === 'white' ? this.bot1Global : this.bot2Global));
          for(var i = 0;i < action.moves.length;i++) {
            await this.timedGameRef.current.gameRef.current.move(action.moves[i]);
          }
          window.setTimeout(() => {
            this.timedGameRef.current.gameRef.current.submit();
          }, 250);
        }
        catch(err) {
          if(await this.timedGameRef.current.gameRef.current.chess.player === 'white') {
            this.props.enqueueSnackbar('White Bot Error, see console for details', {variant: 'error'});
          }
          else {
            this.props.enqueueSnackbar('Black Bot Error, see console for details', {variant: 'error'});
          }
          console.log('Bot encountered error:');
          console.error(err);
        }
      }
      else {
        if(await this.timedGameRef.current.gameRef.current.chess.player === 'white') {
          bw1.compute(await this.timedGameRef.current.gameRef.current.chess.exportFunc('notation'), this.state.botFunc1).then(async (action) => {
            for(var i = 0;i < action.moves.length;i++) {
              await this.timedGameRef.current.gameRef.current.move(action.moves[i]);
            }
            window.setTimeout(() => {
              this.timedGameRef.current.gameRef.current.submit();
            }, 250);
          }).catch((err) => {
            this.props.enqueueSnackbar('White Bot Error, see console for details', {variant: 'error'});
            console.log('Not in debug mode! Error may be cryptic due to web worker processing!');
            console.log('Bot encountered error:');
            console.error(err);
          });
        }
        else {
          bw2.compute(await this.timedGameRef.current.gameRef.current.chess.exportFunc('notation'), this.state.botFunc2).then(async (action) => {
            for(var i = 0;i < action.moves.length;i++) {
              await this.timedGameRef.current.gameRef.current.move(action.moves[i]);
            }
            window.setTimeout(() => {
              this.timedGameRef.current.gameRef.current.submit();
            }, 250);
          }).catch((err) => {
            this.props.enqueueSnackbar('Black Bot Error, see console for details', {variant: 'error'});
            console.log('Not in debug mode! Error may be cryptic due to web worker processing!');
            console.log('Bot encountered error:');
            console.error(err);
          });
        }
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if(!prevState.start && this.state.start) {
      this.compute();
    }
  }
  render() {
    return (
      <>
        <TimedGamePlayer
          ref={this.timedGameRef}
          canControlWhite={false}
          canControlBlack={false}
          backLink='/local'
          modalChildren={
            <>
              <Flex>
                <Text p={2} fontWeight='bold'>White Bot Debug / GPU Mode</Text>
                <Checkbox color='primary' checked={this.state.debug1} onChange={(e) => { this.setState({debug1: e.target.checked}); }} />
              </Flex>
              <Flex>
                <Text p={2} fontWeight='bold'>Black Bot Debug / GPU Mode</Text>
                <Checkbox color='primary' checked={this.state.debug2} onChange={(e) => { this.setState({debug2: e.target.checked}); }} />
              </Flex>
            </>
          }
          onStart={() => {
            this.setState({ start: true });
          }}
          onEnd={(win) => {
            this.setState({ start: false, ended: true });
          }}
          onSubmit={async () => {
            this.compute();
          }}
        />
        <BotImport
          title='Import Bot for Black'
          value={this.state.botFunc2}
          onChange={(text) => {
            this.setState({botFunc2: text});
          }}
        />
        <BotImport
          title='Import Bot for White'
          value={this.state.botFunc1}
          onChange={(text) => {
            this.setState({botFunc1: text});
          }}
        />
      </>
    );
  }
}

export default withSnackbar(LocalComputerOnly);