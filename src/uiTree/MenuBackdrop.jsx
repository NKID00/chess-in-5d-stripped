import React from 'react';
import ChessWorker from 'workerize-loader!components/ChessWorker'; // eslint-disable-line import/no-webpack-loader-syntax

import Chess from '5d-chess-js';

import Board from 'components/Board';

export default class MenuBackdrop extends React.Component {
  chess = new ChessWorker();
  boardRef = React.createRef();
  timer = null;
  state = {
    triggerDate: Date.now(),
    board: new Chess().board,
    count: 0
  };
  async boardSync() {
    this.setState({
      board: await this.chess.board(),
      triggerDate: Date.now()
    });
  }
  async next() {
    try {
      var moves = await this.chess.moves('object', true, true, true);
      if(moves.length > 0) {
        await this.chess.move(moves[Math.floor(Math.random() * moves.length)]);
        if(await this.chess.submittable()) {
          await this.chess.submit();
        }
      }
      else {
        this.chess = new Chess();
      }
    }
    catch(err) {
      this.chess = new Chess();
    }
    try {
      if(this.state.count > 20) { this.chess = new Chess(); this.setState({count: 0}); }
      else { this.setState({count: this.state.count + 1}); }
      await this.boardSync();
      this.boardRef.current.recenter();
      this.timer = window.setTimeout(this.next.bind(this), Math.random()*2000 + 4000);
    }
    catch(err) {}
  }
  componentDidMount() {
    this.boardSync();
    this.timer = window.setTimeout(this.next.bind(this), Math.random()*2000 + 4000);
  }
  componentWillUnmount() {
    if(this.timer) {
      window.clearTimeout(this.timer);
    }
  }
  render() {
    return (
      <Board
        ref={this.boardRef}
        boardObj={this.state.board}
        blur
      />
    );
  }
}
