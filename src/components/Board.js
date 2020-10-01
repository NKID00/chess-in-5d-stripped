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
    height: window.innerHeight
  }
  resizeListener = (() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
  getFocusedBoard() {
    var res = {
      x: 50,
      y: 50
    };
    if(typeof this.props.boardObj !== 'undefined') {
      var actives = this.props.boardObj.timelines.filter((e) => { return e.present; });
      if(actives.length <= 0) {
        actives = this.props.boardObj.timelines.filter((e) => { return e.active; });
      }
      if(actives.length > 0) {
        var lowestTurnLength = actives[0].length;
        var index = 0;
        for(var i = 0;i < actives.length;i++) {
          if(lowestTurnLength > actives[i].length) {
            lowestTurnLength = actives[i].length;
            index = i;
          }
        }
        var highestTurn = 0;
        for(var i = 0;i < actives[index].turns.length;i++) { // eslint-disable-line no-redeclare
          if(highestTurn <
            (actives[index].turns[i].turn + (actives[index].turns[i].player === 'white' ? 0 : 1))
          ) {
            highestTurn = actives[index].turns[i].turn + (actives[index].turns[i].player === 'white' ? 0 : 1);
          }
        }
        res.x = (highestTurn - 1) * 100;
        res.x += 50;
        res.y = (actives[index].timeline - this.props.boardObj.timelines.reduce((a, c) => {
          return a > c.timeline ? c.timeline : a;
        })) * 100;
        res.y += 50;
      }
    }
    return res;
  }
  componentDidMount() {
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
              worldHeight={typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.length * 100
              :
                100
              }
              worldWidth={typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.map((e) => {
                  return e.turns.reduce((a, c) => {
                    return a < c.turn + (c.player === 'white' ? 0 : 1) ? c.turn + (c.player === 'white' ? 0 : 1) : a;
                  }) * 100;
                }).reduce((a, c) => {
                  return a < c ? c : a;
                })
              :
                100
              }
              snapX={typeof this.props.boardObj !== 'undefined' ?
                this.getFocusedBoard().x
              :
                50
              }
              snapY={typeof this.props.boardObj !== 'undefined' ?
                this.getFocusedBoard().y
              :
                50
              }
              zoomHeight={133}
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
                        (e.timeline - this.props.boardObj.timelines.reduce((a, c) => {
                          return a > c.timeline ? c.timeline : a;
                        })) * 100
                      }
                      timelineObj={e}
                      key={e.timeline}
                      onPieceClick={(piece) => {
                        if(typeof this.props.onPieceClick === 'function') {
                          this.props.onPieceClick(piece);
                        }
                      }}
                      onHighlightClick={(moveObj) => {
                        if(typeof this.props.onHighlightClick === 'function') {
                          this.props.onHighlightClick(moveObj);
                        }
                      }}
                      selectedPiece={this.props.selectedPiece}
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
