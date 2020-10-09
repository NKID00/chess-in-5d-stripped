import React from 'react';
import Chess from '5d-chess-js';

import { Box, Flex, Text, Button } from 'rebass';

import Board from 'components/Board';
import NotationViewer from 'components/NotationViewer';
import Settings from 'components/Settings';
import LogoIcon from 'assets/logo.svg';

const deepcompare = require('deep-compare');
const deepcopy = require('deep-copy');

export default class GamePlayer extends React.Component {
  chess = new Chess();
  boardRef = React.createRef();
  state = {
    selectedPiece: null,
    highlights: [],
    hoverHighlights: [],
    triggerDate: Date.now(),
    importedHistory: [],
    notation: '',
    settings: {
      boardShow: 'both',
      allowRecenter: true,
      moveShow: 'timeline',
      flip: false
    }
  };
  moveArrowCalc() {
    var actions = deepcopy(this.chess.actionHistory);
    var chess = new Chess();
    var res = [];
    var newMoveArrow = (currMove) => {
      var prevTimelines = deepcopy(chess.board.timelines);
      chess.move(currMove);
      var newTimelines = deepcopy(chess.board.timelines);
      if(prevTimelines.length !== newTimelines.length) {
        var newTimeline = newTimelines.filter((e) => { // eslint-disable-line no-loop-func
          return !prevTimelines.map((e2) => { return e2.timeline}).includes(e.timeline);
        })[0].timeline;
        var newMove = deepcopy(currMove);
        newMove.start = deepcopy(newMove.end);
        newMove.end.timeline = newTimeline;
        newMove.isNew = true;
        res.push(newMove);
      }
    };
    for(var i = 0;i < actions.length;i++) {
      var currAction = actions[i];
      for(var j = 0;j < currAction.moves.length;j++) {
        var currMove = currAction.moves[j];
        newMoveArrow(currMove);
        res.push(currMove);
      }
      chess.submit();
    }
    var moveBuffer = deepcopy(this.chess.moveBuffer);
    for(var i = 0;i < moveBuffer.length;i++) { // eslint-disable-line no-redeclare
      var currMove = moveBuffer[i]; // eslint-disable-line no-redeclare
      newMoveArrow(currMove);
      res.push(currMove);
    }
    return res;
  }
  boardSync() {
    var win = {
      player: this.chess.player,
      checkmate: this.chess.inCheckmate,
      stalemate: this.chess.inStalemate
    };
    this.setState({
      board: this.chess.board,
      submittable: this.chess.submittable(),
      undoable: this.chess.undoable(),
      player: this.chess.player,
      checkmate: win.checkmate,
      stalemate: win.stalemate,
      check: this.chess.inCheck,
      action: this.chess.actionNumber,
      checks: this.chess.checks(),
      triggerDate: Date.now(),
      nextMoves: this.chess.moves('object', false, false, true),
      moveArrows: this.moveArrowCalc()
    });
    if(typeof this.props.onEnd === 'function') {
      if(win.checkmate || win.stalemate) {
        this.props.onEnd(win);
      }
    }
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
          this.state.nextMoves.filter((e) => {
            return deepcompare(e.start, this.state.selectedPiece.position);
          })
        });
      }
    }
    if(
      prevState.triggerDate !== this.state.triggerDate ||
      prevState.settings.flip !== this.state.settings.flip
    ) {
      if(this.boardRef) {
        this.boardRef.current.recenter();
      }
    }
  }
  revert() {
    if(this.props.canAnalyze) {
      var newAction = this.state.action;
      var newPlayer = this.state.player;
      if(newPlayer === 'white') { newAction--; newPlayer = 'black'; }
      else { newPlayer = 'white'; }
      this.chess.import(this.state.importedHistory.filter((e) => {
        return (e.action * 2 + (e.player === 'white' ? 0 : 1)) < (newAction * 2 + (newPlayer === 'white' ? 0 : 1));
      }));
      this.boardSync();
    }
  }
  forward() {
    if(this.props.canAnalyze) {
      this.chess.import(this.state.importedHistory.filter((e) => {
        return (e.action * 2 + (e.player === 'white' ? 0 : 1)) <= (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
      }));
      this.boardSync();
    }
  }
  selectPiece(piece) {
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
  move(moveObj, unselectPiece = false) {
    this.chess.move(moveObj);
    this.setState({highlights: []});
    if(unselectPiece) { this.setState({selectedPiece: null}); }
    this.boardSync();
    if(typeof this.props.onMove === 'function') { this.props.onMove(moveObj); }
  }
  undo() {
    this.chess.undo();
    this.boardSync();
    if(typeof this.props.onUndo === 'function') { this.props.onUndo(); }
  }
  submit() {
    this.chess.submit(true);
    this.setState({
      importedHistory: this.chess.export('object'),
      notation: this.chess.export('notation_short')
    });
    this.boardSync();
    if(typeof this.props.onSubmit === 'function') { this.props.onSubmit(); }
  }
  import(input) {
    if(this.props.canImport) {
      this.chess.import(input);
      this.setState({
        importedHistory: this.chess.export('object'),
        notation: this.chess.export('notation_short')
      });
      this.boardSync();
      if(typeof this.props.onImport === 'function') { this.props.onImport(input); }
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
          <img src={LogoIcon} alt='Logo' />
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
          {this.props.children}
          <NotationViewer
            canImport={this.props.canImport}
            notation={this.state.notation}
            player={this.state.player}
            action={this.state.action}
            onImport={(input) => { this.import(input); }}
          />
          <Settings onChange={(e) => { this.setState({settings: e}); }}/>
        </Flex>
        <Board
          ref={this.boardRef}
          boardObj={this.state.board}
          moveArrows={this.state.moveArrows}
          onPieceClick={(piece) => {
            if(piece) {
              if((this.props.canControlWhite && this.state.player === 'white') || (this.props.canControlBlack && this.state.player === 'black')) { this.selectPiece(piece); }
            }
          }}
          onPieceOver={(piece) => {
            this.setState({hoverHighlights:
              this.state.nextMoves.filter((e) => {
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
            if((this.props.canControlWhite && this.state.player === 'white') || (this.props.canControlBlack && this.state.player === 'black')) { this.move(moveObj, true); }
          }}
          selectedPiece={this.state.selectedPiece}
          hoverHighlights={this.state.hoverHighlights}
          highlights={this.state.highlights}
          checks={this.state.checks}
          onlyBlack={this.state.settings.boardShow === 'black'}
          onlyWhite={this.state.settings.boardShow === 'white'}
          allowRecenter={this.state.settings.allowRecenter}
          moveShow={this.state.settings.moveShow}
          flip={this.state.settings.flip}
        />
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
          sx={{
            position: 'absolute',
            bottom: 0
          }}
        >
          {typeof this.state.player === 'string' && !this.state.checkmate && !(typeof this.props.winner === 'string' && this.props.winner !== '') ?
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
          {typeof this.props.winner === 'string' && this.props.winner !== '' ?
            <Button
              variant='primary'
              disabled
              color={this.props.winner !== 'white'? 'white' : 'black'}
              bg={this.props.winner !== 'white'? 'black' : 'white'}
              mr={2}
            >
              {this.props.winner !== 'white' ? 'Black Wins' : 'White Wins'}
            </Button>
          : this.state.checkmate ?
            <Button
              variant='primary'
              disabled
              color={this.state.player === 'white'? 'white' : 'black'}
              bg={this.state.player === 'white'? 'black' : 'white'}
              mr={2}
            >
              {this.state.player === 'white' ? 'Black Wins' : 'White Wins'}
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
            mx={1}
          >
            Re-center View
          </Button>
          <Button
            variant={this.state.undoable ? 'primary' : 'outline'}
            disabled={!this.state.undoable}
            onClick={() => {
              if((this.props.canControlWhite && this.state.player === 'white') || (this.props.canControlBlack && this.state.player === 'black')) { this.undo(); }
            }}
            mx={1}
          >
            Undo
          </Button>
          <Button
            variant={this.state.submittable ? 'primary' : 'outline'}
            disabled={!this.state.submittable}
            onClick={() => {
              if((this.props.canControlWhite && this.state.player === 'white') || (this.props.canControlBlack && this.state.player === 'black')) { this.submit(); }
            }}
            mx={1}
          >
            Submit
          </Button>
        </Flex>
        {this.props.canAnalyze ?
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            justifyContent='center'
            width={1}
          >
            <Button
              variant={this.state.importedHistory.filter((e) => {
                return (e.action * 2 + (e.player === 'white' ? 0 : 1)) < (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
              }).length <= 0 ? 'outline' : 'primary'}
              disabled={this.state.importedHistory.filter((e) => {
                return (e.action * 2 + (e.player === 'white' ? 0 : 1)) < (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
              }).length <= 0}
              onClick={() => { this.revert(); }}
              mx={1}
            >
              &lt;&lt;
            </Button>
            <Text p={2} fontWeight='bold'>{'Action: ' + this.state.action}</Text>
            <Button
              variant={this.state.importedHistory.filter((e) => {
                return (e.action * 2 + (e.player === 'white' ? 0 : 1)) >= (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
              }).length <= 0 ? 'outline' : 'primary'}
              disabled={this.state.importedHistory.filter((e) => {
                return (e.action * 2 + (e.player === 'white' ? 0 : 1)) >= (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
              }).length <= 0}
              onClick={() => { this.forward(); }}
              mx={1}
            >
              &gt;&gt;
            </Button>
          </Flex>
        :
          <></>
        }
      </>
    );
  }
}
