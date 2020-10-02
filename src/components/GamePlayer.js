import React from 'react';
import Chess from '5d-chess-js';

import { Box, Flex, Text, Button } from 'rebass';

import Board from 'components/Board';
import NotationViewer from 'components/NotationViewer';

const deepcompare = require('deep-compare');

export default class GamePlayer extends React.Component {
  chess = new Chess();
  boardRef = React.createRef();
  state = {
    selectedPiece: null,
    highlights: [],
    hoverHighlights: [],
    triggerDate: Date.now()
  }
  boardSync() {
    this.setState({
      board: this.chess.board,
      submittable: this.chess.submittable(),
      undoable: this.chess.undoable(),
      player: this.chess.player,
      checkmate: this.chess.inCheckmate,
      stalemate: this.chess.inStalemate,
      check: this.chess.inCheck,
      action: this.chess.actionNumber,
      notation: this.chess.export('notation_short'),
      checks: this.chess.checks(),
      triggerDate: Date.now()
    });
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
    if(prevState.triggerDate !== this.state.triggerDate) {
      if(this.boardRef) {
        this.boardRef.current.recenter();
      }
    }
  }
  selectPiece(piece) {
    if(
      (this.props.canControlWhite && this.state.player === 'white') ||
      (this.props.canControlBlack && this.state.player === 'black')
    ) {
      if(
        this.state.selectedPiece === null &&
        this.state.player === piece.player
      ) {
        this.setState({selectedPiece: piece, hoverHighlights: []});
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
  }
  move(moveObj, unselectPiece = false) {
    if(
      (this.props.canControlWhite && this.state.player === 'white') ||
      (this.props.canControlBlack && this.state.player === 'black')
    ) {
      this.chess.move(moveObj);
      this.setState({highlights: []});
      if(unselectPiece) { this.setState({selectedPiece: null}); }
      this.boardSync();
    }
  }
  undo() {
    if(
      (this.props.canControlWhite && this.state.player === 'white') ||
      (this.props.canControlBlack && this.state.player === 'black')
    ) {
      this.chess.undo();
      this.boardSync();
    }
  }
  submit() {
    if(
      (this.props.canControlWhite && this.state.player === 'white') ||
      (this.props.canControlBlack && this.state.player === 'black')
    ) {
      this.chess.submit();
      this.boardSync();
    }
  }
  import(input) {
    if(this.props.canImport) {
      this.chess.import(input);
      this.boardSync();
    }
  }
  render() {
    return (
      <>
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
        >
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
          {this.props.children}
          <NotationViewer
            canImport={this.props.canImport}
            notation={this.state.notation}
            onImport={(input) => { this.import(input); }}
          />
        </Flex>
        <Board
          ref={this.boardRef}
          boardObj={this.state.board}
          onPieceClick={(piece) => {
            if(piece) {
              this.selectPiece(piece);
            }
          }}
          onPieceOver={(piece) => {
            this.setState({hoverHighlights:
              this.chess.moves('object', false, false).filter((e) => {
                return deepcompare(e.start, piece.position) && (this.state.selectedPiece ?
                  !deepcompare(this.state.selectedPiece, piece)
                :
                  true
                );
              })
            });
          }}
          onPieceOut={(piece) => {
            this.setState({hoverHighlights: []});
          }}
          onHighlightClick={(moveObj) => {
            this.move(moveObj, true);
          }}
          selectedPiece={this.state.selectedPiece}
          hoverHighlights={this.state.hoverHighlights}
          highlights={this.state.highlights}
          checks={this.state.checks}
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
          {this.state.check && !this.state.checkmate ?
            <Button
              variant='primary'
              disabled
              color='white'
              bg='red'
              mr={2}
            >
              Check
            </Button>
          :
            <></>
          }
          <Box mx='auto' />
          <Button
            variant='secondary'
            onClick={() => {
              this.boardRef.current.recenter();
            }}
            mr={2}
          >
            Re-center View
          </Button>
          <Button
            variant={this.state.undoable ? 'primary' : 'outline'}
            disabled={!this.state.undoable}
            onClick={() => {
              this.undo();
            }}
            mr={2}
          >
            Undo
          </Button>
          <Button
            variant={this.state.submittable ? 'primary' : 'outline'}
            disabled={!this.state.submittable}
            onClick={() => {
              this.submit();
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
