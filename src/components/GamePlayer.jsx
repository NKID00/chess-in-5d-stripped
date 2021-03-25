import React from 'react';
import Chess from '5d-chess-js';
import ChessWorker from 'workerize-loader!components/ChessWorker'; // eslint-disable-line import/no-webpack-loader-syntax

import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Flex, Text, Button } from 'rebass';

import Board from 'components/Board';
import NotationViewer from 'components/NotationViewer';
import Settings from 'components/Settings';
import ArrowMenu from 'components/ArrowMenu';
import LogoIcon from 'assets/logo.svg';
import Options from 'Options';
import { Howl } from 'howler';
import piece from 'assets/sound/piece.flac';
import reverse from 'assets/sound/reverse.flac';
import submit from 'assets/sound/submit.flac';
import end from 'assets/sound/end.flac';

const deepcompare = require('deep-equal');
const deepcopy = require('deep-copy');

export default class GamePlayer extends React.Component {
  chess = new Chess();
  chessWorker = ChessWorker();
  boardRef = React.createRef();
  pieceHowl = new Howl({
    volume: 0,
    src: piece
  });
  reverseHowl = new Howl({
    volume: 0,
    src: reverse
  });
  submitHowl = new Howl({
    volume: 0,
    src: submit
  });
  endHowl = new Howl({
    volume: 0,
    src: end
  });
  state = {
    selectedPiece: null,
    allMoves: [],
    nextMoves: [],
    highlights: [],
    hoverHighlights: [],
    triggerDate: Date.now(),
    importedHistory: [],
    notation: '',
    loading: false,
    action: 0,
    settings: {
      boardShow: 'both',
      allowRecenter: true,
      moveShow: 'timeline',
      flip: typeof this.props.flip === 'boolean' ? this.props.flip : false,
      timelineLabel: true,
      turnLabel: true,
      boardLabel: false,
      showCheckGhost: true
    },
    drawArrow: false,
    drawArrowNumber: '1',
    drawingArrow: false,
    drawingArrowCoord: {},
    drawArrows: [],
    ended: false,
    variant: 'standard'
  };
  shortcuts(e) {
    if(e.keyCode === 8 || e.keyCode === 90) {
      if(e.keyCode === 8) {
        e.preventDefault();
      }
      if(this.state.undoable) {
        this.undo();
      }
    }
    if(e.keyCode === 9) {
      if(typeof this.boardRef !== 'undefined') {
        this.boardRef.current.recenter();
      }
    }
    if(e.keyCode === 13 || e.keyCode === 70) {
      this.submit();
    }
    if(e.keyCode === 37) {
      this.revert();
    }
    if(e.keyCode === 39) {
      this.forward();
    }
    if(e.keyCode === 85) {
      var settings = Object.assign({}, this.state.settings);
      settings.flip = !this.state.settings.flip;
      this.setState({settings: settings});
    }
  }
  moveArrowCalc() {
    var tmpChess = this.chess.copy();
    var chess = new Chess();
    chess.reset(tmpChess.metadata.board);
    var actions = tmpChess.actionHistory;
    var res = [];
    var newMoveArrow = (currMove) => {
      var prevTimelines = (chess.board.timelines);
      chess.move(currMove);
      var newTimelines = (chess.board.timelines);
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
    var moveBuffer = tmpChess.moveBuffer;
    for(var i = 0;i < moveBuffer.length;i++) { // eslint-disable-line no-redeclare
      var currMove = moveBuffer[i]; // eslint-disable-line no-redeclare
      newMoveArrow(currMove);
      res.push(currMove);
    }
    return res;
  }
  addCheckGhost(boardObj, checks) {
    if(this.props.fog) {
      return boardObj;
    }
    var newBoardObj = deepcopy(boardObj);
    for(var i = 0;this.state.settings.showCheckGhost && i < checks.length;i++) {
      var checksExists = false;
      for(var l = 0;l < newBoardObj.timelines.length;l++) {
        if(
          newBoardObj.timelines[l].timeline === checks[i].start.timeline ||
          newBoardObj.timelines[l].timeline === checks[i].end.timeline
        ) {
          checksExists = false;
          for(var t = 0;t < newBoardObj.timelines[l].turns.length;t++) {
            if(newBoardObj.timelines[l].turns[t].turn === checks[i].start.turn) {
              if(newBoardObj.timelines[l].turns[t].player === checks[i].player) {
                checksExists = true;
              }
            }
          }
          for(var t = 0;!checksExists && t < newBoardObj.timelines[l].turns.length;t++) { // eslint-disable-line no-redeclare
            if(newBoardObj.timelines[l].turns[t].turn === checks[i].start.turn) {
              if(newBoardObj.timelines[l].turns[t].player === 'white' && checks[i].player === 'black') {
                var newTurn = deepcopy(newBoardObj.timelines[l].turns[t]);
                newTurn.fade = true;
                newTurn.player = 'black';
                newBoardObj.timelines[l].turns.push(newTurn);
              }
            }
            if(newBoardObj.timelines[l].turns[t].turn === checks[i].start.turn - 1) {
              if(newBoardObj.timelines[l].turns[t].player === 'black' && checks[i].player === 'white') {
                var newTurn = deepcopy(newBoardObj.timelines[l].turns[t]); // eslint-disable-line no-redeclare
                newTurn.fade = true;
                newTurn.player = 'white';
                newTurn.turn++;
                newBoardObj.timelines[l].turns.push(newTurn);
              }
            }
          }
          checksExists = false;
          for(var t = 0;t < newBoardObj.timelines[l].turns.length;t++) { // eslint-disable-line no-redeclare
            if(newBoardObj.timelines[l].turns[t].turn === checks[i].end.turn) {
              if(newBoardObj.timelines[l].turns[t].player === checks[i].player) {
                checksExists = true;
              }
            }
          }
          for(var t = 0;!checksExists && t < newBoardObj.timelines[l].turns.length;t++) { // eslint-disable-line no-redeclare
            if(newBoardObj.timelines[l].turns[t].turn === checks[i].end.turn) {
              if(newBoardObj.timelines[l].turns[t].player === 'white' && checks[i].player === 'black') {
                var newTurn = deepcopy(newBoardObj.timelines[l].turns[t]); // eslint-disable-line no-redeclare
                newTurn.fade = true;
                newTurn.player = 'black';
                newBoardObj.timelines[l].turns.push(newTurn);
              }
            }
            if(newBoardObj.timelines[l].turns[t].turn === checks[i].end.turn - 1) {
              if(newBoardObj.timelines[l].turns[t].player === 'black' && checks[i].player === 'white') {
                var newTurn = deepcopy(newBoardObj.timelines[l].turns[t]); // eslint-disable-line no-redeclare
                newTurn.fade = true;
                newTurn.player = 'white';
                newTurn.turn++;
                newBoardObj.timelines[l].turns.push(newTurn);
              }
            }
          }
        }
      }
    }
    return newBoardObj;
  }
  async chessState(state) {
    this.chess.state(state);
    await this.boardSync();
    this.getNotation();
  }
  async boardSync() {
    var obj = {};
    this.chess.skipDetection = true;
    obj.submittable = this.chess.submittable();
    obj.undoable = this.chess.undoable();
    obj.player = this.chess.player;
    obj.check = this.chess.inCheck;
    if(obj.check) { obj.submittable = false; }
    obj.action = this.chess.actionNumber;
    obj.checks = this.chess.checks();
    obj.board = this.addCheckGhost(this.chess.board, obj.checks);
    obj.triggerDate = Date.now();
    obj.nextMoves = (this.chess.moves('object', false, false, false)).filter((e) => {
      if(e.promotion !== '' && e.promotion !== null) {
        /*
        if(e.promotion === 'K') { return true; }
        if(e.promotion === 'R' && !(
          (e.player === 'white' && e.end.rank === 8 && e.start.rank === 7) ||
          (e.player === 'black' && e.end.rank === 2 && e.start.rank === 1)
        )) { return true; }
        */
        return e.promotion === 'Q' || e.promotion === 'P';
      }
      return true;
    });
    this.chess.skipDetection = false;
    obj.allMoves = this.state.allMoves.slice();
    for(var i = 0;i < obj.nextMoves.length;i++) {
      obj.allMoves.push(obj.nextMoves[i]);
    }
    obj.moveBuffer = this.chess.moveBuffer;
    obj.moveArrows = this.moveArrowCalc();
    obj.currentNotation = this.chess.export('5dpgn_active_timeline');
    obj.variant = this.chess.metadata.board;
    obj.metadata = this.chess.metadata;
    this.setState(obj);
    var win = {
      player: this.chess.player,
      checkmate: this.props.fog ? false : (await this.chessWorker.inCheckmate(this.chess.state())),
      stalemate: this.chess.inStalemate
    };
    obj = {};
    if(!this.state.ended) {
      obj.checkmate = win.checkmate;
      obj.stalemate = win.stalemate;
    }
    this.setState(obj);
    if(win.checkmate || win.stalemate) {
      this.endHowl.volume(Options.get('sound').effect);
      if(this.endHowl.volume() > 0) {
        this.endHowl.play();
      }
      if(!this.props.canAnalyze) {
        this.setState({ended: true});
        if(typeof this.props.onEnd === 'function') {
          this.props.onEnd(win);
        }
      }
    }
  }
  componentDidMount() {
    var settings = Options.get('settings');
    delete settings.flip;
    this.setState({settings: Object.assign(this.state.settings, settings)});
    if((typeof this.props.defaultImport === 'string') && this.props.defaultImport.length > 0) {
      this.import(this.props.defaultImport);
    }
    this.boardSync().then(() => {
      if(typeof this.props.onVariantLoad === 'function') {
        this.props.onVariantLoad();
      }
    });
    this.shortcuts = this.shortcuts.bind(this);
    window.addEventListener('keyup', this.shortcuts);
  }
  async componentDidUpdate(prevProps, prevState) {
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
      prevState.settings.flip !== this.state.settings.flip ||
      prevState.settings.boardShow !== this.state.settings.boardShow
    ) {
      if(this.boardRef) {
        this.boardRef.current.recenter();
      }
    }
    if(prevProps.flip !== this.props.flip) {
      var settings = Object.assign({}, this.state.settings);
      settings.flip = this.props.flip;
      this.setState({settings: settings});
    }
    if(prevState.settings.showCheckGhost !== this.state.settings.showCheckGhost) {
      this.setState({board: this.addCheckGhost(this.chess.board, this.chess.checks()) });
    }
    if((prevProps.defaultImport !== this.props.defaultImport) && (typeof this.props.defaultImport === 'string')) {
      this.import(this.props.defaultImport);
    }
    if(prevProps.variant !== this.props.variant && typeof this.props.variant === 'string') {
      this.setState({loading: true});
      this.chess.reset(this.props.variant);
      await this.boardSync();
      if(typeof this.props.onVariantLoad === 'function') {
        this.props.onVariantLoad();
      }
      this.setState({loading: false});
    }
    if(prevProps.whiteName !== this.props.whiteName && typeof this.props.whiteName === 'string') {
      this.chess.metadata.white = this.props.whiteName;
    }
    if(prevProps.blackName !== this.props.blackName && typeof this.props.blackName === 'string') {
      this.chess.metadata.black = this.props.blackName;
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.shortcuts);
  }
  async revert() {
    if(this.props.canAnalyze) {
      this.setState({loading: true});
      var newAction = this.state.action;
      var newPlayer = this.state.player;
      if(newPlayer === 'white') { newAction--; newPlayer = 'black'; }
      else { newPlayer = 'white'; }
      this.chess.skipDetection = true;
      this.chess.import(this.state.importedHistory.filter((e) => {
        return (e.action * 2 + (e.player === 'white' ? 0 : 1)) < (newAction * 2 + (newPlayer === 'white' ? 0 : 1));
      }), this.state.variant);
      this.chess.skipDetection = false;
      if(typeof this.props.onRevert === 'function') {
        this.props.onRevert();
      }
      await this.boardSync();
      this.setState({loading: false});
    }
  }
  async forward() {
    if(this.props.canAnalyze) {
      this.setState({loading: true});
      this.chess.skipDetection = true;
      this.chess.import(this.state.importedHistory.filter((e) => {
        return (e.action * 2 + (e.player === 'white' ? 0 : 1)) <= (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
      }), this.state.variant);
      this.chess.skipDetection = false;
      if(typeof this.props.onForward === 'function') {
        this.props.onForward();
      }
      await this.boardSync();
      this.setState({loading: false});
    }
  }
  selectPiece(piece) {
    if(
      this.state.player === piece.player
    ) {
      this.setState({selectedPiece: piece, hoverHighlights: []});
    }
  }
  async move(moveObj, unselectPiece = false) {
    this.setState({loading: true});
    if(!this.props.disableLocal) {
      this.chess.move(moveObj);
    }
    if(typeof this.props.onMove === 'function') { this.props.onMove(moveObj); }
    this.setState({highlights: []});
    if(unselectPiece) { this.setState({selectedPiece: null}); }
    await this.boardSync();
    this.pieceHowl.volume(Options.get('sound').effect);
    if(this.pieceHowl.volume() > 0) {
      this.pieceHowl.play();
    }
    this.setState({loading: false});
  }
  async undo() {
    this.setState({loading: true});
    if(!this.props.disableLocal) {
      this.chess.undo();
    }
    if(typeof this.props.onUndo === 'function') { this.props.onUndo(); }
    await this.boardSync();
    this.reverseHowl.volume(Options.get('sound').effect);
    if(this.reverseHowl.volume() > 0) {
      this.reverseHowl.play();
    }
    this.setState({loading: false});
  }
  async submit() {
    this.setState({loading: true});
    if(this.state.submittable) {
      if(!this.props.disableLocal) {
        this.chess.skipDetection = false;
        this.chess.submit();
        this.chess.skipDetection = true;
      }
      if(typeof this.props.onSubmit === 'function') { this.props.onSubmit(); }
      this.setState({
        importedHistory: this.chess.export('object'),
        notation: this.chess.export('5dpgn_active_timeline')
      });
      await this.boardSync();
      this.submitHowl.volume(Options.get('sound').effect);
      if(this.submitHowl.volume() > 0) {
        this.submitHowl.play();
      }
    }
    else if(this.props.fog && this.state.check) {
      if(typeof this.props.onFogEnd === 'function') {
        this.props.onFogEnd(this.state.player);
      }
    }
    this.setState({loading: false});
  }
  getNotation() {
    this.setState({
      importedHistory: this.chess.export('object'),
      notation: this.chess.export('5dpgn_active_timeline')
    });
  }
  async import(input) {
    if(this.props.canImport) {
      this.setState({loading: true});
      this.chess.import(input, undefined, true);
      this.setState({
        importedHistory: this.chess.export('object'),
        notation: this.chess.export('5dpgn_active_timeline')
      });
      await this.boardSync();
      if(typeof this.props.onImport === 'function') { this.props.onImport(input); }
      this.setState({loading: false});
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
          <img src={LogoIcon} alt='Logo' onClick={() => { window.location.href = window.location.origin; }} />
          <Text p={2} fontWeight='bold' onClick={() => { window.location.href = window.location.origin; }}>Chess in 5D</Text>
          <Box mx='auto' />
          {this.props.children}
          <ArrowMenu
            onArrowOn={(n) => {
              this.setState({ drawArrow: true, drawArrowNumber: n });
            }}
            onArrowOff={() => {
              this.setState({ drawArrow: false, drawingArrow: false });
            }}
            onArrowClear={() => {
              this.setState({ drawArrow: false, drawingArrow: false, drawArrows: [] });
            }}
          />
          {!this.props.fog ?
            <NotationViewer
              canImport={this.props.canImport}
              notation={this.state.notation}
              currentNotation={this.state.currentNotation}
              player={this.state.player}
              action={this.state.action}
              onImport={(input) => { this.import(input); }}
              onNotationClick={async (input) => {
                if(this.props.canAnalyze) {
                  this.setState({loading: true});
                  this.chess.skipDetection = true;
                  this.chess.import(input, this.state.variant);
                  this.chess.skipDetection = false;
                  await this.boardSync();
                  this.setState({loading: false});
                }
              }}
            />
          :
            <></>
          }
          <Settings value={this.state.settings} onChange={(e) => {
            Options.set('settings', e);
            this.setState({settings: e});
          }}/>
        </Flex>
        {this.state.loading ?
          <LinearProgress
            variant='indeterminate'
            color='primary'
          />
        :
          <></>
        }
        <Board
          ref={this.boardRef}
          boardObj={this.state.board}
          moveArrows={this.state.moveArrows}
          onBoardClick={(e) => {
            var point = e;
            if(this.state.drawArrow) {
              if(this.state.drawingArrow) {
                var currArrows = this.state.drawArrows;
                currArrows.push({
                  color: Options.get('palette')['drawArrow' + this.state.drawArrowNumber],
                  start: this.state.drawingArrowCoord,
                  end: point
                });
                this.setState({ drawArrows: currArrows, drawingArrow: false });
              }
              else {
                this.setState({ drawingArrow: true, drawingArrowCoord: point });
              }
            }
          }}
          onPieceClick={(piece) => {
            if(piece) {
              if((this.props.canControlWhite && this.state.player === 'white') || (this.props.canControlBlack && this.state.player === 'black')) { this.selectPiece(piece); }
            }
          }}
          onPieceOver={(piece) => {
            this.setState({hoverHighlights:
              this.state.allMoves.filter((e) => {
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
          timelineLabel={this.state.settings.timelineLabel}
          turnLabel={this.state.settings.turnLabel}
          boardLabel={this.state.settings.boardLabel}
          drawArrow={this.state.drawArrow}
          drawArrows={this.state.drawArrows}
          fog={this.props.fog}
          fogMode={this.props.canControlWhite ?
            'white'
          :
            'black'
          }
          allMoves={this.state.allMoves}
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
              {this.state.player === 'white' && this.props.whiteName ?
                this.props.whiteName + '\'s Turn'
              : this.state.player === 'black' && this.props.blackName ?
                this.props.blackName + '\'s Turn'
              :
                this.state.player.substr(0,1).toUpperCase() + this.state.player.substr(1) + '\'s Turn'}
            </Button>
          :
            <></>
          }
          {typeof this.props.winner === 'string' && this.props.winner !== '' && this.props.winner !== 'draw' ?
            <Button
              variant='primary'
              disabled
              color={this.props.winner !== 'white'? 'white' : 'black'}
              bg={this.props.winner !== 'white'? 'black' : 'white'}
              mr={2}
            >
              {this.props.winner === 'white' && this.props.whiteName ?
                this.props.whiteName + ' Wins'
              : this.props.winner === 'black' && this.props.blackName ?
                this.props.blackName + ' Wins'
              :
                this.props.winner.substr(0,1).toUpperCase() + this.props.winner.substr(1) + ' Wins'}
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
          {typeof this.props.winner === 'string' && this.props.winner === 'draw' ?
            <Button
              variant='primary'
              disabled
              color='black'
              bg='grey'
              mr={2}
            >
              Draw
            </Button>
          : this.state.stalemate ?
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
          {this.state.check && !this.state.checkmate && !this.props.fog ?
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
            variant={(this.state.submittable || this.props.fog) ? 'primary' : 'outline'}
            disabled={!(this.state.submittable || this.props.fog)}
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
