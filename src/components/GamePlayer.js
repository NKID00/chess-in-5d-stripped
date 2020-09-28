import React from 'react';
import Chess from '5d-chess-js';

import Board from 'components/Board';

const deepcompare = require('deep-compare');

export default class GamePlayer extends React.Component {
  chess = new Chess('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Nb1<>1:b3\n2b. 1+1:a7:a6\n3w. 2+1:c2:c3\n3b. 2:Nb8:c6\n3b. 2+1:Nb8:c6');
  state = {
    selectedPiece: null,
    highlights: []
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepcompare(
        prevState.selectedPiece ? prevState.selectedPiece : {}, 
        this.state.selectedPiece ? this.state.selectedPiece : {}
    )) {
      if(this.state.selectedPiece === null) {
        this.setState({highlights: []});
      }
      else {
        this.setState({highlights:
          this.chess.moves('object', false, false).filter((e) => {
            return deepcompare(e.start, this.state.selectedPiece.position);
          })
        });
      }
    }
  }
  render() {
    return (
      <Board
        app={this.props.app}
        palette={this.props.palette}
        boardObj={this.chess.board}
        highlights={this.state.highlights}
        onPieceClick={(piece) => {
          if(piece) {
            if(
              this.state.selectedPiece === null &&
              this.chess.player === piece.player
            ) {
              this.setState({selectedPiece: piece});
            }
            else if(
              this.state.selectedPiece &&
              this.state.selectedPiece.piece === piece.piece &&
              this.state.selectedPiece.player === piece.player &&
              this.state.selectedPiece.position.timeline === piece.position.timeline &&
              this.state.selectedPiece.position.turn === piece.position.turn &&
              this.state.selectedPiece.position.player === piece.position.player
            ) {
              this.setState({selectedPiece: null});
            }
          }
        }}
        onHighlightClick={(moveObj) => {
          this.chess.move(moveObj);
          this.setState({
            highlights: [],
            selectedPiece: null
          });
        }}
        selectedPiece={this.state.selectedPiece}
      />
    );
  }
}
