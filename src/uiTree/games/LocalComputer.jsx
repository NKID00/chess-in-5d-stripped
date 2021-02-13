import React from 'react';

import { Flex, Text } from 'rebass';
import { withSnackbar } from 'notistack';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import TimedGamePlayer from 'components/TimedGamePlayer';
import BotImport from 'components/BotImport';
import BotWorker from 'workerize-loader!uiTree/games/BotWorker'; // eslint-disable-line import/no-webpack-loader-syntax
const axios = require('axios');

var bw = new BotWorker();

const defaultBot = `(chess) => {
  /*
    Notice: This bot/engine does not play competitively and is only here for demonstration purposes

    This bot picks a random valid action and plays it.

    Go to https://gitlab.com/alexbay218/chess-in-5d for more information on how to create your own bot

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
      var moves = tmpChess.moves('object', true, true, false, true);
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

class LocalComputer extends React.Component {
  timedGameRef = React.createRef();
  botGlobal = {};
  state = {
    start: false,
    ended: false,
    debug: false,
    computer: 'white',
    selectedComputer: 'white',
    botFunc: defaultBot
  };
  async componentDidMount() {
    var str = (await axios.get('https://alexbay218.gitlab.io/neil-engine/bot.js')).data;
    this.setState({
      botFunc: str
    });
  }
  compute() {
    if(!this.state.ended) {
      var timed = null;
      if(this.timedGameRef.current) {
        if(this.timedGameRef.current.state.timed) {
          timed = {
            whiteDurationLeft: this.timedGameRef.current.state.whiteDurationLeft,
            blackDurationLeft: this.timedGameRef.current.state.blackDurationLeft,
            startingDuration: this.timedGameRef.current.state.startingDuration,
            perActionFlatIncrement: this.timedGameRef.current.state.perActionFlatIncrement,
            perActionTimelineIncrement: this.timedGameRef.current.state.perActionTimelineIncrement
          };
        }
      }
      if(this.state.debug) {
        try {
          var botFunc = new Function('chess', 'timed', 'global', 'return ' + this.state.botFunc)(); // eslint-disable-line no-new-func
          var action = botFunc(this.timedGameRef.current.gameRef.current.chess.copy(), timed, this.botGlobal);
          for(var i = 0;i < action.moves.length;i++) {
            this.timedGameRef.current.gameRef.current.move(action.moves[i]);
          }
          window.setTimeout(() => {
            this.timedGameRef.current.gameRef.current.submit();
          }, 250);
        }
        catch(err) {
          this.props.enqueueSnackbar('Bot Error, see console for details', {variant: 'error'});
          console.log('Bot encountered error:');
          console.error(err);
        }
      }
      else {
        bw.compute(this.timedGameRef.current.gameRef.current.chess.state(), timed, this.state.botFunc).then(async (action) => {
          for(var i = 0;i < action.moves.length;i++) {
            this.timedGameRef.current.gameRef.current.move(action.moves[i]);
          }
          window.setTimeout(() => {
            this.timedGameRef.current.gameRef.current.submit();
          }, 250);
        }).catch((err) => {
          this.props.enqueueSnackbar('Bot Error, see console for details', {variant: 'error'});
          console.log('Not in debug mode! Error may be cryptic due to web worker processing!');
          console.log('Bot encountered error:');
          console.error(err);
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedComputer !== this.state.selectedComputer) {
      if(this.state.selectedComputer === 'random') {
        this.setState({computer: Math.random() > 0.5 ? 'white' : 'black'});
      }
      else {
        this.setState({computer: this.state.selectedComputer});
      }
    }
    if(!prevState.start && this.state.start) {
      if(this.timedGameRef.current.gameRef.current.chess.player === this.state.computer) {
        this.compute();
      }
    }
  }
  render() {
    return (
      <>
        <TimedGamePlayer
          ref={this.timedGameRef}
          canControlWhite={this.state.computer !== 'white' && !this.state.ended}
          canControlBlack={this.state.computer === 'white' && !this.state.ended}
          whiteName={this.state.computer === 'white' ? 'Computer' : 'Human'}
          blackName={this.state.computer !== 'white' ? 'Computer' : 'Human'}
          flip={this.state.computer === 'white'}
          winner={this.state.winner}
          variant={this.state.variant}
          backLink='/local'
          modalChildren={
            <>
              <Flex>
                <Text p={2} fontWeight='bold'>Bot Side</Text>
                <Select
                  value={this.state.selectedComputer}
                  onChange={(e) => { this.setState({selectedComputer: e.target.value}); }}
                >
                  <MenuItem value='white'>White</MenuItem>
                  <MenuItem value='black'>Black</MenuItem>
                  <MenuItem value='random'>Random</MenuItem>
                </Select>
              </Flex>
              <Flex>
                <Text p={2} fontWeight='bold'>Debug Mode</Text>
                <Checkbox color='primary' checked={this.state.debug} onChange={(e) => { this.setState({debug: e.target.checked}); }} />
              </Flex>
            </>
          }
          onStart={() => {
            this.setState({ start: true });
          }}
          onEnd={(win) => {
            this.setState({ start: false, ended: true });
          }}
          onSubmit={() => {
            if(this.timedGameRef.current.gameRef.current.chess.player === this.state.computer) {
              this.compute();
            }
          }}
        />
        <BotImport
          value={this.state.botFunc}
          onChange={(text) => {
            this.setState({botFunc: text});
          }}
        />
      </>
    );
  }
}

export default withSnackbar(LocalComputer);
