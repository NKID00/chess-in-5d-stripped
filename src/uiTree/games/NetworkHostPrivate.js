import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import copy from 'copy-to-clipboard';
import Peer from 'peerjs';
import Options from 'Options';

import ClockDisplay from 'components/ClockDisplay';
import LinkButton from 'components/LinkButton';
import GamePlayer from 'components/GamePlayer';
import Chat from 'components/Chat';

class NetworkHostPrivate extends React.Component {
  hostConnector = null;
  gameRef = React.createRef();
  state = {
    start: false,
    ended: false,
    timed: true,
    hostId: '',
    host: 'white',
    hostName: Options.get('name').username,
    hostConnection: null,
    selectedHost: 'white',
    clientId: '',
    clientName: '',
    startingDuration: 10*60,
    perActionFlatIncrement: 0,
    perActionTimelineIncrement: 5,
    whiteDurationLeft: 0,
    blackDurationLeft: 0,
    winner: '',
    variant: 'standard',
    chat: [],
    heartbeat: 0
  };
  lastUpdate = Date.now();
  async update() {
    if(this.state.start && this.gameRef.current && this.state.timed) {
      if(!this.gameRef.current.state.loading) {
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
      }
      this.lastUpdate = Date.now();
      window.setTimeout(this.update.bind(this), 1000);
    }
  }
  sendChat(str) {
    if(this.state.hostConnection !== null) {
      this.state.hostConnection.send({type: 'chat', string: str});
      var chat = this.state.chat;
      chat.push({
        source: 'host',
        string: str
      });
      this.setState({chat: chat});
    }
  }
  sync() {
    this.state.hostConnection.send({
      type: 'sync',
      state: {
        start: this.state.start,
        ended: this.state.ended,
        timed: this.state.timed,
        host: this.state.host,
        selectedHost: this.state.selectedHost,
        clientName: this.state.clientName,
        hostName: this.state.hostName,
        startingDuration: this.state.startingDuration,
        perActionFlatIncrement: this.state.perActionFlatIncrement,
        perActionTimelineIncrement: this.state.perActionTimelineIncrement,
        whiteDurationLeft: this.state.whiteDurationLeft,
        blackDurationLeft: this.state.blackDurationLeft,
        variant: this.state.variant
      }
    });
  }
  initListener() {
    this.state.hostConnection.on('data', async (data) => {
      if(data.type === 'name') {
        this.setState({clientName: data.name});
      }
      else if(data.type === 'chat') {
        var chat = this.state.chat;
        chat.push({
          source: 'client',
          string: data.string
        });
        this.setState({chat: chat});
      }
      else if(data.type === 'heartbeat') {
        this.setState({heartbeat: Date.now()});
      }
      if(await this.gameRef.current.chess.player() !== this.state.host) {
        try {
          if(data.type === 'move') {
            this.gameRef.current.move(data.move, true);
          }
          else if(data.type === 'undo') {
            this.gameRef.current.undo();
          }
          else if(data.type === 'submit') {
            this.gameRef.current.submit();
          }
        }
        catch(err) {
          this.props.enqueueSnackbar('Error occurred, client performed invalid action!', {variant: 'error'});
          console.error(err);
        }
      }
      this.sync();
    });
    this.state.hostConnection.on('close', () => {
      if(!this.state.ended) {
        this.props.enqueueSnackbar('Network error occurred, client disconnected!', {variant: 'error', persist: true});
        this.setState({hostConnection: null});
      }
    });
    this.sync();
    window.setInterval(() => {
      if(Date.now() - this.state.heartbeat > 3000 && !this.state.ended && this.state.hostConnection !== null) {
        this.props.enqueueSnackbar('Network error occurred, client disconnected!', {variant: 'error', persist: true});
        this.hostConnector.destroy();
        this.setState({hostConnection: null});
      }
    }, 3000);
    window.setInterval(() => {
      if(this.state.hostConnection !== null) {
        this.state.hostConnection.send({type: 'heartbeat'});
      }
    }, 1000);
  }
  initConnector() {
    if(this.state.hostId === '') {
      this.hostConnector = new Peer('', Options.get('peerjs'));
      this.hostConnector.on('open', (id) => {
        this.setState({hostId: id});
      });
      this.hostConnector.on('connection', (conn) => {
        conn.on('open', () => {
          this.setState({hostConnection: conn, clientId: conn.peer});
        });
      });
      this.hostConnector.on('error', () => {
        if(!this.state.ended) {
          this.props.enqueueSnackbar('Network error occurred, could not connect to server!', {variant: 'error', persist: true});
          this.hostConnector.destroy();
        }
      });
      window.setTimeout(() => {
        if(this.state.hostId === '') {
          this.hostConnector.destroy();
          this.props.enqueueSnackbar('Network error occurred, could not contact server! (Refresh to retry)', {variant: 'error', persist: true});
        }
      }, 60000);
    }
  }
  componentDidMount() {
    this.initConnector();
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedHost !== this.state.selectedHost) {
      if(this.state.selectedHost === 'random') {
        this.setState({host: Math.random > 0.5 ? 'white' : 'black'});
      }
      else {
        this.setState({host: this.state.selectedHost});
      }
      this.sync();
    }
    if(!prevState.start && this.state.start) {
      this.sync();
      this.lastUpdate = Date.now();
      this.update();
    }
    if(!prevState.ended && this.state.ended) {
      this.state.hostConnection.close();
    }
    if(this.state.start && this.state.timed) {
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
    if(prevState.hostConnection === null && this.state.hostConnection !== null) {
      this.initListener();
    }
    if(prevState.timed !== this.state.timed ||
      prevState.startingDuration !== this.state.startingDuration ||
      prevState.perActionFlatIncrement !== this.state.perActionFlatIncrement ||
      prevState.perActionTimelineIncrement !== this.state.perActionTimelineIncrement
    ) {
      this.sync();
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
            {this.state.hostConnection === null ?
              <></>
            :
              <Text p={2}><b>Connected to Client ID: {this.state.clientName}</b> ({this.state.clientId})</Text>
            }
            {this.state.hostId === '' ?
              <Text p={2} fontWeight='bold'>Creating Host ID...</Text>
            :
              <>
                <Flex>
                  <Text p={2} fontWeight='bold'>Host ID: </Text>
                  <Text
                    p={2}
                    sx={{
                      WebkitTouchCallout: 'all',
                      WebkitUserSelect: 'all',
                      KhtmlUserSelect: 'all',
                      MozUserSelect: 'all',
                      MsUserSelect: 'all',
                      userSelect: 'all'
                    }}
                  >
                    {this.state.hostId}
                  </Text>
                </Flex>
                <Flex>
                  <Text p={2} fontWeight='bold'>Link: </Text>
                  <Text p={2}>
                    <a
                      target='_blank'
                      href={window.location.origin + '/#/network/game/client?hostid=' + this.state.hostId}
                      rel='noopener noreferrer'
                    >
                      {window.location.origin + '/#/network/game/client?hostid=' + this.state.hostId}
                    </a>
                  </Text>
                </Flex>
              </>
            }
            <Text p={2} fontWeight='bold'>Player Name</Text>
            <Box p={2}>
              <TextField
                fullWidth
                value={this.state.hostName}
                onChange={(e) => {
                  this.setState({ hostName: e.target.value });
                  Options.set('name', {username: e.target.value});
                }}
              />
            </Box>
            <Flex>
              <Text p={2} fontWeight='bold'>Variant</Text>
              <Select
                value={this.state.variant}
                onChange={(e) => { this.setState({variant: e.target.value}); }}
              >
                <MenuItem value='standard'>Standard</MenuItem>
                <MenuItem value='defended_pawn'>Defended Pawn</MenuItem>
                <MenuItem value='half_reflected'>Half Reflected</MenuItem>
              </Select>
            </Flex>
            <Flex>
              <Text p={2} fontWeight='bold'>Host Side</Text>
              <Select
                value={this.state.selectedHost}
                onChange={(e) => { this.setState({selectedHost: e.target.value}); }}
              >
                <MenuItem value='white'>White</MenuItem>
                <MenuItem value='black'>Black</MenuItem>
                <MenuItem value='random'>Random</MenuItem>
              </Select>
            </Flex>
            <Flex>
              <Text p={2} fontWeight='bold'>Timed Game</Text>
              <Checkbox color='primary' checked={this.state.timed} onChange={(e) => { this.setState({timed: e.target.checked}); }} />
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
              to='/network'
              variant='secondary'
              m={1}
              onClick={() => {
                if(this.state.hostConnection !== null) {
                  this.state.hostConnection.close();
                }
                if(this.hostConnector !== null) {
                  this.hostConnector.destroy();
                }
              }}
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary'
              disabled={this.state.hostId === ''}
              bg={this.state.hostId === '' ? 'grey' : 'blue'}
              onClick={() => {
                copy(window.location.origin + '/#/network/game/client?hostid=' + this.state.hostId);
              }}
            >
              Copy link to clipboard
            </Button>
            <Button m={1} variant='primary'
              disabled={this.state.hostConnection === null}
              bg={this.state.hostConnection === null ? 'grey' : 'blue'}
              onClick={() => {
                this.setState({
                  start: true,
                  whiteDurationLeft: this.state.startingDuration + this.state.perActionFlatIncrement + this.state.perActionTimelineIncrement,
                  blackDurationLeft: this.state.startingDuration
                });
              }
            }>Start</Button>
          </Flex>
        </Modal>
        <GamePlayer
          ref={this.gameRef}
          canImport
          canControlWhite={this.state.host === 'white' && !this.state.ended}
          canControlBlack={this.state.host !== 'white' && !this.state.ended}
          whiteName={this.state.host === 'white' ? this.state.hostName : this.state.clientName}
          blackName={this.state.host !== 'white' ? this.state.hostName : this.state.clientName}
          flip={this.state.host !== 'white'}
          winner={this.state.winner}
          variant={this.state.variant}
          onImport={(input) => {
            this.state.hostConnection.send({type: 'import', input: input});
            this.sync();
          }}
          onMove={async (moveObj) => {
            if(await this.gameRef.current.chess.player() === this.state.host) {
              this.state.hostConnection.send({type: 'move', move: moveObj});
            }
            this.sync();
          }}
          onUndo={async () => {
            if(await this.gameRef.current.chess.player() === this.state.host) {
              this.state.hostConnection.send({type: 'undo'});
            }
            this.sync();
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
            if(await this.gameRef.current.chess.player() !== this.state.host) {
              this.state.hostConnection.send({type: 'submit'});
            }
            this.sync();
          }}
          onEnd={(win) => {
            this.setState({ start: false, ended: true });
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
          <Chat
            sendChat={(str) => { this.sendChat(str); }}
            chat={this.state.chat}
            hostName={this.state.hostName}
            clientName={this.state.clientName}
          />
        </GamePlayer>
      </>
    );
  }
}

export default withSnackbar(NetworkHostPrivate);
