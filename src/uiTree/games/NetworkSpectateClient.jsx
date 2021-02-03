import React from 'react';
import Chess from '5d-chess-js';
import { withRouter } from 'react-router';

import { Text } from 'rebass';
import TimedGamePlayer from 'components/TimedGamePlayer';
import { withSnackbar } from 'notistack';
import Options from 'Options';
import SessionCard from 'components/network/SessionCard';

const axios = require('axios');

class NetworkSpectateClient extends React.Component {
  timedGameRef = React.createRef();
  state = {
    username: Options.get('name').username,
    isHost: false,
    session: {}
  };
  refresh = false;
  async getSession() {
    try{
      var token = Options.get('name').token;
      var username = Options.get('name').username;
      if(this.props.location.pathname.length > 25) {
        var sessionId = this.props.location.pathname.substring('25');
        var session = (await axios.get(Options.get('server').url + '/sessions/' + sessionId, {
          headers: {
            'Authorization': token
          }
        })).data;
        var isHost = username === session.host;
        
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
          session: session
        });
      }
      if(this.refresh) {
        window.setTimeout(this.getSession.bind(this), 500);
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
      <TimedGamePlayer
        ref={this.timedGameRef}
        start={this.state.session.started}
        ended={this.state.session.ended}
        whiteName={this.state.session.white}
        blackName={this.state.session.black}
        canControlWhite={false}
        canControlBlack={false}
        disableTimed
        disableVariant
        disableStart
        overrideStart
        timed={this.state.session.timed !== null && typeof this.state.session.timed !== 'undefined'}
        whiteDurationLeft={this.state.session.timed ? this.state.session.timed.whiteDurationLeft : 0 }
        blackDurationLeft={this.state.session.timed ? this.state.session.timed.blackDurationLeft : 0 }
        startingDuration={this.state.session.timed ? this.state.session.timed.startingDuration : 0 }
        perActionFlatIncrement={this.state.session.timed ? this.state.session.timed.perActionFlatIncrement : 0 }
        perActionTimelineIncrement={this.state.session.timed ? this.state.session.timed.perActionTimelineIncrement : 0 }
        modalChildren={
          <>
            <Text p={2} fontWeight='bold'>Waiting for session to start...</Text>
            <SessionCard
              session={this.state.session}
              showDetails
            />
          </>
        }
        backLink='/network/server'
      />
    );
  }
}

export default withRouter(withSnackbar(NetworkSpectateClient));
