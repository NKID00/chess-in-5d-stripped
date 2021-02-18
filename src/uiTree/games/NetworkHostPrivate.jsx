import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import copy from 'copy-to-clipboard';
import Peer from 'peerjs';
import Options from 'Options';

import TimedGamePlayer from 'components/TimedGamePlayer';
import Chat from 'components/Chat';

class NetworkHostPrivate extends React.Component {
  hostConnector = null;
  timedGameRef = React.createRef();
  state = {
    start: false,
    ended: false,
    hostId: '',
    host: 'white',
    hostName: Options.get('name').username,
    hostConnection: null,
    selectedHost: 'white',
    clientId: '',
    clientName: '',
    chat: [],
    heartbeat: 0,
    winner: '',
    variant: 'standard',
    fog: false
  };
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
        timed: this.timedGameRef.current.state.timed,
        host: this.state.host,
        selectedHost: this.state.selectedHost,
        clientName: this.state.clientName,
        hostName: this.state.hostName,
        startingDuration: this.timedGameRef.current.state.startingDuration,
        perActionFlatIncrement: this.timedGameRef.current.state.perActionFlatIncrement,
        perActionTimelineIncrement: this.timedGameRef.current.state.perActionTimelineIncrement,
        whiteDurationLeft: this.timedGameRef.current.state.whiteDurationLeft,
        blackDurationLeft: this.timedGameRef.current.state.blackDurationLeft,
        variant: this.timedGameRef.current.state.variant,
        winner: this.timedGameRef.current.state.winner,
        fog: this.state.fog
      }
    });
  }
  initListener() {
    this.state.hostConnection.on('data', async (data) => {
      if(data.type === 'name') {
        this.setState({clientName: data.name});
      }
      else if(data.type === 'fog') {
        this.setState({ start: false, ended: true, winner: this.state.host, fog: false });
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
      if(await this.timedGameRef.current.gameRef.current.chess.player !== this.state.host) {
        try {
          if(data.type === 'move') {
            this.timedGameRef.current.gameRef.current.move(data.move, true);
          }
          else if(data.type === 'undo') {
            this.timedGameRef.current.gameRef.current.undo();
          }
          else if(data.type === 'submit') {
            this.timedGameRef.current.gameRef.current.submit();
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
      if(Date.now() - this.state.heartbeat > 10000 && !this.state.ended && this.state.hostConnection !== null) {
        this.props.enqueueSnackbar('Network error occurred, client disconnected!', {variant: 'error', persist: true});
        this.hostConnector.destroy();
        this.setState({hostConnection: null});
      }
    }, 10000);
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
    }
    if(!prevState.ended && this.state.ended) {
      this.state.hostConnection.close();
    }
    if(prevState.hostConnection === null && this.state.hostConnection !== null) {
      this.initListener();
    }
  }
  render() {
    return (
      <TimedGamePlayer
        ref={this.timedGameRef}
        canImport
        canControlWhite={this.state.host === 'white' && !this.state.ended}
        canControlBlack={this.state.host !== 'white' && !this.state.ended}
        whiteName={this.state.host === 'white' ? this.state.hostName : this.state.clientName}
        blackName={this.state.host !== 'white' ? this.state.hostName : this.state.clientName}
        flip={this.state.host !== 'white'}
        start={this.state.start}
        ended={this.state.ended}
        backLink='/network'
        fog={this.state.fog}
        onBack={() => {
          if(this.state.hostConnection !== null) {
            this.state.hostConnection.close();
          }
          if(this.hostConnector !== null) {
            this.hostConnector.destroy();
          }
        }}
        modalBarChildren={
          <Button m={1} variant='primary'
            disabled={this.state.hostId === ''}
            bg={this.state.hostId === '' ? 'grey' : 'blue'}
            onClick={() => {
              copy(window.location.origin + '/#/network/game/client?hostid=' + this.state.hostId);
            }}
          >
            Copy link to clipboard
          </Button>
        }
        modalChildren={
          <>
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
              <Text p={2} fontWeight='bold'>Fog of War</Text>
              <Checkbox color='primary'
                checked={this.state.fog}
                onChange={(e) => {
                  this.setState({fog: e.target.checked});
                  this.sync();
                }}
              />
            </Flex>
          </>
        }
        onImport={(input) => {
          this.state.hostConnection.send({type: 'import', input: input});
          this.sync();
        }}
        onMove={async (moveObj) => {
          if(await this.timedGameRef.current.gameRef.current.chess.player === this.state.host) {
            this.state.hostConnection.send({type: 'move', move: moveObj});
          }
          this.sync();
        }}
        onUndo={async () => {
          if(await this.timedGameRef.current.gameRef.current.chess.player === this.state.host) {
            this.state.hostConnection.send({type: 'undo'});
          }
          this.sync();
        }}
        onSubmit={async () => {
          if(await this.timedGameRef.current.gameRef.current.chess.player === 'white') {
            this.setState({
              whiteDurationLeft: this.timedGameRef.current.state.whiteDurationLeft +
              this.timedGameRef.current.state.perActionFlatIncrement +
              this.timedGameRef.current.state.perActionTimelineIncrement * (await this.timedGameRef.current.gameRef.current.chess.board).timelines.filter((e) => { return e.present; }).length
            });
          }
          else {
            this.setState({
              blackDurationLeft: this.timedGameRef.current.state.blackDurationLeft +
              this.timedGameRef.current.state.perActionFlatIncrement +
              this.timedGameRef.current.state.perActionTimelineIncrement * (await this.timedGameRef.current.gameRef.current.chess.board).timelines.filter((e) => { return e.present; }).length
            });
          }
          if(await this.timedGameRef.current.gameRef.current.chess.player !== this.state.host) {
            this.state.hostConnection.send({type: 'submit'});
          }
          this.sync();
        }}
        onEnd={(win) => {
          this.setState({ start: false, ended: true });
        }}
        disableStart={this.state.hostConnection === null}
        onStart={() => {
          this.setState({ start: true });
        }}
        onFogEnd={(player) => {
          if(this.state.hostConnection !== null) {
            this.state.hostConnection.send({type: 'fog', name: player});
          }
          window.setTimeout(() => {
            this.setState({ start: false, ended: true, fog: false });
          }, 1000);
        }}
      >
        <Chat
          sendChat={(str) => { this.sendChat(str); }}
          chat={this.state.chat}
          hostName={this.state.hostName}
          clientName={this.state.clientName}
        />
      </TimedGamePlayer>
    );
  }
}

export default withSnackbar(NetworkHostPrivate);
