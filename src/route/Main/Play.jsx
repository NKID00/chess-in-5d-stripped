import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import Player from 'components/Player';
import WaitModal from 'route/Main/Play/WaitModal';

import SessionManager from 'state/SessionManager';

import * as SessionInfo from 'utils/SessionInfo';

//TODO add autoRecenter to network moves
class Play extends React.Component {
  sessionManager = new SessionManager();
  state = {
    board: null,
    loading: true
  };
  componentDidMount() {
    //Listen for board changes
    this.boardListener = this.sessionManager.on('onBoardUpdate', async (boardData) => {
      this.setState(boardData);
    });
    //Listen for clock changes
    this.clockListener = this.sessionManager.on('onClockUpdate', (clockData) => {
      this.setState({
        allowClock: this.sessionManager.session.timed !== null,
        clockActive: this.sessionManager.session.timed !== null && this.sessionManager.session.timed.running,
        clockWhiteTimeLeft: clockData.whiteDurationLeft,
        clockWhiteDelayLeft: clockData.whiteDelayLeft,
        clockBlackTimeLeft: clockData.blackDurationLeft,
        clockBlackDelayLeft: clockData.blackDelayLeft,
      });
    });
    //Listen for session end changes
    this.endListener = this.sessionManager.on('onEnd', async (endData) => {
      this.setState(endData);
    });
    //Listen for session info changes
    this.sessionListener = this.sessionManager.on('onSessionUpdate', async (session) => {
      if(
        (this.state.session && !this.state.session.started && session.started) ||
        (!this.state.session && session.started)
      ) {
        let sessionInfo = await SessionInfo.getInfo(session);
        this.setState({
          isServer: sessionInfo.isServer,
          whitePlayerName: sessionInfo.whitePlayerName,
          whitePlayerType: sessionInfo.whitePlayerType,
          whiteUsername: sessionInfo.whiteUsername,
          blackPlayerName: sessionInfo.blackPlayerName,
          blackPlayerType: sessionInfo.blackPlayerType,
          blackUsername: sessionInfo.blackUsername,
          canPlay: sessionInfo.canPlay,
          loading: false
        });
      }
      this.setState({ session: session });
    });

    //Check URL search params for id
    let search = new URLSearchParams(this.props.location.search);
    if(search.has('id')) {
      this.sessionManager.init(search.get('id'));
    }
    else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillUnmount() {
    //Stop listening to board changes
    if(typeof this.boardListener === 'function') { this.boardListener(); }
    //Stop listening to clock changes
    if(typeof this.clockListener === 'function') { this.clockListener(); }
    //Stop listening to session end changes
    if(typeof this.endListener === 'function') { this.endListener(); }
    //Stop listening to session info changes
    if(typeof this.sessionListener === 'function') { this.sessionListener(); }
    this.sessionManager.destroy();
  }
  render() {
    if(this.state.loading) {
      return (
        <>
          {this.state.session && !this.state.session.started ? 
            <WaitModal
              session={this.state.session}
              onBack={() => {
                this.props.history.goBack();
              }}
            />
          :
            null
          }
          <Box display='flex'>
            <Box mx='auto' my={5}>
              <CircularProgress
                size={120}
                thickness={3.3}
                disableShrink
                style={{
                  animationDuration: '2000ms'
                }}
              />
            </Box>
          </Box>
        </>
      );
    }
    if(this.state.board === null) {
      return (
        <Box display='flex'>
          <Box mx='auto' my={5}>
            <Trans>Session does not exist!</Trans>
          </Box>
        </Box>
      );
    }
    return (
      <>
        {this.state.session && !this.state.session.started ? 
          <WaitModal
            session={this.state.session}
            onBack={() => {
              this.props.history.goBack();
            }}
          />
        :
          null
        }
        <Player
          board={this.state.board}
          actionHistory={this.state.actionHistory}
          moveBuffer={this.state.moveBuffer}
          checks={this.state.checks}
          availableMoves={this.state.availableMoves}
          pastAvailableMoves={this.state.pastAvailableMoves}
          onMove={(move) => {
            this.sessionManager.move(move);
          }}
          submitCanUndo={this.state.undoable}
          submitCanSubmit={this.state.submittable}
          submitOnUndo={() => {
            this.sessionManager.undo();
          }}
          submitOnSubmit={() => {
            this.sessionManager.submit();
          }}
          notation={this.state.notation}
          statusWhitePlayerName={this.state.whitePlayerName}
          statusWhitePlayerType={this.state.whitePlayerType}
          statusBlackPlayerName={this.state.blackPlayerName}
          statusBlackPlayerType={this.state.blackPlayerType}
          statusWhiteActive={this.state.player === 'white'}
          statusIsCheckmate={this.state.isCheckmate}
          statusIsFlagged={this.state.isFlagged}
          statusIsForfeit={this.state.isForfeit}
          statusIsStalemate={this.state.isStalemate}
          statusIsDraw={this.state.isDraw}
          statusIsCheck={Array.isArray(this.state.checks) && this.state.checks.length > 0}
          allowClock={this.state.allowClock}
          clockActive={this.state.clockActive}
          clockWhiteTimeLeft={this.state.clockWhiteTimeLeft}
          clockWhiteDelayLeft={this.state.clockWhiteDelayLeft}
          clockBlackTimeLeft={this.state.clockBlackTimeLeft}
          clockBlackDelayLeft={this.state.clockBlackDelayLeft}
        />
      </>
    );
  }
}

export default withRouter(Play);