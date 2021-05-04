import React from 'react';

import Player from 'components/player/Player';

import Chess from '5d-chess-js';

export default class Play extends React.Component {
  state = {};
  componentDidMount(){
    var chess = new Chess();  
    this.setState({
      board: chess.board,
      actionHistory: chess.actionHistory,
      moveBuffer: chess.moveBuffer,
      checks: chess.checks,
      availableMoves: chess.moves('object', false, false, false)
    });
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
      />
    );
  }
}