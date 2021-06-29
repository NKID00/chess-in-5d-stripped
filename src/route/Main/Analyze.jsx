import React from 'react';
import { withRouter } from 'react-router';

import Player from 'components/Player';

import Chess from '5d-chess-js';

import { decompressLink } from 'utils/LinkCompression';

//TODO Continue work
class Analyze extends React.Component {
  chess = new Chess();
  initialNotation = '';
  state = {};
  buildAvailableMoves() {
    var tmpChess = this.chess.copy();
    tmpChess.skipDetection = true;
    tmpChess.reset();
    var pastAvailableMoves = [];
    var actionHistory = this.chess.actionHistory;
    for(var i = 0;i < actionHistory.length;i++) {
      pastAvailableMoves.push(tmpChess.moves('object', false, false, false));
      tmpChess.action(actionHistory[i]);
    }
    tmpChess.pass();
    pastAvailableMoves.push(tmpChess.moves('object', false, false, false));
    this.setState({
      pastAvailableMoves: pastAvailableMoves
    });
  }
  sync() {
    this.setState({
      player: this.chess.player,
      board: this.chess.board,
      actionHistory: this.chess.actionHistory,
      moveBuffer: this.chess.moveBuffer,
      checks: this.chess.checks,
      availableMoves: this.chess.moves('object', false, false, false),
      undoable: this.chess.undoable(),
      submittable: this.chess.submittable(),
      notation: this.chess.export('5dpgn_active_timeline')
    });
  }
  componentDidMount() {
    var search = new URLSearchParams(this.props.location.search);
    if(search.has('import')) {
      this.initialNotation = decompressLink(search.get('import'));
    }
    try {
      if(this.initialNotation.length > 0) {
        //TODO add invalid notation feedback
        this.chess.import(this.initialNotation);
      }
      this.currAvailableMoves = this.chess.moves('object', false, false, false);
      this.sync();
    }
    catch(err) {}
  }
  render() {
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
            this.chess.move(move);
            this.sync();
          }
          catch(err) {}
        }}
        submitCanUndo={this.state.undoable}
        submitCanSubmit={this.state.submittable}
        submitOnUndo={() => {
          try {
            this.chess.undo();
            this.sync();
          }
          catch(err) {}
        }}
        submitOnSubmit={() => {
          try {
            this.chess.submit();
            this.pastAvailableMoves = [this.pastAvailableMoves, this.currAvailableMoves].flat();
            this.currAvailableMoves = this.chess.moves('object', false, false, false);
            this.sync();
          }
          catch(err) {}
        }}
        notation={this.initialNotation.length > 0 ? this.initialNotation : this.state.notation}
        notationHighlight={this.state.notation}
        statusWhitePlayerName='White'
        statusWhitePlayerType='human'
        statusBlackPlayerName='Black'
        statusBlackPlayerType='human'
        statusWhiteActive={this.state.player === 'white'}
        allowAnalyze
      />
    );
  }
}

export default withRouter(Analyze);
