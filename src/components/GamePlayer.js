import React from 'react';
import Chess from '5d-chess-js';

import { Box } from 'rebass';
import { Label, Select } from '@rebass/forms';

import Board from 'components/Board';

const deepcompare = require('deep-compare');

export default class GamePlayer extends React.Component {
  chess = new Chess('1w. 1:e2:e4\n1b. 1:Nb8:c6\n2w. 2:e4:e5');
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
      <>
        <Box>
          <Label htmlFor='country'>Country</Label>
          <Select
            id='country'
            name='country'
            defaultValue='United States'>
            {[['us','United States'], ['uk','United Kingdom']].map(([ key, country ]) => (
              <option
                key={key}>
                {country.name}
              </option>
            ))}
          </Select>
        </Box>
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
      </>
    );
  }
}
