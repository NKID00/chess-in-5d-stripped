import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { withSnackbar } from 'notistack';
import Chess from '5d-chess-js';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ClockDisplay from 'components/ClockDisplay';
import LinkButton from 'components/LinkButton';
import GamePlayer from 'components/GamePlayer';
import BotImport from 'components/BotImport';
import BotWorker from 'workerize-loader!uiTree/games/BotWorker'; // eslint-disable-line import/no-webpack-loader-syntax

const { GPU } = require('gpu.js');

var bw = new BotWorker();

const defaultBot = '' +
'(Chess, chessInstance) => {\n' +
'  /*\n' +
'    Notice: This bot/engine does not play competitively and is only here for demonstration purposes\n' +
'\n' +
'    This bot picks a random valid action and plays it.\n' +
'\n' +
'    Go to https://gitlab.com/alexbay218/chess-in-5d for more information on how to create your own bot\n' +
'\n' +
'    In the future, a better default bot will replace this one.\n' +
'  */\n' +
'  var action = {\n' +
'    action: chessInstance.actionNumber,\n' +
'    player: chessInstance.player,\n' +
'    moves: []\n' +
'  };\n' +
'  var actionMoves = [];\n' +
'  var valid = false;\n' +
'  while(!valid) {\n' +
'    actionMoves = [];\n' +
'    var submit = false;\n' +
'    var tmpChess = new Chess(chessInstance.export());\n' +
'    while(!submit) {\n' +
'      var moves = tmpChess.moves(\'object\', true, true, true);\n' +
'      if(moves.length > 0) {\n' +
'        var move = moves[Math.floor(Math.random() * moves.length)];\n' +
'        actionMoves.push(move);\n' +
'        tmpChess.move(move);\n' +
'      }\n' +
'      else {\n' +
'        submit = true;\n' +
'      }\n' +
'    }\n' +
'    if(!tmpChess.inCheck) {\n' +
'      valid = true;\n' +
'    }\n' +
'  }\n' +
'  action.moves = actionMoves;\n' +
'  console.log(\'Random Bot is making action: \' + JSON.stringify(action));\n' +
'  return action;\n' +
'};';

class LocalComputer extends React.Component {
  gameRef = React.createRef();
  botGlobal = {};
  state = {
    start: false,
    ended: false,
    timed: false,
    debug: false,
    computer: 'white',
    selectedComputer: 'white',
    botFunc: defaultBot,
    startingDuration: 10*60,
    perActionFlatIncrement: 0,
    perActionTimelineIncrement: 5,
    whiteDurationLeft: 0,
    blackDurationLeft: 0,
    winner: ''
  };
  lastUpdate = Date.now();
  async update() {
    if(this.state.start && this.gameRef.current) {
      if((await this.gameRef.current.chess.player()) === 'white') {
        this.setState({
          whiteDurationLeft: this.state.whiteDurationLeft - (Date.now() - this.lastUpdate)/1000
        });
      }
      else {
        this.setState({
          blackDurationLeft: this.state.blackDurationLeft - (Date.now() - this.lastUpdate)/1000
        });
      }
      this.lastUpdate = Date.now();
      window.setTimeout(this.update.bind(this), 1000);
    }
  }
  async compute() {
    if(this.state.debug) {
      try {
        var botFunc = new Function('Chess', 'chessInstance', 'GPU', 'global', 'return ' + this.state.botFunc)(); // eslint-disable-line no-new-func
        var action = botFunc(Chess, new Chess(await this.gameRef.current.chess.exportFunc()), GPU, this.botGlobal);
        for(var i = 0;i < action.moves.length;i++) {
          await this.gameRef.current.move(action.moves[i]);
        }
        window.setTimeout(() => {
          this.gameRef.current.submit();
        }, 250);
      }
      catch(err) {
        this.props.enqueueSnackbar('Bot Error, see console for details', {variant: 'error'});
        console.log('Bot encountered error:');
        console.error(err);
      }
    }
    else {
      bw.compute(await this.gameRef.current.chess.exportFunc('notation'), this.state.botFunc).then(async (action) => {
        if(!this.state.ended) {
          for(var i = 0;i < action.moves.length;i++) {
            await this.gameRef.current.move(action.moves[i]);
          }
          window.setTimeout(() => {
            this.gameRef.current.submit();
          }, 250);
        }
      }).catch((err) => {
        this.props.enqueueSnackbar('Bot Error, see console for details', {variant: 'error'});
        console.log('Not in debug mode! Error may be cryptic due to web worker processing!');
        console.log('Bot encountered error:');
        console.error(err);
      });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedComputer !== this.state.selectedComputer) {
      if(this.state.selectedComputer === 'random') {
        this.setState({computer: Math.random > 0.5 ? 'white' : 'black'});
      }
      else {
        this.setState({computer: this.state.selectedComputer});
      }
    }
    if(!prevState.start && this.state.start) {
      if(await this.gameRef.current.chess.player() === this.state.computer) {
        await this.compute();
      }
      this.lastUpdate = Date.now();
      this.update();
    }
    if(this.state.start) {
      if(this.state.whiteDurationLeft <= 0) {
        this.setState({
          start: false,
          ended: true,
          winner: 'black',
          whiteDurationLeft: 0
        });
      }
      if(this.state.blackDurationLeft <= 0) {
        this.setState({
          start: false,
          ended: true,
          winner: 'white',
          blackDurationLeft: 0
        });
      }
    }
  }
  render() {
    return (
      <>
        <Modal
          isOpen={!this.state.start && !this.state.ended}
          style={{content: {padding: '0px'}}}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            width={1}
            sx={{position: 'absolute', top: 0, zIndex: 100}}
          >
            <Text p={2} fontWeight='bold'>Settings</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <Flex>
              <Text p={2} fontWeight='bold'>Timed Game</Text>
              <Checkbox color='primary' checked={this.state.timed} onChange={(e) => { this.setState({timed: e.target.checked}); }} />
            </Flex>
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
              <Text p={2} fontWeight='bold'>Debug / GPU Mode</Text>
              <Checkbox color='primary' checked={this.state.debug} onChange={(e) => { this.setState({debug: e.target.checked}); }} />
            </Flex>
            {this.state.timed ?
              <>
                <Text p={2} fontWeight='bold'>Initial Duration</Text>
                <Flex>
                  <Box width={[1/2, 1/3, 1/4]} p={2}>
                    <TextField
                      fullWidth
                      label='Minutes'
                      type='number'
                      value={Math.floor(this.state.startingDuration/60)}
                      onChange={(e) => {
                        this.setState({ startingDuration: Number(e.target.value) * 60 + (this.state.startingDuration % 60) });
                      }}
                    />
                  </Box>
                  <Box width={[1/2, 1/3, 1/4]} p={2}>
                    <TextField
                      fullWidth
                      label='Seconds'
                      type='number'
                      value={this.state.startingDuration % 60}
                      onChange={(e) => {
                        this.setState({ startingDuration: Number(e.target.value) + Math.floor(this.state.startingDuration/60) * 60 });
                      }}
                    />
                  </Box>
                </Flex>
                <Text p={2} fontWeight='bold'>Per Action Increment (Flat)</Text>
                <Flex>
                  <Box width={[1/2, 1/3, 1/4]} p={2}>
                    <TextField
                      fullWidth
                      label='Minutes'
                      type='number'
                      value={Math.floor(this.state.perActionFlatIncrement/60)}
                      onChange={(e) => {
                        this.setState({ perActionFlatIncrement: Number(e.target.value) * 60 + (this.state.perActionFlatIncrement % 60) });
                      }}
                    />
                  </Box>
                  <Box width={[1/2, 1/3, 1/4]} p={2}>
                    <TextField
                      fullWidth
                      label='Seconds'
                      type='number'
                      value={this.state.perActionFlatIncrement % 60}
                      onChange={(e) => {
                        this.setState({ perActionFlatIncrement: Number(e.target.value) + Math.floor(this.state.perActionFlatIncrement/60) * 60 });
                      }}
                    />
                  </Box>
                </Flex>
                <Text p={2} fontWeight='bold'>Per Action Increment (Per Present Timeline)</Text>
                <Flex>
                  <Box width={[1/2, 1/3, 1/4]} p={2}>
                    <TextField
                      fullWidth
                      label='Minutes'
                      type='number'
                      value={Math.floor(this.state.perActionTimelineIncrement/60)}
                      onChange={(e) => {
                        this.setState({ perActionTimelineIncrement: Number(e.target.value) * 60 + (this.state.perActionTimelineIncrement % 60) });
                      }}
                    />
                  </Box>
                  <Box width={[1/2, 1/3, 1/4]} p={2}>
                    <TextField
                      fullWidth
                      label='Seconds'
                      type='number'
                      value={this.state.perActionTimelineIncrement % 60}
                      onChange={(e) => {
                        this.setState({ perActionTimelineIncrement: Number(e.target.value) + Math.floor(this.state.perActionTimelineIncrement/60) * 60 });
                      }}
                    />
                  </Box>
                </Flex>
              </>
            :
             <></>
            }
          </Box>
          <Flex
            p={2}
            alignItems='center'
            bg='white'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <LinkButton
              to='/local'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary' onClick={() => {
              this.setState({
                start: true,
                whiteDurationLeft: this.state.startingDuration + this.state.perActionFlatIncrement + this.state.perActionTimelineIncrement,
                blackDurationLeft: this.state.startingDuration
              });
            }}>Start</Button>
          </Flex>
        </Modal>
        <BotImport
          value={this.state.botFunc}
          onImport={(text) => {
            this.setState({botFunc: text});
          }}
        />
        <GamePlayer
          ref={this.gameRef}
          canControlWhite={this.state.computer !== 'white' && !this.state.ended}
          canControlBlack={this.state.computer === 'white' && !this.state.ended}
          whiteName={this.state.computer === 'white' ? 'Computer' : 'Human'}
          blackName={this.state.computer !== 'white' ? 'Computer' : 'Human'}
          winner={this.state.winner}
          onEnd={(win) => {
            this.setState({ start: false, ended: true });
          }}
          onSubmit={async () => {
            if(await this.gameRef.current.chess.player() === 'white') {
              this.setState({
                whiteDurationLeft: this.state.whiteDurationLeft +
                this.state.perActionFlatIncrement +
                this.state.perActionTimelineIncrement * (await this.gameRef.current.chess.board()).timelines.filter((e) => { return e.present; }).length
              });
            }
            else {
              this.setState({
                blackDurationLeft: this.state.blackDurationLeft +
                this.state.perActionFlatIncrement +
                this.state.perActionTimelineIncrement * (await this.gameRef.current.chess.board()).timelines.filter((e) => { return e.present; }).length
              });
            }
            if(await this.gameRef.current.chess.player() === this.state.computer) {
              this.compute();
            }
          }}
        >
          {this.state.timed ?
            <ClockDisplay
              whiteDurationLeft={this.state.whiteDurationLeft}
              blackDurationLeft={this.state.blackDurationLeft}
            />
          :
            <></>
          }
        </GamePlayer>
      </>
    );
  }
}

export default withSnackbar(LocalComputer);
