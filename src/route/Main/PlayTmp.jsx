import React from 'react';

import Player from 'components/Player';

import Chess from '5d-chess-js';

export default class PlayTmp extends React.Component {
  chess = new Chess();
  currAvailableMoves = [];
  pastAvailableMoves = [];
  futureAvailableMoves = [];
  state = {};
  sync() {
    try {
      var tmpChess = this.chess.copy();
      tmpChess.skipDetection = true;
      tmpChess.pass();
      this.futureAvailableMoves = tmpChess.moves('object', false, false, false);
    }
    catch(err) {}
    this.setState({
      player: this.chess.player,
      board: this.chess.board,
      actionHistory: this.chess.actionHistory,
      moveBuffer: this.chess.moveBuffer,
      checks: this.chess.checks(),
      availableMoves: this.chess.moves('object', false, false, false),
      pastAvailableMoves: [this.pastAvailableMoves,this.futureAvailableMoves].flat(),
      undoable: this.chess.undoable(),
      submittable: this.chess.submittable(),
      notation: tmpChess.export('5dpgn_active_timeline')
    });
  }
  componentDidMount() {
    window.chess = this.chess;
    window.sync = this.sync.bind(this);
    try {
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
        notation={this.state.notation}
        notationHighlight={this.state.notation}
        statusWhitePlayerName='White'
        statusWhitePlayerType='human'
        statusBlackPlayerName='Black'
        statusBlackPlayerType='human'
        statusWhiteActive={this.state.player === 'white'}
      />
    );
  }
}