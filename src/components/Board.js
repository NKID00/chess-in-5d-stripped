import React from 'react';
import Timeline from 'components/Timeline';
import { Stage, AppContext } from 'react-pixi-fiber';
import Viewport from 'components/Viewport';

const defaultPalette = {
  background: 0xffffff,
  whitePiece: 0xffffff,
  blackPiece: 0x000000,
  whiteSquare: 0xaaaaaa,
  blackSquare: 0x555555,
  selectedPiece: 0x0000ff,
  moveHighlight: 0x00ff00,
  captureHighlight: 0xff0000,
  checkSourceHighlight: 0xff0000,
  checkDestinationHighlight: 0xff0000,
  whiteBoardOutline: 0xdddddd,
  blackBoardOutline: 0x222222,
  checkBoardOutline: 0xff0000
};

export default class Board extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    snapX: 500,
    snapY: 500,
    triggerDate: Date.now()
  }
  resizeListener = (() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
  recenter() {
    var res = {
      snapX: 500,
      snapY: 500
    };
    if(typeof this.props.boardObj !== 'undefined') {
      var actives = this.props.boardObj.timelines.filter((e) => { return e.present; });
      if(actives.length <= 0) {
        actives = this.props.boardObj.timelines.filter((e) => { return e.active; });
      }
      if(actives.length > 0) {
        var lowestTurnLength = actives[0].turns.length;
        var index = 0;
        for(var i = 0;i < actives.length;i++) {
          if(lowestTurnLength > actives[i].turns.length) {
            lowestTurnLength = actives[i].turns.length;
            index = i;
          }
        }
        var highestTurn = 0;
        for(var i = 0;i < actives[index].turns.length;i++) { // eslint-disable-line no-redeclare
          if(highestTurn <
            (actives[index].turns[i].turn*2 + (actives[index].turns[i].player === 'white' ? 0 : 1))
          ) {
            highestTurn = actives[index].turns[i].turn*2 + (actives[index].turns[i].player === 'white' ? 0 : 1);
          }
        }
        res.snapX = (highestTurn - 1) * 1000;
        res.snapX -= 500;
        res.snapY = (actives[index].timeline - this.props.boardObj.timelines.map((e) => { return e.timeline; }).reduce((a, c) => {
          return a > c ? c : a;
        })) * 1000;
        res.snapY += 500;
      }
    }
    this.setState(res);
    this.setState({triggerDate: Date.now()})
  }
  componentDidMount() {
    this.recenter();
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <Stage
        options={{
          height: this.state.height,
          width: this.state.width,
          backgroundColor: (this.props.palette ?
            this.props.palette.background
          :
            defaultPalette.background
          )
        }}
        style={{
          left: 0,
          top: 0,
          position: 'absolute',
          zIndex: -100
        }}
      >
        <AppContext.Consumer>
          {app =>
            <Viewport
              app={app}
              drag
              pinch
              wheel
              decelerate
              blur={this.props.blur}
              worldHeight={typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.length * 100
              :
                100
              }
              worldWidth={typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.map((e) => {
                  if(e.turns.length <= 0) { return 0; }
                  return e.turns.reduce((a, c) => {
                    return a < c.turn + (c.player === 'white' ? 0 : 1) ? c.turn + (c.player === 'white' ? 0 : 1) : a;
                  }, e.turns[0].turn + (e.turns[0].player === 'white' ? 0 : 1)) * 100;
                }).reduce((a, c) => {
                  return a < c ? c : a;
                })
              :
                100
              }
              snapX={this.state.snapX}
              snapY={this.state.snapY}
              triggerDate={this.state.triggerDate}
            >
              {typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.map((e) => {
                  return (
                    <Timeline
                      app={app}
                      palette={this.props.palette ? this.props.palette : defaultPalette}
                      x={this.props.x ? this.props.x : 0}
                      y={
                        (this.props.x ? this.props.x : 0) +
                        (e.timeline - this.props.boardObj.timelines.map((e) => { return e.timeline; }).reduce((a, c) => {
                          return a > c ? c : a;
                        })) * 100
                      }
                      timelineObj={e}
                      key={e.timeline}
                      onPieceClick={(piece) => {
                        if(typeof this.props.onPieceClick === 'function') {
                          this.props.onPieceClick(piece);
                        }
                      }}
                      onPieceOver={(piece) => {
                        if(typeof this.props.onPieceOver === 'function') {
                          this.props.onPieceOver(piece);
                        }
                      }}
                      onPieceOut={(piece) => {
                        if(typeof this.props.onPieceOut === 'function') {
                          this.props.onPieceOut(piece);
                        }
                      }}
                      onHighlightClick={(moveObj) => {
                        if(typeof this.props.onHighlightClick === 'function') {
                          this.props.onHighlightClick(moveObj);
                        }
                      }}
                      selectedPiece={this.props.selectedPiece}
                      hoverHighlights={this.props.hoverHighlights}
                      highlights={this.props.highlights}
                      checks={this.props.checks}
                    />
                  );
                })
              :
                <></>
              }
            </Viewport>
          }
        </AppContext.Consumer>
      </Stage>
    );
  }
}
