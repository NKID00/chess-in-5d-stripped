import React from 'react';
import { withRouter } from 'react-router';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Peer from 'peerjs';
import Options from 'Options';

import ClockDisplay from 'components/ClockDisplay';
import LinkButton from 'components/LinkButton';
import GamePlayer from 'components/GamePlayer';

class NetworkClientPrivate extends React.Component {
  clientConnector = null;
  gameRef = React.createRef();
  state = {
    start: false,
    ended: false,
    timed: true,
    connecting: false,
    hostId: '',
    host: 'white',
    hostName: '',
    selectedHost: 'white',
    clientId: '',
    clientName: Options.get('name').username,
    clientConnection: null,
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
  connectToHost() {
    this.setState({connecting: true});
    try {
      var conn = this.clientConnector.connect(
        this.state.hostId,
        {reliable: true}
      );
      conn.on('open', () => {
        if(this.state.clientConnection === null) {
          this.setState({clientConnection: conn});
        }
      });
      conn.on('error', (err) => {
        this.props.enqueueSnackbar('Network error occurred, connection failed! (Retry to continue)', {variant: 'error', persist: true});
        console.error(err);
        this.setState({connecting: false});
      });
      window.setTimeout(() => {
        if(this.state.connecting && this.state.clientConnection === null) {
          this.props.enqueueSnackbar('Network error occurred, connection attempt timed out! (Retry to continue)', {variant: 'error', persist: true});
          this.setState({connecting: false});
        }
      }, 10000);
    }
    catch(err) {
      this.props.enqueueSnackbar('Network error occurred, could not create connection! (Refresh to continue)', {variant: 'error', persist: true});
      console.error(err);
      this.setState({connecting: false});
    }
  }
  initListener() {
    this.state.clientConnection.on('data', (data) => {
      if(data.type === 'sync') {
        this.setState(data.state);
      }
      if(this.gameRef.current.chess.player === this.state.host) {
        if(data.type === 'move') {
          this.gameRef.current.move(data.move, true);
        }
        else if(data.type === 'undo') {
          this.gameRef.current.undo();
        }
        else if(data.type === 'submit') {
          this.gameRef.current.submit();
        }
        else if(data.type === 'import') {
          this.gameRef.current.import(data.import);
        }
      }
    });
    this.state.clientConnection.send({type: 'name', name: this.state.clientName});
  }
  initConnector() {
    if(this.state.clientId === '') {
      try {
        this.clientConnector = new Peer('', Options.get('peerjs'));
        this.clientConnector.on('open', (id) => {
          this.setState({clientId: id});
        });
        window.setTimeout(() => {
          if(this.state.clientId === '') {
            this.clientConnector.destroy();
            this.props.enqueueSnackbar('Network error occurred, could not contact server! (Refresh to retry)', {variant: 'error', persist: true});
          }
        }, 60000);
      }
      catch(err) {
        this.props.enqueueSnackbar('Network error occurred, could not contact server! (Refresh to retry)', {variant: 'error', persist: true});
        console.error(err);
      }
    }
  }
  componentDidMount() {
    var url = new URLSearchParams(this.props.location.search);
    var hostId = url.get('hostid');
    if(hostId !== null) {
      this.setState({hostId: hostId});
    }
    this.initConnector();
  }
  componentWillUnmount() {
    this.clientConnector.destroy();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.start && this.state.start) {
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
    if(prevState.clientConnection === null && this.state.clientConnection !== null) {
      this.initListener();
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
            {this.state.clientConnection === null ?
              this.state.connecting ?
                <Text p={2}><b>Attempting to connect to Host ID:</b> {this.state.hostId}</Text>
              :
                <>
                  <Text p={2} fontWeight='bold'>Host ID</Text>
                  <Box p={2}>
                    <TextField
                      fullWidth
                      value={this.state.hostId}
                      onChange={(e) => {
                        this.setState({ hostId: e.target.value });
                      }}
                    />
                  </Box>
                </>
            :
              <Text p={2}><b>Connected to Host: {this.state.hostName}</b> ({this.state.hostId})</Text>
            }
            {this.state.clientId === '' ?
              <Text p={2} fontWeight='bold'>Creating Client ID...</Text>
            :
              <Flex>
                <Text p={2} fontWeight='bold'>Client ID: </Text>
                <Text p={2}>{this.state.clientId}</Text>
              </Flex>
            }
            <Text p={2} fontWeight='bold'>Player Name</Text>
            <Box p={2}>
              <TextField
                fullWidth
                value={this.state.clientName}
                onChange={(e) => {
                  this.setState({ clientName: e.target.value });
                  if(this.state.clientConnection !== null) {
                    this.state.clientConnection.send({type: 'name', name: e.target.value});
                  }
                }}
              />
            </Box>
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
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary'
              disabled={this.state.clientId === '' || this.state.hostId === '' || this.state.connecting || this.state.clientConnection !== null}
              bg={this.state.clientId === '' || this.state.hostId === '' || this.state.connecting || this.state.clientConnection !== null ? 'grey' : 'blue'}
              onClick={() => {
                this.connectToHost();
              }}
            >
              Connect
            </Button>
          </Flex>
        </Modal>
        <GamePlayer
          ref={this.gameRef}
          canControlWhite={this.state.host !== 'white' && !this.state.ended}
          canControlBlack={this.state.host === 'white' && !this.state.ended}
          winner={this.state.winner}
          onMove={(moveObj) => {
            if(this.gameRef.current.chess.player !== this.state.host) {
              this.state.clientConnection.send({type: 'move', move: moveObj});
            }
          }}
          onUndo={() => {
            if(this.gameRef.current.chess.player !== this.state.host) {
              this.state.clientConnection.send({type: 'undo'});
            }
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
            if(this.gameRef.current.chess.player === this.state.host) {
              this.state.clientConnection.send({type: 'submit'});
            }
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
        </GamePlayer>
      </>
    );
  }
}

const NetworkClientPrivateWithRouter = withRouter(NetworkClientPrivate);
export default withSnackbar(NetworkClientPrivateWithRouter);
