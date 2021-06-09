import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AnalyzeMenu from 'components/Player/AnalyzeMenu';
import Clock from 'components/Player/Clock';
import DrawMenu from 'components/Player/DrawMenu';
import Layout from 'components/Player/Layout';
import Menu from 'components/Player/Menu';
import Notation from 'components/Player/Notation';
import Renderer from 'components/Player/Renderer';
import SubmitMenu from 'components/Player/SubmitMenu';
import TutorialMenu from 'components/Player/TutorialMenu';
import ViewMenu from 'components/Player/ViewMenu';

import EmitterContext from 'EmitterContext';
import * as crConfig from 'state/config';

/*
Basic Props:
 - board
 - actionHistory
 - moveBuffer
 - checks
 - availableMoves
 - pastAvailableMoves
 - onMove
 - onUndo
 - onSubmit

Notation Props:
 - notation
 - notationHighlight
 - notationOnSelect

Analyze Props:
 - allowAnalyze
 - analyzeOnPreviousAction
 - analyzeOnPreviousMove
 - analyzeOnNextAction
 - analyzeOnNextMove

Clock Props:
 - allowClock
 - clockWhiteTimeLeft
 - clockWhiteDelayLeft
 - clockBlackTimeLeft
 - clockBlackDelayLeft
 - clockWhiteActive

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
    rowOffset: 0,
    menu: {
      showSubmit: true,
      showView: true,
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
      var top = this.rootRef.current.getBoundingClientRect().top;
      if(top !== this.state.rowOffset) {
        this.setState({
          rowOffset: top
        })
      }
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    var layoutComponents = [];
    layoutComponents.push(
      <Card key='menu'>
        <Menu
          {...this.state.menu}
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
        <Card key='clock'>
          <Clock
            whiteTimeLeft={this.props.clockWhiteTimeLeft}
            whiteDelayLeft={this.props.clockWhiteDelayLeft}
            blackTimeLeft={this.props.clockBlackTimeLeft}
            blackDelayLeft={this.props.clockBlackDelayLeft}
            whiteActive={this.props.clockWhiteActive}
          />
        </Card>
      );
    }
    if(this.state.menu.showAnalyze && this.props.allowTutorial) {
      layoutComponents.push(
        <Card key='analyze'>
          <AnalyzeMenu
            onPreviousAction={this.props.analyzeOnPreviousAction}
            onPreviousMove={this.props.analyzeOnPreviousMove}
            onNextAction={this.props.analyzeOnNextAction}
            onNextMove={this.props.analyzeOnNextMove}
          />
        </Card>
      );
    }
    if(this.state.menu.showTutorial && this.props.allowTutorial) {
      layoutComponents.push(
        <Card key='tutorial'>
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
        <Card key='draw'>
          <DrawMenu
            onEnableDraw={(type, middle) => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.enableCustomArrowMode(type, middle);
              }
            }}
            onDisableDraw={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.disableCustomArrowMode();
              }
            }}
            onEnableErase={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.enableEraseMode();
              }
            }}
            onDisableErase={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.disableEraseMode();
              }
            }}
            onUndo={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.undo();
              }
            }}
            onClear={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.render.customArrowManager.wipe();
              }
            }}
          />
        </Card>
      );
    }
    if(this.state.menu.showSettings) {
      layoutComponents.push(
        <Card key='settings'>
          <CardContent>Settings</CardContent>
        </Card>
      );
    }
    if(this.state.menu.showNotation) {
      layoutComponents.push(
        <Card key='notation'>
          <Notation
            notation={this.props.notation}
            highlightNotation={this.props.notationHighlight}
            onClick={this.props.notationOnSelect}
          />
        </Card>
      );
    }
    if(this.state.menu.showView) {
      layoutComponents.push(
        <Card key='view'>
          <ViewMenu
            onFlip={() => {
              var currentConfig = crConfig.get();
              crConfig.set({
                board: {
                  flipTimeline: !currentConfig.board.flipTimeline,
                  flipRank: !currentConfig.board.flipRank
                }
              }, this.context);
            }}
            onPresentZoom={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.zoom.present(true, false);
              }
            }}
            onFullboardZoom={() => {
              if(this.chessRendererRef.current) {
                this.chessRendererRef.current.chessRenderer.zoom.fullBoard();
              }
            }}
          />
        </Card>
      );
    }
    if(this.state.menu.showSubmit) {
      layoutComponents.push(
        <Card key='submit'>
          <SubmitMenu
            onUndo={this.props.onUndo}
            onSubmit={this.props.onSubmit}
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
            onMove={this.props.onMove}
          />
        </div>
        <Layout rowOffset={this.state.rowOffset}>
          {layoutComponents}
        </Layout>
      </div>
    );
  }
}