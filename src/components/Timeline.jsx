import React from 'react';

import { Text } from 'react-pixi-fiber';
import Turn from 'components/Turn';

export default class Timeline extends React.Component {
  render() {
    return (
      typeof this.props.timelineObj !== 'undefined' ?
        <>
          {this.props.timelineObj.turns.filter((e) => {
            if(this.props.onlyBlack) {
              return e.player === 'black';
            }
            else if(this.props.onlyWhite) {
              return e.player === 'white';
            }
            return true;
          }).map((e) => {
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Turn
                app={this.props.app}
                palette={this.props.palette}
                hoverHighlights={Array.isArray(this.props.hoverHighlights) ?
                  this.props.hoverHighlights.filter((e) => {
                    return e.end.timeline === this.props.timelineObj.timeline;
                  })
                :
                  []
                }
                highlights={Array.isArray(this.props.highlights) ?
                  this.props.highlights.filter((e) => {
                    return e.end.timeline === this.props.timelineObj.timeline;
                  })
                :
                  []
                }
                checks={!this.props.fog && Array.isArray(this.props.checks) ?
                  this.props.checks.filter((e) => {
                    return e.end.timeline === this.props.timelineObj.timeline || e.start.timeline === this.props.timelineObj.timeline;
                  })
                :
                  []
                }
                x={this.props.onlyBlack || this.props.onlyWhite ?
                  x + (e.turn - 1) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) + 100
                :
                  x + (((e.turn - 1) * 2) + (e.player === 'white' ? 0 : 1)) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) + 100
                }
                y={(y + (this.props.flip ? -100 : 100))}
                boardObj={this.props.boardObj}
                timelineObj={this.props.timelineObj}
                turnObj={e}
                active={this.props.timelineObj.active}
                present={this.props.timelineObj.present}
                key={
                  e.turn +
                  ':' +
                  e.player +
                  ':' +
                  (this.props.timelineObj.active ? 'A' : '') +
                  (this.props.timelineObj.present ? 'P' : '')
                }
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
                  if(typeof this.props.onHighlightClick === 'function') {
                    this.props.onHighlightClick(moveObj);
                  }
                }}
                selectedPiece={
                  this.props.selectedPiece &&
                  this.props.selectedPiece.position.timeline === this.props.timelineObj.timeline &&
                  this.props.selectedPiece.position.turn === e.turn &&
                  this.props.selectedPiece.position.player === e.player ?
                    this.props.selectedPiece
                  :
                    null
                }
                flip={this.props.flip}
                turnLabel={this.props.turnLabel}
                boardLabel={this.props.boardLabel}
                drawArrow={this.props.drawArrow}
                fog={this.props.fog}
                fogMode={this.props.fogMode}
                allMoves={this.props.allMoves}
              />
            );
          })}
          {this.props.timelineLabel && this.props.timelineObj.turns.filter((e) => {
            if(this.props.onlyBlack) { return e.player === 'black'; }
            else if(this.props.onlyWhite) { return e.player === 'white'; }
            return true;
          }).length > 0 ?
            <>
              <Text
                text={this.props.timelineObj.timeline === 0 ?
                  '0L'
                : this.props.timelineObj.timeline > 0 ?
                  '+' + this.props.timelineObj.timeline + 'L'
                :
                  this.props.timelineObj.timeline + 'L'
                }
                style={{
                  align: 'left',
                  fill: this.props.palette.timelineLabel,
                  fontFamily: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
                  fontWeight: 'bold',
                  fontSize: 60
                }}
                rotation={Math.PI/2}
                x={(() => {
                  var turns = this.props.timelineObj.turns.filter((e) => {
                    if(this.props.onlyBlack) { return e.player === 'black'; }
                    else if(this.props.onlyWhite) { return e.player === 'white'; }
                    return true;
                  }).sort((e2, e1) => {
                    return (e2.turn*2 + (e2.player === 'white' ? 0 : 1)) - (e1.turn*2 + (e1.player === 'white' ? 0 : 1));
                  });

                  if(Array.isArray(turns) && turns.length > 0) {
                    var firstTurn = turns[0];
                    var onlyOne = (this.props.onlyWhite || this.props.onlyBlack);
                    if(onlyOne) {
                      return (firstTurn.turn-1) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) + (this.props.x ? this.props.x + 40 : 40);
                    }
                    return ((firstTurn.turn-1)*2 + (firstTurn.player === 'white' ? 0 : 1)) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) + (this.props.x ? this.props.x + 40 : 40);
                  }
                })()}
                y={(this.props.y ? this.props.y : 0) + (this.props.flip ? -(this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 100 : 900) : 100)}
              />
              <Text
                text={this.props.timelineObj.timeline === 0 ?
                  '0L'
                : this.props.timelineObj.timeline > 0 ?
                  '+' + this.props.timelineObj.timeline + 'L'
                :
                  this.props.timelineObj.timeline + 'L'
                }
                style={{
                  align: 'left',
                  fill: this.props.palette.timelineLabel,
                  fontFamily: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
                  fontWeight: 'bold',
                  fontSize: 60
                }}
                rotation={-Math.PI/2}
                x={(() => {
                  var turns = this.props.timelineObj.turns.filter((e) => {
                    if(this.props.onlyBlack) { return e.player === 'black'; }
                    else if(this.props.onlyWhite) { return e.player === 'white'; }
                    return true;
                  }).sort((e1, e2) => {
                    return (e2.turn*2 + (e2.player === 'white' ? 0 : 1)) - (e1.turn*2 + (e1.player === 'white' ? 0 : 1));
                  });

                  if(Array.isArray(turns) && turns.length > 0) {
                    var lastTurn = turns[0];
                    var onlyOne = (this.props.onlyWhite || this.props.onlyBlack);
                    if(onlyOne) {
                      return (lastTurn.turn-1) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) + (this.props.x ? this.props.x + 960 : 960);
                    }
                    return ((lastTurn.turn-1)*2 + (lastTurn.player === 'white' ? 0 : 1)) * (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width * 100 + 200 : 1000) + (this.props.x ? this.props.x + 960 : 960);
                  }
                })()}
                y={(this.props.y ? this.props.y : 0) + (this.props.flip ? -100 : (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 + 100 : 900))}
              />
            </>
          :
            <></>
          }
        </>
      :
        <></>
    );
  }
}
