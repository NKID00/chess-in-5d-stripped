import React from 'react';
import Chess from '5d-chess-js';

import { Box, Flex, Text, Button } from 'rebass';

import Board from 'components/Board';

const deepcompare = require('deep-compare');
console.log(Chess.raw)
export default class GamePlayer extends React.Component {
  chess = new Chess('1w. 1:e2:e4\n1b. 1:Nb8:c6\n2w. 2:e4:e5');
  state = {
    selectedPiece: null,
    highlights: []
  }
  boardSync() {
    this.setState({
      board: this.chess.board,
      submittable: this.chess.submittable(),
      undoable: this.chess.undoable(),
      player: this.chess.player,
      checkmate: this.chess.checkmate,
      stalemate: this.chess.stalemate,
      check: this.chess.check,
      action: this.chess.actionNumber
    })
  }
  componentDidMount() {
    this.boardSync();
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
        <Flex
          px={2}
          color='white'
          bg='black'
          alignItems='center'
        >
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
          <Text p={2} fontWeight='bold'>{'Action: ' + this.state.action}</Text>
        </Flex>
        <Board
          boardObj={this.state.board}
          onPieceClick={(piece) => {
            if(piece) {
              if(
                this.state.selectedPiece === null &&
                this.state.player === piece.player
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
            console.log(moveObj)
            this.chess.move(moveObj);
            this.setState({
              highlights: [],
              selectedPiece: null
            });
            this.boardSync();
          }}
          selectedPiece={this.state.selectedPiece}
          highlights={this.state.highlights}
        />
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%'
          }}
        >
          {typeof this.state.player === 'string' && !this.state.checkmate ?
            <Button
              variant='primary'
              disabled
              color={this.state.player === 'white'? 'black' : 'white'}
              bg={this.state.player === 'white'? 'white' : 'black'}
              mr={2}
            >
              {this.state.player.substr(0,1).toUpperCase() + this.state.player.substr(1) + '\'s Turn'}
            </Button>
          :
            <></>
          }
          {this.state.checkmate ?
            <Button
              variant='primary'
              disabled
              color={this.state.player === 'white'? 'white' : 'black'}
              bg={this.state.player === 'white'? 'black' : 'white'}
              mr={2}
            >
              {this.state.player === 'white' ?
                'Black Wins'
              :
                'White Wins'
              }
            </Button>
          :
            <></>
          }
          {this.state.stalemate ?
            <Button
              variant='primary'
              disabled
              color='black'
              bg='grey'
              mr={2}
            >
              Stalemate
            </Button>
          :
            <></>
          }
          <Box mx='auto' />
          <Button
            variant={this.state.undoable ? 'primary' : 'outline'}
            disabled={!this.state.undoable}
            onClick={() => {
              console.log('clicked')
              this.chess.undo();
              this.boardSync();
            }}
            mr={2}
          >
            Undo
          </Button>
          <Button
            variant={this.state.submittable ? 'primary' : 'outline'}
            disabled={!this.state.submittable}
            onClick={() => {
              this.chess.submit();
              this.boardSync();
            }}
            mr={2}
          >
            Submit
          </Button>
        </Flex>
      </>
    );
  }
}
