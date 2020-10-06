import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { withSnackbar } from 'notistack';
import Chess from '5d-chess-js';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import BotImport from 'components/BotImport';
import LinkButton from 'components/LinkButton';
import GamePlayer from 'components/GamePlayer';
import RandomBot from 'components/RandomBot';
import BotWorker from 'workerize-loader!uiTree/games/BotWorker'; // eslint-disable-line import/no-webpack-loader-syntax

var bw = new BotWorker();

class LocalComputer extends React.Component {
  gameRef = React.createRef();
  state = {
    start: false,
    ended: false,
    timed: false,
    debug: false,
    computer: 'white',
    selectedComputer: 'white',
    botFunc: RandomBot.toString(),
    startingDuration: 10*60,
    perActionFlatIncrement: 0,
    perActionTimelineIncrement: 5,
    whiteDurationLeft: 0,
    blackDurationLeft: 0,
    winner: ''
  };
  lastUpdate = Date.now();
  update() {
    if(this.state.start && this.gameRef.current) {
      if(this.gameRef.current.chess.player === 'white') {
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
  compute() {
    if(this.state.debug) {
      try {
        var botFunc = new Function('Chess', 'chessInstance', 'return ' + this.state.botFunc)(); // eslint-disable-line no-new-func
        var action = botFunc(Chess, new Chess(this.gameRef.current.chess.export()));
        for(var i = 0;i < action.moves.length;i++) {
          this.gameRef.current.move(action.moves[i]);
        }
        this.gameRef.current.submit();
      }
      catch(err) {
        this.props.enqueueSnackbar('Bot Error, see console for details', {variant: 'error'});
        console.log('Bot encountered error:');
        console.error(err);
      }
    }
    else {
      bw.compute(this.gameRef.current.chess.export('notation'), this.state.botFunc).then((action) => {
        if(!this.state.ended) {
          for(var i = 0;i < action.moves.length;i++) {
            this.gameRef.current.move(action.moves[i]);
          }
          window.setTimeout(() => {
            this.gameRef.current.submit();
          }, 500);
        }
      }).catch((err) => {
        this.props.enqueueSnackbar('Bot Error, see console for details', {variant: 'error'});
        console.log('Not in debug mode! Error may be cryptic due to web worker processing!');
        console.log('Bot encountered error:');
        console.error(err);
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedComputer !== this.state.selectedComputer) {
      if(this.state.selectedComputer === 'random') {
        this.setState({computer: Math.random > 0.5 ? 'white' : 'black'});
      }
      else {
        this.setState({computer: this.state.selectedComputer});
      }
    }
    if(!prevState.start && this.state.start) {
      if(this.gameRef.current.chess.player === this.state.computer) {
        this.compute();
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
              <Text p={2} fontWeight='bold'>Debug Mode</Text>
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
        <GamePlayer
          ref={this.gameRef}
          canControlWhite={this.state.computer !== 'white' && !this.state.ended}
          canControlBlack={this.state.computer === 'white' && !this.state.ended}
          winner={this.state.winner}
          onEnd={(win) => {
            this.setState({ start: false, ended: true });
          }}
          onSubmit={() => {
            if(this.gameRef.current.chess.player === 'white') {
              this.setState({
                whiteDurationLeft: this.state.whiteDurationLeft +
                this.state.perActionFlatIncrement +
                this.state.perActionTimelineIncrement * this.gameRef.current.chess.board.timelines.filter((e) => { return e.present; }).length
              });
            }
            else {
              this.setState({
                blackDurationLeft: this.state.blackDurationLeft +
                this.state.perActionFlatIncrement +
                this.state.perActionTimelineIncrement * this.gameRef.current.chess.board.timelines.filter((e) => { return e.present; }).length
              });
            }
            if(this.gameRef.current.chess.player === this.state.computer) {
              this.compute();
            }
          }}
        >
          {this.state.timed ?
            <>
              <Button
                bg='white'
                color='black'
                mx={1}
              >
                {
                  Math.floor(this.state.whiteDurationLeft / 60).toFixed().padStart(2, '0') +
                  ':' +
                  (this.state.whiteDurationLeft % 60).toFixed().padStart(2, '0')
                }
              </Button>
              <Button
                bg='black'
                color='white'
                mx={1}
              >
                {
                  Math.floor(this.state.blackDurationLeft / 60).toFixed().padStart(2, '0') +
                  ':' +
                  (this.state.blackDurationLeft % 60).toFixed().padStart(2, '0')
                }
              </Button>
            </>
          :
            <></>
          }
        </GamePlayer>
        <BotImport
          value={this.state.botFunc}
          onImport={(text) => {
            this.setState({botFunc: text});
          }}
        />
      </>
    );
  }
}

export default withSnackbar(LocalComputer);
