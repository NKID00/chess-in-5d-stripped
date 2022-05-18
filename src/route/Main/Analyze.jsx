import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import Player from 'components/Player';

import AnalysisManager from 'state/AnalysisManager';

import * as SessionInfo from 'utils/SessionInfo';

class Analyze extends React.Component {
  analysisManager = new AnalysisManager();
  state = {
    board: null,
    loading: true,
    whitePlayerName: 'White',
    whitePlayerType: 'human',
    whiteUsername: '',
    blackPlayerName: 'Black',
    blackPlayerType: 'human',
    blackUsername: ''
  };
  componentDidMount() {
    //Listen for board changes
    this.boardListener = this.analysisManager.on('onBoardUpdate', async (boardData) => {
      if(this.state.loading) {
        this.setState({
          loading: false
        });
      }
      this.setState(boardData);
    });
    //Listen for session info changes
    this.sessionListener = this.analysisManager.on('onSessionUpdate', async (session) => {
      let sessionInfo = await SessionInfo.getInfo(session);
      this.setState({
        whitePlayerName: sessionInfo.whitePlayerName,
        whitePlayerType: sessionInfo.whitePlayerType,
        whiteUsername: sessionInfo.whiteUsername,
        blackPlayerName: sessionInfo.blackPlayerName,
        blackPlayerType: sessionInfo.blackPlayerType,
        blackUsername: sessionInfo.blackUsername
      });
    });

    //Check URL search params for id or import data
    let search = new URLSearchParams(this.props.location.search);
    if(search.has('id')) {
      this.analysisManager.init(search.get('id'), search.has('empty'));
    }
    else if(search.has('import')) {
      this.analysisManager.init(search.get('import'), search.has('empty'));
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
    //Stop listening to session info changes
    if(typeof this.sessionListener === 'function') { this.sessionListener(); }
    this.analysisManager.destroy();
  }
  render() {
    if(this.state.loading) {
      return (
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
      <Player
        board={this.state.board}
        actionHistory={this.state.actionHistory}
        moveBuffer={this.state.moveBuffer}
        checks={this.state.checks}
        availableMoves={this.state.availableMoves}
        pastAvailableMoves={this.state.pastAvailableMoves}
        onMove={(move) => {
          try {
            this.analysisManager.move(move);
          }
          catch(err) {}
        }}
        submitCanUndo={this.state.undoable}
        submitCanSubmit={this.state.submittable}
        submitOnUndo={() => {
          try {
            this.analysisManager.undo();
          }
          catch(err) {}
        }}
        submitOnSubmit={() => {
          try {
            this.analysisManager.submit();
          }
          catch(err) {}
        }}
        notation={this.state.baseNotation}
        notationHighlight={this.state.notation}
        notationOnSelect={(notation) => {
          try {
            this.analysisManager.select(notation);
          }
          catch(err) {}
        }}
        statusWhitePlayerName={this.state.whitePlayerName}
        statusWhitePlayerType={this.state.whitePlayerType}
        statusBlackPlayerName={this.state.blackPlayerName}
        statusBlackPlayerType={this.state.blackPlayerType}
        statusWhiteActive={this.state.player === 'white'}
        allowAnalyze
        analyzeOnPreviousAction={this.analysisManager.previousAction.bind(this.analysisManager)}
        analyzeOnPreviousMove={this.analysisManager.previousMove.bind(this.analysisManager)}
        analyzeOnNextAction={this.analysisManager.nextAction.bind(this.analysisManager)}
        analyzeOnNextMove={this.analysisManager.nextMove.bind(this.analysisManager)}
        analyzeOnRestore={this.analysisManager.reset.bind(this.analysisManager)}
      />
    );
  }
}

export default withRouter(Analyze);
