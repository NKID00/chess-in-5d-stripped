import React from 'react';

import Timeline from 'components/Timeline';
import Arrow from 'components/Arrow';
import { Stage, AppContext } from 'react-pixi-fiber';
import Viewport from 'components/Viewport';
import Options from 'Options';
import Promotion from './Promotion';

export default class Board extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    snapX: 500,
    snapY: 500,
    zoomHeight: 1500,
    triggerDate: Date.now(),
    triggerPromote: false,
    promotionObj: {}
  };
  resizeListener = (() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
  recenter() {
    var res = {
      snapX: (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)/2,
      snapY: (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000)/2,
      zoomHeight: (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000)*1.5
    };
    if(typeof this.props.boardObj !== 'undefined') {
      var actives = this.props.boardObj.timelines.filter((e) => { return e.present; });
      if(actives.length <= 0) {
        actives = this.props.boardObj.timelines.filter((e) => { return e.active; });
      }
      if(actives.length > 0) {
        var lowestTurnLength = actives[0].turns.filter((e) => {
          return (this.props.onlyBlack && e.player === 'black') || (this.props.onlyWhite && e.player === 'white') || (!this.props.onlyBlack === !this.props.onlyWhite);
        }).length;
        var index = 0;
        for(var i = 0;i < actives.length;i++) {
          var currActiveTurns = actives[i].turns.filter((e) => {
            return (this.props.onlyBlack && e.player === 'black') || (this.props.onlyWhite && e.player === 'white') || (!this.props.onlyBlack === !this.props.onlyWhite);
          });
          if(lowestTurnLength > currActiveTurns.length) {
            lowestTurnLength = currActiveTurns.length;
            index = i;
          }
        }
        var highestTurn = 0;
        var currActiveTurns = actives[index].turns.filter((e) => { // eslint-disable-line no-redeclare
          return (this.props.onlyBlack && e.player === 'black') || (this.props.onlyWhite && e.player === 'white') || (!this.props.onlyBlack && !this.props.onlyWhite);
        });
        for(var i = 0;i < currActiveTurns.length;i++) { // eslint-disable-line no-redeclare
          if(!this.props.onlyBlack && !this.props.onlyWhite) {
            if(highestTurn < (currActiveTurns[i].turn*2 + (currActiveTurns[i].player === 'white' ? 0 : 1))) {
              highestTurn = currActiveTurns[i].turn*2 + (currActiveTurns[i].player === 'white' ? 0 : 1);
            }
          }
          else {
            if(highestTurn < currActiveTurns[i].turn + 1) {
              highestTurn = currActiveTurns[i].turn + 1;
            }
          }
        }
        res.snapX = (highestTurn - 1) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000);
        res.snapX -= (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)/2;
        res.snapY = (actives[index].timeline - this.props.boardObj.timelines.map((e) => { return e.timeline; }).reduce((a, c) => {
          return a > c ? c : a;
        })) * (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000);
        res.snapY += (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000)/2;
      }
    }
    if(typeof this.props.allowRecenter === 'undefined' || this.props.allowRecenter) {
      this.setState(res);
      this.setState({triggerDate: Date.now()});
    }
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
      <>
        <Promotion
          open={this.state.triggerPromote}
          moveObj={this.state.promotionObj}
          onClose={() => {
            this.setState({ triggerPromote: false });
          }}
          onPromote={(piece) => {
            var newMoveObj = Object.assign({}, this.state.promotionObj);
            newMoveObj.promotion = piece;
            if(typeof this.props.onHighlightClick === 'function') {
              this.props.onHighlightClick(newMoveObj);
            }
            this.setState({ triggerPromote: false });
          }}
        />
        <Stage
          options={{
            height: this.state.height,
            width: this.state.width,
            backgroundColor: Options.get('palette').background,
            clearBeforeRender: true
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
                  this.props.boardObj.timelines.length * (this.props.flip ? -1 : 1) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)
                :
                  (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)
                }
                worldWidth={typeof this.props.boardObj !== 'undefined' ?
                  this.props.boardObj.timelines.map((e) => {
                    if(e.turns.length <= 0) { return 0; }
                    return e.turns.reduce((a, c) => {
                      return a < c.turn + (c.player === 'white' ? 0 : 1) ? c.turn + (c.player === 'white' ? 0 : 1) : a;
                    }, e.turns[0].turn + (e.turns[0].player === 'white' ? 0 : 1)) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000);
                  }).reduce((a, c) => {
                    return a < c ? c : a;
                  })
                :
                  (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)
                }
                snapX={this.state.snapX}
                snapY={this.state.snapY * (this.props.flip ? -1 : 1)}
                zoomHeight={this.state.zoomHeight}
                triggerDate={this.state.triggerDate}
              >
                {typeof this.props.boardObj !== 'undefined' ?
                  this.props.boardObj.timelines.map((e) => {
                    return (
                      <Timeline
                        app={app}
                        palette={Options.get('palette')}
                        x={this.props.x ? this.props.x : 0}
                        y={
                          (this.props.y ? this.props.y : 0) +
                          (e.timeline - this.props.boardObj.timelines.filter((e) => {
                            return e.turns.filter((e2) => {
                              return (this.props.onlyWhite && e2.player === 'white') || (this.props.onlyBlack && e2.player === 'black') || (!this.props.onlyWhite && !this.props.onlyBlack);
                            }).length > 0;
                          }).map((e) => { return e.timeline; }).reduce((a, c) => {
                            return a > c ? c : a;
                          })) * (this.props.flip ? -1 : 1) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)
                        }
                        
                        boardObj={this.props.boardObj}
                        timelineObj={e}
                        key={e.timeline}
                        onBoardClick={(e) => {
                          if(typeof this.props.onBoardClick === 'function') {
                            this.props.onBoardClick(e);
                          }
                        }}
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
                          if(moveObj.promotion === null) {
                            if(typeof this.props.onHighlightClick === 'function') {
                              this.props.onHighlightClick(moveObj);
                            }
                          }
                          else {
                            this.setState({ triggerPromote: true, promotionObj: moveObj });
                          }
                        }}
                        selectedPiece={this.props.selectedPiece}
                        hoverHighlights={this.props.hoverHighlights}
                        highlights={this.props.highlights}
                        checks={this.props.checks}
                        onlyBlack={this.props.onlyBlack}
                        onlyWhite={this.props.onlyWhite}
                        flip={this.props.flip}
                        timelineLabel={this.props.timelineLabel}
                        turnLabel={this.props.turnLabel}
                        boardLabel={this.props.boardLabel}
                        drawArrow={this.props.drawArrow}
                        fog={this.props.fog}
                        fogMode={this.props.fogMode}
                        allMoves={this.props.allMoves}
                      />
                    );
                  })
                :
                  <></>
                }
                {Array.isArray(this.props.moveArrows) ?
                  this.props.moveArrows.filter((e2) => {
                    if((e2.start.timeline !== e2.end.timeline || e2.start.turn > e2.end.turn) && this.props.moveShow !== 'none') { return true; }
                    return this.props.moveShow === 'all';
                  }).filter((e2) => {
                    return (this.props.onlyWhite && e2.player === 'white') || (this.props.onlyBlack && e2.player === 'black') || (!this.props.onlyWhite && !this.props.onlyBlack);
                  }).map((e) => {
                    var lowestTimeline = this.props.boardObj.timelines.filter((e) => {
                      return e.turns.filter((e2) => {
                        return (this.props.onlyWhite && e2.player === 'white') || (this.props.onlyBlack && e2.player === 'black') || (!this.props.onlyWhite && !this.props.onlyBlack);
                      }).length > 0;
                    }).map((e) => { return e.timeline; }).reduce((a, c) => {
                      return a > c ? c : a;
                    });
                    var onlyOne = (this.props.onlyWhite || this.props.onlyBlack);
                    if(e.isNew && onlyOne) { return <></>; }
                    return (
                      <Arrow
                        palette={Options.get('palette')}
                        sx={(e.start.turn - 1) * (onlyOne ? 1 : 2) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) +
                          (e.player === 'white' ? 0 : (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) + 150 +
                          (onlyOne ? (e.player === 'white' ? 0 : -(this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) : 0) +
                          (this.props.flip ? 8 - e.start.file : e.start.file - 1) * 100}
                        sy={((e.start.timeline - lowestTimeline) * (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000) +
                          150 + (8 - e.start.rank) * 100) * (this.props.flip ? -1 : 1)}
                        tx={(e.end.turn - 1) * (onlyOne ? 1 : 2) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) +
                          (e.player === 'white' ? 0 : (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) +
                          150 + (onlyOne ? (e.player === 'white' ? 0 : -(this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) : 0) +
                          (e.isNew ? (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) : 0) + (this.props.flip ? 8 - e.end.file : e.end.file - 1) * 100}
                        ty={((e.end.timeline - lowestTimeline) * (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000) +
                          150 + (8 - e.end.rank) * 100) * (this.props.flip ? -1 : 1)}
                        moveObj={e}
                        key={JSON.stringify(e)}
                      />
                    );
                  })
                :
                  <></>
                }
                {!this.props.fog && Array.isArray(this.props.checks) ?
                  this.props.checks.filter((e2) => {
                    return this.props.boardObj.timelines.filter((e) => { return e.timeline === e2.start.timeline; }).filter((e3) => {
                      return e3.turns.filter((e4) => { return e4.turn === e2.start.turn && e4.player === e2.start.player; }).length > 0;
                    }).length > 0 &&
                    this.props.boardObj.timelines.filter((e) => { return e.timeline === e2.end.timeline; }).filter((e3) => {
                      return e3.turns.filter((e4) => { return e4.turn === e2.end.turn && e4.player === e2.start.player; }).length > 0;
                    }).length > 0;
                  }).filter((e2) => {
                    return (this.props.onlyWhite && e2.player === 'white') || (this.props.onlyBlack && e2.player === 'black') || (!this.props.onlyWhite && !this.props.onlyBlack);
                  }).map((e) => {
                    var lowestTimeline = this.props.boardObj.timelines.filter((e) => {
                      return e.turns.filter((e2) => {
                        return (this.props.onlyWhite && e2.player === 'white') || (this.props.onlyBlack && e2.player === 'black') || (!this.props.onlyWhite && !this.props.onlyBlack);
                      }).length > 0;
                    }).map((e) => { return e.timeline; }).reduce((a, c) => {
                      return a > c ? c : a;
                    });
                    var onlyOne = (this.props.onlyWhite || this.props.onlyBlack);
                    return (
                      <Arrow
                        palette={Options.get('palette')}
                        sx={(e.start.turn - 1) * (onlyOne ? 1 : 2) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) +
                          (e.player === 'white' ? 0 : (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) + 150 +
                          (onlyOne ? (e.player === 'white' ? 0 : -(this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) : 0) +
                          (this.props.flip ? 8 - e.start.file : e.start.file - 1) * 100}
                        sy={((e.start.timeline - lowestTimeline) * (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000) +
                          150 + (8 - e.start.rank) * 100) * (this.props.flip ? -1 : 1)}
                        tx={(e.end.turn - 1) * (onlyOne ? 1 : 2) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) +
                          (e.player === 'white' ? 0 : (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) +
                          150 + (onlyOne ? (e.player === 'white' ? 0 : -(this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000)) : 0) +
                          (e.isNew ? (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) : 0) + (this.props.flip ? 8 - e.end.file : e.end.file - 1) * 100}
                        ty={((e.end.timeline - lowestTimeline) * (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 200 : 1000) +
                          150 + (8 - e.end.rank) * 100) * (this.props.flip ? -1 : 1)}
                        moveObj={e}
                        key={JSON.stringify(e)}
                        isCheck
                      />
                    );
                  })
                :
                  <></>
                }
                {Array.isArray(this.props.drawArrows) ?
                  this.props.drawArrows.map((e) => {
                    return (
                      <Arrow
                        color={e.color}
                        sx={e.start.x}
                        sy={e.start.y}
                        tx={e.end.x}
                        ty={e.end.y}
                        key={JSON.stringify(e)}
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
      </>
    );
  }
}
