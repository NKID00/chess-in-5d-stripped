import React from 'react';

import Player from 'components/Player';

import Chess from '5d-chess-js';

export default class Play extends React.Component {
  chess = new Chess();
  currAvailableMoves = [];
  pastAvailableMoves = [];
  futureAvailableMoves = [];
  state = {};
  sync() {
    var tmpChess = this.chess.copy();
    tmpChess.skipDetection = true;
    tmpChess.pass();
    this.futureAvailableMoves = tmpChess.moves('object', false, false, false);
    this.setState({
      board: this.chess.board,
      actionHistory: this.chess.actionHistory,
      moveBuffer: this.chess.moveBuffer,
      checks: this.chess.checks,
      availableMoves: this.chess.moves('object', false, false, false),
      pastAvailableMoves: [this.pastAvailableMoves,this.futureAvailableMoves].flat(),
      notation: tmpChess.export('5dpgn_active_timeline')
    });
  }
  componentDidMount() {
    this.currAvailableMoves = this.chess.moves('object', false, false, false);
    this.sync();
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
        notation={this.state.notation}
        notationHighlight={this.state.notation}
        onMove={(move) => {
          this.chess.move(move);
          this.sync();
        }}
        onUndo={() => {
          this.chess.undo();
          this.sync();
        }}
        onSubmit={() => {
          this.chess.submit();
          this.pastAvailableMoves = [this.pastAvailableMoves, this.currAvailableMoves].flat();
          this.currAvailableMoves = this.chess.moves('object', false, false, false);
          this.sync();
        }}
      />
    );
  }
}