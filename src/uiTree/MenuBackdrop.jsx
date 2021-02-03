import React from 'react';

import Chess from '5d-chess-js';

import Board from 'components/Board';

export default class MenuBackdrop extends React.Component {
  chess = new Chess();
  boardRef = React.createRef();
  timer = null;
  state = {
    triggerDate: Date.now(),
    board: new Chess().board,
    count: 0
  };
  boardSync() {
    this.setState({
      board: this.chess.board,
      triggerDate: Date.now()
    });
  }
  async next() {
    try {
      var moves = this.chess.moves('object', true, true, true);
      if(moves.length > 0) {
        this.chess.move(moves[Math.floor(Math.random() * moves.length)]);
        if(this.chess.submittable(true)) {
          this.chess.submit(true);
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
      this.boardSync();
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
