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
                checks={Array.isArray(this.props.checks) ?
                  this.props.checks.filter((e) => {
                    return e.end.timeline === this.props.timelineObj.timeline || e.start.timeline === this.props.timelineObj.timeline;
                  })
                :
                  []
                }
                x={this.props.onlyBlack || this.props.onlyWhite ?
                  x + (e.turn - 1) * 1000 + 100
                :
                  x + (((e.turn - 1) * 2) + (e.player === 'white' ? 0 : 1)) * 1000 + 100
                }
                y={(y + (this.props.flip ? -100 : 100))}
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
                x={((this.props.timelineObj.turns.filter((e) => {
                  if(this.props.onlyBlack) { return e.player === 'black'; }
                  else if(this.props.onlyWhite) { return e.player === 'white'; }
                  return true;
                }).sort((e2, e1) => {
                  return (e2.turn*2 + (e2.player === 'white' ? 0 : 1)) - (e1.turn*2 + (e1.player === 'white' ? 0 : 1));
                })[0].turn-1)*2 +
                (this.props.timelineObj.turns.filter((e) => {
                  if(this.props.onlyBlack) { return e.player === 'black'; }
                  else if(this.props.onlyWhite) { return e.player === 'white'; }
                  return true;
                }).sort((e2, e1) => {
                  return (e2.turn*2 + (e2.player === 'white' ? 0 : 1)) - (e1.turn*2 + (e1.player === 'white' ? 0 : 1));
                })[0].player === 'white' ? 0 : 1) 
                )*1000 + (this.props.x ? this.props.x + 40 : 40)}
                y={(this.props.y ? this.props.y : 0) + (this.props.flip ? -900 : 100)}
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
                x={((this.props.timelineObj.turns.filter((e) => {
                  if(this.props.onlyBlack) { return e.player === 'black'; }
                  else if(this.props.onlyWhite) { return e.player === 'white'; }
                  return true;
                }).sort((e1, e2) => {
                  return (e2.turn*2 + (e2.player === 'white' ? 0 : 1)) - (e1.turn*2 + (e1.player === 'white' ? 0 : 1));
                })[0].turn-1)*2 +
                (this.props.timelineObj.turns.filter((e) => {
                  if(this.props.onlyBlack) { return e.player === 'black'; }
                  else if(this.props.onlyWhite) { return e.player === 'white'; }
                  return true;
                }).sort((e1, e2) => {
                  return (e2.turn*2 + (e2.player === 'white' ? 0 : 1)) - (e1.turn*2 + (e1.player === 'white' ? 0 : 1));
                })[0].player === 'white' ? 0 : 1) 
                )*1000 + (this.props.x ? this.props.x + 960 : 960)}
                y={(this.props.y ? this.props.y : 0) + (this.props.flip ? -100 : 900)}
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
