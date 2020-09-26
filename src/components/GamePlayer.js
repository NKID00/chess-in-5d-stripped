import React from 'react';
import Chess from '5d-chess-js';

import Board from 'components/Board';

export default class GamePlayer extends React.Component {
  chess = new Chess('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Nb1<>1:b3\n2b. 1+1:a7:a6\n3w. 2+1:c2:c3\n3b. 2:Nb8:c6\n3b. 2+1:Nb8:c6\n4w. 3:Qd1:h5\n4w. 3+1:Qd1:c2#');
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  resizeListener = (() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <Board 
        boardObj={this.chess.board}
        onPieceClick={(piece) => {console.log(piece);}}
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}