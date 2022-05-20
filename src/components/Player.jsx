import React from 'react';

import Card from '@material-ui/core/Card';

import AnalyzeMenu from 'components/Player/AnalyzeMenu';
import Audio from 'components/Player/Audio';
import Clock from 'components/Player/Clock';
import DrawMenu from 'components/Player/DrawMenu';
import Hotkeys from 'components/Player/Hotkeys';
import Layout from 'components/Player/Layout';
import Menu from 'components/Player/Menu';
import Notation from 'components/Player/Notation';
import Renderer from 'components/Player/Renderer';
import SettingsMenu from 'components/Player/SettingsMenu';
import Status from 'components/Player/Status';
import SubmitMenu from 'components/Player/SubmitMenu';
import TutorialMenu from 'components/Player/TutorialMenu';
import ViewMenu from 'components/Player/ViewMenu';

import EmitterContext from 'utils/EmitterContext';
import * as crConfig from 'state/config';

const deepequal = require('fast-deep-equal');

/*
Basic Props:
 - board
 - actionHistory
 - moveBuffer
 - checks
 - availableMoves
 - pastAvailableMoves
 - onMove

Submit Props:
 - submitCanUndo
 - submitCanSubmit
 - submitOnUndo
 - submitOnSubmit

Notation Props:
 - notation
 - notationHighlight
 - notationOnSelect

Status Props:
 - statusWhitePlayerName
 - statusWhitePlayerType
 - statusBlackPlayerName
 - statusBlackPlayerType
 - statusWhiteActive
 - statusIsLoading
 - statusIsLoadingPlayer
 - statusIsCheckmate
 - statusIsFlagged
 - statusIsForfeit
 - statusIsStalemate
 - statusIsDraw
 - statusIsCheck

Analyze Props:
 - allowAnalyze
 - analyzeOnPreviousAction
 - analyzeOnPreviousMove
 - analyzeOnNextAction
 - analyzeOnNextMove
 - analyzeOnRestore

Clock Props:
 - allowClock
 - clockActive
 - clockWhiteTimeLeft
 - clockWhiteDelayLeft
 - clockBlackTimeLeft
 - clockBlackDelayLeft

Tutorial Props:
 - allowTutorial
 - tutorialDisplayText
 - tutorialDisplayBoard
 - tutorialCustomArrows
 - tutorialAllowNext
 - tutorialOnNext
 - tutorialAllowBack
 - tutorialOnBack
*/
export default class Player extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  chessRendererRef = React.createRef();
  state = {
    overlay: {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    },
    menu: {
      showSubmit: true,
      showView: true,
      showStatus: true,
      showClock: true,
      showTutorial: true,
      showNotation: true,
      showAnalyze: true,
      showDraw: false,
      showSettings: false,
    }
  };
  resize() {
    if(this.rootRef.current) {
      var rect = this.rootRef.current.getBoundingClientRect();
      this.setState({
        overlay: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: window.innerHeight - rect.y
        }
      });
    }
  }
  startRendererInteraction() {
    crConfig.set({ app: { interactive: true } }, this.context);
  }
  autoFlip() {
    //Auto flip functionality
    let currentConfig = crConfig.get();
    if(currentConfig.extra.autoFlip) {
      crConfig.set({
        board: {
          flipTimeline: !this.props.statusWhiteActive,
          flipRank: !this.props.statusWhiteActive,
          flipFile: !this.props.statusWhiteActive
        }
      }, this.context);
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    this.startRendererInteractionListener = this.startRendererInteraction.bind(this);
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('focus', this.startRendererInteractionListener);
    if(this.rootRef.current) {
      this.rootRef.current.addEventListener('mouseenter', this.startRendererInteractionListener);
    }
    this.autoFlip();
    let currentConfig = crConfig.get();
    if(currentConfig.extra.autoRecenter && this.chessRendererRef) {
      window.setTimeout(() => {
        if(this.chessRendererRef.current.chessRenderer && this.chessRendererRef.current.chessRenderer) {
          this.chessRendererRef.current.chessRenderer.zoom.present(true, false);
        }
      }, 750);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepequal(prevState.menu, this.state.menu)) {
      window.setTimeout(() => { this.context.emit('layoutResizeUpdate'); }, 250);
    }
    if(!prevProps.submitCanSubmit && this.props.submitCanSubmit) {
      if(typeof this.props.submitOnSubmit === 'function') {
        //Auto submit functionality
        let currentConfig = crConfig.get();
        if(currentConfig.extra.autoSubmit) {
          this.props.submitOnSubmit();
        }
      }
    }
    if(prevProps.statusWhiteActive !== this.props.statusWhiteActive) {
      this.autoFlip();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('focus', this.startRendererInteractionListener);
    if(this.rootRef.current) {
      this.rootRef.current.removeEventListener('mouseenter', this.startRendererInteractionListener);
    }
  }
  onMove(move) {
    //Passthrough function for auto recenter
    if(typeof this.props.onMove === 'function') {
      this.props.onMove(move);
    }
  }
  onUndo() {
    //Passthrough function for auto recenter
    if(typeof this.props.submitOnUndo === 'function') {
      this.props.submitOnUndo();
    }
  }
  onSubmit() {
    //Passthrough function for auto recenter
    if(typeof this.props.submitOnSubmit === 'function') {
      this.props.submitOnSubmit();
    }
  }
  render() {
    var layoutComponents = [];
    layoutComponents.push(
      <Card key='menu'
        onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
        onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
      >
        <Menu
          {...this.state.menu}
          showStatusButton
          showSubmitButton
          showViewButton
          showClockButton={this.props.allowClock}
          showTutorialButton={this.props.allowTutorial}
          showNotationButton
          showAnalyzeButton={this.props.allowAnalyze}
          showDrawButton
          showSettingsButton
          onChange={(state) => {
            this.setState({ menu: state });
          }}
        />
      </Card>
    );
    if(this.state.menu.showClock && this.props.allowClock) {
      layoutComponents.push(
        <Card key='clock'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <Clock
            active={this.props.clockActive}
            whiteTimeLeft={this.props.clockWhiteTimeLeft}
            whiteDelayLeft={this.props.clockWhiteDelayLeft}
            blackTimeLeft={this.props.clockBlackTimeLeft}
            blackDelayLeft={this.props.clockBlackDelayLeft}
            whiteActive={this.props.statusWhiteActive}
          />
        </Card>
      );
    }
    if(this.state.menu.showAnalyze && this.props.allowAnalyze) {
      layoutComponents.push(
        <Card key='analyze'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <AnalyzeMenu
            onPreviousAction={this.props.analyzeOnPreviousAction}
            onPreviousMove={this.props.analyzeOnPreviousMove}
            onNextAction={this.props.analyzeOnNextAction}
            onNextMove={this.props.analyzeOnNextMove}
            onRestore={this.props.analyzeOnRestore}
          />
        </Card>
      );
    }
    if(this.state.menu.showTutorial && this.props.allowTutorial) {
      layoutComponents.push(
        <Card key='tutorial'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <TutorialMenu
            displayText={this.props.tutorialDisplayText}
            allowNext={this.props.tutorialAllowNext}
            onNext={this.props.tutorialOnNext}
            allowBack={this.props.tutorialAllowBack}
            onBack={this.props.tutorialOnBack}
          />
        </Card>
      );
    }
    if(this.state.menu.showDraw) {
      layoutComponents.push(
        <Card key='draw'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <DrawMenu
            onEnableDraw={(type, middle) => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.disableEraseMode();
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.enableCustomArrowMode(type, middle);
              }
            }}
            onDisableDraw={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.disableCustomArrowMode();
              }
            }}
            onEnableErase={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.disableCustomArrowMode();
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.enableEraseMode();
              }
            }}
            onDisableErase={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.disableEraseMode();
              }
            }}
            onUndo={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.undo();
              }
            }}
            onClear={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.wipe();
              }
            }}
          />
        </Card>
      );
    }
    if(this.state.menu.showSettings) {
      layoutComponents.push(
        <Card key='settings'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <SettingsMenu />
        </Card>
      );
    }
    if(this.state.menu.showNotation) {
      layoutComponents.push(
        <Card key='notation'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <Notation
            notation={this.props.notation}
            highlightNotation={this.props.notationHighlight}
            onClick={this.props.notationOnSelect}
          />
        </Card>
      );
    }
    if(this.state.menu.showStatus) {
      layoutComponents.push(
        <Card key='status'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <Status
            whitePlayerName={this.props.statusWhitePlayerName}
            whitePlayerType={this.props.statusWhitePlayerType}
            blackPlayerName={this.props.statusBlackPlayerName}
            blackPlayerType={this.props.statusBlackPlayerType}
            whiteActive={this.props.statusWhiteActive}
            isLoading={this.props.statusIsLoading}
            isLoadingPlayer={this.props.statusIsLoadingPlayer}
            isCheckmate={this.props.statusIsCheckmate}
            isFlagged={this.props.statusIsFlagged}
            isForfeit={this.props.statusIsForfeit}
            isStalemate={this.props.statusIsStalemate}
            isDraw={this.props.statusIsDraw}
            isCheck={this.props.statusIsCheck}
          />
        </Card>
      );
    }
    if(this.state.menu.showView) {
      layoutComponents.push(
        <Card key='view'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <ViewMenu
            onFlip={() => {
              var currentConfig = crConfig.get();
              crConfig.set({
                board: {
                  flipTimeline: !currentConfig.board.flipTimeline,
                  flipRank: !currentConfig.board.flipTimeline,
                  flipFile: !currentConfig.board.flipTimeline
                }
              }, this.context);
            }}
            onPresentZoom={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.zoom.present(true, false);
              }
            }}
            onFullboardZoom={() => {
              if(this.chessRendererRef.current && this.chessRendererRef.current.chessRenderer) {
                this.chessRendererRef.current.chessRenderer.zoom.fullBoard();
              }
            }}
          />
        </Card>
      );
    }
    if(this.state.menu.showSubmit) {
      layoutComponents.push(
        <Card key='submit'
          onMouseEnter={() => { crConfig.set({ app: { interactive: false } }, this.context); }}
          onMouseLeave={() => { crConfig.set({ app: { interactive: true } }, this.context); }}
        >
          <SubmitMenu
            canUndo={this.props.submitCanUndo}
            canSubmit={this.props.submitCanSubmit}
            onUndo={this.onUndo.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
          />
        </Card>
      );
    }
    return (
      <div
        ref={this.rootRef}
        style={{
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <div
          onTouchStart={() => { 
            if(!crConfig.get().app.interactive) {
              crConfig.set({ app: { interactive: true } }, this.context);
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Renderer
            ref={this.chessRendererRef}
            height={1}
            width={1}
            board={this.props.board}
            actionHistory={this.props.actionHistory}
            moveBuffer={this.props.moveBuffer}
            checks={this.props.checks}
            availableMoves={this.props.availableMoves}
            pastAvailableMoves={this.props.pastAvailableMoves}
            onMove={this.onMove.bind(this)}
          />
        </div>
        <Layout
          x={this.state.overlay.x}
          y={this.state.overlay.y}
          width={this.state.overlay.width}
          height={this.state.overlay.height}
        >
          {layoutComponents}
        </Layout>
        <Audio
          chessRendererRef={this.chessRendererRef}
          actionHistory={this.props.actionHistory}
          moveBuffer={this.props.moveBuffer}
          isEnd={this.props.statusIsCheckmate || this.props.statusIsStalemate}
        />
        <Hotkeys
          onUndo={this.props.submitCanUndo ? this.onUndo.bind(this) : null}
          onSubmit={this.props.submitCanSubmit ? this.onSubmit.bind(this) : null}
          onRestore={this.props.allowAnalyze ? this.props.analyzeOnRestore : null}
          onPreviousAction={this.props.allowAnalyze ? this.props.analyzeOnPreviousAction : null}
          onPreviousMove={this.props.allowAnalyze ? this.props.analyzeOnPreviousMove : null}
          onNextMove={this.props.allowAnalyze ? this.props.analyzeOnNextMove : null}
          onNextAction={this.props.allowAnalyze ? this.props.analyzeOnNextAction : null}
        />
      </div>
    );
  }
}