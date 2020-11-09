import React from 'react';
import ChessWorker from 'workerize-loader!components/ChessWorker'; // eslint-disable-line import/no-webpack-loader-syntax

import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Flex, Text, Button } from 'rebass';

import Board from 'components/Board';
import NotationViewer from 'components/NotationViewer';
import Settings from 'components/Settings';
import LogoIcon from 'assets/logo.svg';
import Options from 'Options';
import { Howl } from 'howler';
import piece from 'assets/sound/piece.flac';
import reverse from 'assets/sound/reverse.flac';
import submit from 'assets/sound/submit.flac';
import end from 'assets/sound/end.flac';

const deepcompare = require('deep-compare');
const deepcopy = require('deep-copy');

export default class GamePlayer extends React.Component {
  chess = new ChessWorker();
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
      if(this.state.submittable) {
        this.submit();
      }
    }
    if(e.keyCode === 85) {
      var settings = Object.assign({}, this.state.settings);
      settings.flip = !this.state.settings.flip;
      this.setState({settings: settings});
    }
  }
  async moveArrowCalc() {
    var actions = deepcopy(await this.chess.actionHistory());
    var chess = new ChessWorker();
    var res = [];
    var newMoveArrow = async (currMove) => {
      var prevTimelines = deepcopy((await chess.board()).timelines);
      await chess.move(currMove);
      var newTimelines = deepcopy((await chess.board()).timelines);
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
        await newMoveArrow(currMove);
        res.push(currMove);
      }
      await chess.submit();
    }
    var moveBuffer = deepcopy(await this.chess.moveBuffer());
    for(var i = 0;i < moveBuffer.length;i++) { // eslint-disable-line no-redeclare
      var currMove = moveBuffer[i]; // eslint-disable-line no-redeclare
      await newMoveArrow(currMove);
      res.push(currMove);
    }
    return res;
  }
  async addCheckGhost(boardObj, checks) {
    var newBoardObj = deepcopy(boardObj);
    for(var i = 0;this.state.settings.showCheckGhost && i < checks.length;i++) {
      var checksExists = false;
      for(var l = 0;l < newBoardObj.timelines.length;l++) {
        if(
          newBoardObj.timelines[l].timeline === checks[i].start.timeline ||
          newBoardObj.timelines[l].timeline === checks[i].end.timeline
        ) {
          for(var t = 0;t < newBoardObj.timelines[l].turns.length;t++) {
            if(
              newBoardObj.timelines[l].turns[t].turn === checks[i].start.turn ||
              newBoardObj.timelines[l].turns[t].turn === checks[i].end.turn
            ) {
              if(newBoardObj.timelines[l].turns[t].player === checks[i].player) {
                checksExists = true;
              }
            }
          }
          for(var t = 0;!checksExists && t < newBoardObj.timelines[l].turns.length;t++) { // eslint-disable-line no-redeclare
            if(
              newBoardObj.timelines[l].turns[t].turn === checks[i].start.turn ||
              newBoardObj.timelines[l].turns[t].turn === checks[i].end.turn
            ) {
              if(newBoardObj.timelines[l].turns[t].player === 'white' && checks[i].player === 'black') {
                var newTurn = deepcopy(newBoardObj.timelines[l].turns[t]);
                newTurn.fade = true;
                newTurn.player = 'black';
                newBoardObj.timelines[l].turns.push(newTurn);
              }
            }
            if(
              newBoardObj.timelines[l].turns[t].turn === checks[i].start.turn - 1 ||
              newBoardObj.timelines[l].turns[t].turn === checks[i].end.turn - 1
            ) {
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
  async boardSync() {
    var win = {
      player: await this.chess.player(),
      checkmate: await this.chess.inCheckmate(),
      stalemate: await this.chess.inStalemate()
    };
    var obj = {};
    obj.submittable = await this.chess.submittable(true);
    obj.undoable = await this.chess.undoable();
    obj.player = await this.chess.player();
    if(!this.state.ended) {
      obj.checkmate = win.checkmate;
      obj.stalemate = win.stalemate;
    }
    obj.check = await this.chess.inCheck();
    obj.action = await this.chess.actionNumber();
    obj.checks = await this.chess.checks();
    obj.board = await this.addCheckGhost(await this.chess.board(), obj.checks);
    obj.triggerDate = Date.now();
    obj.nextMoves = (await this.chess.moves('object', false, false, true)).filter((e) => {
      if(e.promotion !== '' && e.promotion !== null) {
        if(e.promotion === 'K') { return true; }
        if(e.promotion === 'R' && !(
          (e.player === 'white' && e.end.rank === 8 && e.start.rank === 7) ||
          (e.player === 'black' && e.end.rank === 2 && e.start.rank === 1)
        )) { return true; }
        return e.promotion === 'Q';
      }
      return true;
    });
    obj.moveArrows = await this.moveArrowCalc();
    obj.currentNotation = await this.chess.exportFunc('notation_short');
    obj.variant = (await this.chess.metadata()).variant;
    obj.metadata = await this.chess.metadata();
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
      this.setState({board: await this.addCheckGhost(await this.chess.board(), await this.chess.checks()) });
    }
    if((prevProps.defaultImport !== this.props.defaultImport) && (typeof this.props.defaultImport === 'string') && this.props.defaultImport.length > 0) {
      this.import(this.props.defaultImport);
    }
    if(prevProps.variant !== this.props.variant && typeof this.props.variant === 'string') {
      this.setState({loading: true});
      await this.chess.variant(this.props.variant);
      await this.boardSync();
      if(typeof this.props.onVariantLoad === 'function') {
        this.props.onVariantLoad();
      }
      this.setState({loading: false});
    }
    if(prevProps.whiteName !== this.props.whiteName && typeof this.props.whiteName === 'string') {
      this.chess.metadata({white: this.props.whiteName});
    }
    if(prevProps.blackName !== this.props.blackName && typeof this.props.blackName === 'string') {
      this.chess.metadata({black: this.props.blackName});
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keypress', this.shortcuts);
  }
  async revert() {
    if(this.props.canAnalyze) {
      this.setState({loading: true});
      var newAction = this.state.action;
      var newPlayer = this.state.player;
      if(newPlayer === 'white') { newAction--; newPlayer = 'black'; }
      else { newPlayer = 'white'; }
      await this.chess.importFunc(this.state.importedHistory.filter((e) => {
        return (e.action * 2 + (e.player === 'white' ? 0 : 1)) < (newAction * 2 + (newPlayer === 'white' ? 0 : 1));
      }), this.state.variant, true);
      await this.boardSync();
      this.setState({loading: false});
    }
  }
  async forward() {
    if(this.props.canAnalyze) {
      this.setState({loading: true});
      await this.chess.importFunc(this.state.importedHistory.filter((e) => {
        return (e.action * 2 + (e.player === 'white' ? 0 : 1)) <= (this.state.action * 2 + (this.state.player === 'white' ? 0 : 1));
      }), this.state.variant, true);
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
    await this.chess.move(moveObj, true);
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
    await this.chess.undo();
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
    await this.chess.submit(true);
    if(typeof this.props.onSubmit === 'function') { this.props.onSubmit(); }
    this.setState({
      importedHistory: await this.chess.exportFunc('object'),
      notation: await this.chess.exportFunc('notation_short')
    });
    await this.boardSync();
    this.submitHowl.volume(Options.get('sound').effect);
    if(this.submitHowl.volume() > 0) {
      this.submitHowl.play();
    }
    this.setState({loading: false});
  }
  async import(input) {
    if(this.props.canImport) {
      this.setState({loading: true});
      await this.chess.importFunc(input, undefined, true);
      this.setState({
        importedHistory: await this.chess.exportFunc('object'),
        notation: await this.chess.exportFunc('notation_short')
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
          <img src={LogoIcon} alt='Logo' />
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
          {this.props.children}
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
                await this.chess.importFunc(input, this.state.variant, true);
                await this.boardSync();
                this.setState({loading: false});
              }
            }}
          />
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
          timelineLabel={this.state.settings.timelineLabel}
          turnLabel={this.state.settings.turnLabel}
          boardLabel={this.state.settings.boardLabel}
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
