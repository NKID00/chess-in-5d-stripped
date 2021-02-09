import React from 'react';
import Chess from '5d-chess-js';
import { withRouter } from 'react-router';

import { Box, Flex, Text, Button } from 'rebass';
import TimedGamePlayer from 'components/TimedGamePlayer';
import { withSnackbar } from 'notistack';
import Options from 'Options';
import SessionCard from 'components/network/SessionCard';
import UserCard from 'components/network/UserCard';
import { getUsers } from 'db/Users';

const axios = require('axios');

class NetworkPlayClient extends React.Component {
  timedGameRef = React.createRef();
  state = {
    username: Options.get('name').username,
    isHost: false,
    session: {},
    requestJoin: [],
    status: 'noRequest'
  };
  refresh = false;
  async getSession() {
    try{
      var token = Options.get('name').token;
      var username = Options.get('name').username;
      if(this.props.location.pathname.length > 21) {
        var sessionId = this.props.location.pathname.substring('21');
        var session = (await axios.get(Options.get('server').url + '/sessions/' + sessionId, {
          headers: {
            'Authorization': token
          }
        })).data;
        var isHost = username === session.host;

        var status = 'noRequest';
        if(session.requestJoin.length > 0) {
          status = 'noAccept';
        }
        if(session.white !== null && session.black !== null) {
          status = 'noReady';
        }
        if(session.ready) {
          status = 'noStart';
        }
        if(session.started) {
          status = 'started';
        }
        
        if(this.timedGameRef.current !== null) {
          var chess = this.timedGameRef.current.gameRef.current.chess;
          var changed = false;
          var newActionHistory = session.actionHistory;
          var oldActionHistory = chess.actionHistory;
          var newMoveBuffer = session.moveBuffer;
          var oldMoveBuffer = chess.moveBuffer;

          if(newActionHistory.length !== oldActionHistory.length || newMoveBuffer.length !== oldMoveBuffer.length) {
            changed = true;
          }
          var newChess = new Chess();
          newChess.reset(session.variant);
          for(var i = 0;i < newActionHistory.length;i++) {
            for(var j = 0;j < newActionHistory[i].moves.length;j++) {
              if(!changed && newChess.compare(newActionHistory[i].moves[j], oldActionHistory[i].moves[j], 'move') !== 0) {
                changed = true;
              }
              newChess.move(newActionHistory[i].moves[j]);
            }
            newChess.submit(true);
          }
          for(var i = 0;i < newMoveBuffer.length;i++) { // eslint-disable-line no-redeclare
            if(!changed && newChess.compare(newMoveBuffer[i], oldMoveBuffer[i], 'move') !== 0) {
              changed = true;
            }
            newChess.move(newMoveBuffer[i]);
          }
          if(changed) {
            console.log('State Changed');
            this.timedGameRef.current.gameRef.current.chessState(newChess.state());
          }

          if(
            typeof this.state.session.player === 'string' &&
            !(this.state.isHost && session.host === session.white && session.black === session.white) &&
            session.player === (this.state.isHost ? (session.host === session.white ? 'white' : 'black') : (session.host !== session.white ? 'white' : 'black')) && 
            session.player !== this.state.session.player
          ) {
            this.timedGameRef.current.gameRef.current.submitHowl.volume(Options.get('sound').effect);
            if(this.timedGameRef.current.gameRef.current.submitHowl.volume() > 0) {
              this.timedGameRef.current.gameRef.current.submitHowl.play();
            }
          }
        }
        this.setState({
          username: username,
          isHost: isHost,
          session: session,
          status: status
        });

        if(!isHost) {
          var requestedJoin = session.requestJoin.includes(username);
          if(!requestedJoin) {
            await axios.post(Options.get('server').url + '/sessions/' + sessionId + '/requestJoin', {}, {
              headers: {
                'Authorization': token
              }
            });
          }
        }
        else {
          this.setState({
            requestJoin: (await getUsers()).filter(e => session.requestJoin.includes(e.username))
          });
        }
      }
      if(this.refresh) {
        window.setTimeout(this.getSession.bind(this), 1000);
      }
    }
    catch(err) {
      this.props.enqueueSnackbar('Error occurred, open console for more details!', {variant: 'error'});
      console.error(err);
      if(this.refresh) {
        window.setTimeout(this.getSession.bind(this), 5000);
      }
    }
  }
  componentDidMount() {
    this.getSession();
    this.refresh = true;
  }
  componentWillUnmount() {
    this.refresh = false;
  }
  render() {
    return (
      <>
        <TimedGamePlayer
          ref={this.timedGameRef}
          canControlWhite={this.state.session.white === this.state.username}
          canControlBlack={this.state.session.black === this.state.username}
          whiteName={this.state.session.white}
          blackName={this.state.session.black}
          start={this.state.session.started}
          ended={this.state.session.ended}
          hideAll
          disableLocal
          disableTimed
          disableVariant
          disableStart={this.state.isHost ? this.state.status !== 'noStart' : this.state.status !== 'noReady' && this.state.status !== 'noStart'}
          overrideStart
          startTitle={this.state.isHost ? 'Start' : (this.state.status === 'noStart' ? 'Unready' : 'Ready')}
          timed={this.state.session.timed !== null && typeof this.state.session.timed !== 'undefined'}
          whiteDurationLeft={this.state.session.timed ? this.state.session.timed.whiteDurationLeft : 0 }
          blackDurationLeft={this.state.session.timed ? this.state.session.timed.blackDurationLeft : 0 }
          startingDuration={this.state.session.timed ? this.state.session.timed.startingDuration : 0 }
          perActionFlatIncrement={this.state.session.timed ? this.state.session.timed.perActionFlatIncrement : 0 }
          perActionTimelineIncrement={this.state.session.timed ? this.state.session.timed.perActionTimelineIncrement : 0 }
          onStart={async () => {
            try{
              var token = Options.get('name').token;
              if(this.state.isHost) {
                await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/start', {}, {
                  headers: {
                    'Authorization': token
                  }
                });
              }
              else {
                if(this.state.status === 'noReady') {
                  await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/ready', {}, {
                    headers: {
                      'Authorization': token
                    }
                  });
                }
                else {
                  await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/unready', {}, {
                    headers: {
                      'Authorization': token
                    }
                  });
                }
              }
            }
            catch(err) {
              this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
              console.error(err);
            }
          }}
          onMove={async (moveObj) => {
            try{
              var token = Options.get('name').token;
              await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/move', moveObj, {
                headers: {
                  'Authorization': token
                }
              });
            }
            catch(err) {
              this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
              console.error(err);
            }
          }}
          onUndo={async () => {
            try{
              var token = Options.get('name').token;
              await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/undo', {}, {
                headers: {
                  'Authorization': token
                }
              });
            }
            catch(err) {
              this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
              console.error(err);
            }
          }}
          onSubmit={async () => {
            try{
              var token = Options.get('name').token;
              await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/submit', {}, {
                headers: {
                  'Authorization': token
                }
              });
            }
            catch(err) {
              this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
              console.error(err);
            }
          }}
          modalChildren={
            <>
              <Text p={2} fontWeight='bold'>
                {this.state.status === 'noRequest' ?
                  'Waiting for user to join...'
                : this.state.status === 'noAccept' ?
                  'Waiting for host to accept...'
                : this.state.status === 'noReady' ?
                  'Waiting for non-host player to ready up...'
                : this.state.status === 'noStart' ?
                  'Waiting for host to start session...'
                :
                  ''
                }
              </Text>
              <SessionCard
                session={this.state.session}
                showDetails
              />
              {this.state.isHost && (this.state.session.black === null || this.state.session.white === null) ?
                <>
                  <Text p={2} fontWeight='bold'>Users requesting to join:</Text>
                  {this.state.requestJoin.length > 0 ?
                    this.state.requestJoin.map((user) => {
                      return (
                        <UserCard user={user} key={user.username}>
                          <Flex>
                            <Box mx='auto' />
                            <Button m={1} variant='primary'
                              onClick={async () => {  
                                try{
                                  var token = Options.get('name').token;
                                  await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/addUser', {
                                    username: user.username
                                  }, {
                                    headers: {
                                      'Authorization': token
                                    }
                                  });
                                }
                                catch(err) {
                                  this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
                                  console.error(err);
                                }
                              }}
                            >
                              Accept
                            </Button>
                          </Flex>
                        </UserCard>
                      );
                    })
                  :
                    <Text p={2}>No users right now</Text>
                  }
                </>
              :
                <></>
              }
            </>
          }
          modalBarChildren={
            this.state.isHost ?
              <Button m={1} 
                variant='primary'
                disabled={this.state.status === 'noReady' || this.state.status === 'noStart'}
                onClick={async () => {
                  try {
                    var token = Options.get('name').token;
                    await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/addUser', {
                      username: this.state.username
                    }, {
                      headers: {
                        'Authorization': token
                      }
                    });
                    await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/ready', {}, {
                      headers: {
                        'Authorization': token
                      }
                    });
                    await axios.post(Options.get('server').url + '/sessions/' + this.state.session.id + '/start', {}, {
                      headers: {
                        'Authorization': token
                      }
                    });
                  }
                  catch(err) {
                    this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
                    console.error(err);
                    if(this.refresh) {
                      window.setTimeout(this.getSession.bind(this), 5000);
                    }
                  }
                }}
              >
                Host Spectating Session
              </Button>
            :
              <></>
          }
          backLink='/network/server'
        />
      </>
    );
  }
}

export default withRouter(withSnackbar(NetworkPlayClient));
