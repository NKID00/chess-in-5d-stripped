import React from 'react';

import { Graphics, Text } from 'react-pixi-fiber';
import Piece from 'components/Piece';
import Highlight from 'components/Highlight';

const deepcompare = require('deep-equal');

export default class Turn extends React.Component {
  overlayRef = React.createRef();
  turnRef = React.createRef();
  draw() {
    var x = this.props.x ? this.props.x : 0;
    var y = this.props.y ? this.props.y : 0;
    var graphics = this.turnRef.current;
    graphics.clear();
    graphics.beginFill(0x000000,0);
    if(this.props.active || this.props.present) {
      graphics.lineStyle(this.props.present ? 70 : 50,
        this.props.turnObj.player === 'white' ?
          this.props.palette.whiteBoardOutline
        :
          this.props.palette.blackBoardOutline,
      (this.props.turnObj.fade ? 0.35 : 1), (this.props.flip ? 0 : 1));
    }
    else {
      graphics.lineStyle(30, this.props.palette.inactiveBoardOutline, (this.props.turnObj.fade ? 0.35 : 1), (this.props.flip ? 0 : 1));
    }
    if(
      Array.isArray(this.props.checks) &&
      this.props.checks.filter((e) => {
        return (
          e.end.turn === this.props.turnObj.turn &&
          e.end.player === this.props.turnObj.player
        ) || (
          e.start.turn === this.props.turnObj.turn &&
          e.start.player === this.props.turnObj.player
        );
      }).length > 0
    ) {
      graphics.lineStyle(this.props.present ? 70 : 50, this.props.palette.checkBoardOutline, (this.props.turnObj.fade ? 0.35 : 1), (this.props.flip ? 0 : 1));
    }
    graphics.drawRect(x, y,
      (this.props.turnObj.width ? this.props.turnObj.width : 8) * 100,
      (this.props.turnObj.height ? this.props.turnObj.height : 8) * 100 * (this.props.flip ? -1 : 1));
    graphics.endFill();
    graphics.lineStyle(0);
    for(var i = 0;i < (this.props.turnObj.width ? this.props.turnObj.width : 8);i++) {
      for(var j = 0;j < (this.props.turnObj.height ? this.props.turnObj.height : 8);j++) {
        if(((i + j) % 2 === 0 && !this.props.flip) || ((i + j) % 2 !== 0 && this.props.flip)) {
          graphics.beginFill(this.props.palette.whiteSquare, (this.props.turnObj.fade ? 0.35 : 1));
          graphics.drawRect(x + (i * 100), y + (j * 100) * (this.props.flip ? -1 : 1), 100, 100 * (this.props.flip ? -1 : 1));
          graphics.endFill();
        }
        else {
          graphics.beginFill(this.props.palette.blackSquare, (this.props.turnObj.fade ? 0.35 : 1));
          graphics.drawRect(x + (i * 100), y + (j * 100) * (this.props.flip ? -1 : 1), 100, 100 * (this.props.flip ? -1 : 1));
          graphics.endFill();
        }
      }
    }
    graphics = this.overlayRef.current;
    graphics.clear();
    graphics.beginFill(0x000000,0.001);
    graphics.drawRect(x, y - ((this.props.turnObj.height ? this.props.turnObj.height : 8) * 100 * (this.props.flip ? 1 : 0)),
      (this.props.turnObj.width ? this.props.turnObj.width : 8) * 100,
      (this.props.turnObj.height ? this.props.turnObj.height : 8) * 100);
    graphics.endFill();
  }
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate(prevProps) {
    if(
      !deepcompare(prevProps.palette, this.props.palette) ||
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y ||
      prevProps.active !== this.props.active ||
      prevProps.present !== this.props.present ||
      !deepcompare(prevProps.checks, this.props.checks)
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <>
        <Graphics ref={this.turnRef}/>
        {typeof this.props.turnObj !== 'undefined' ?
          this.props.turnObj.pieces.map((e) => {
            if(this.props.fog) {
              var visible = e.player === this.props.fogMode;
              if(!visible) {
                for(var i = 0;i < this.props.allMoves.length;i++) {
                  var currMove = this.props.allMoves[i];
                  if(currMove.player === this.props.fogMode) {
                    if(
                      currMove.end.timeline === e.position.timeline &&
                      currMove.end.turn === e.position.turn &&
                      currMove.end.rank === e.position.rank &&
                      currMove.end.file === e.position.file &&
                      currMove.end.player === e.position.player
                    ) {
                      visible = true;
                    }
                  }
                }
              }
              if(!visible) {
                return null;
              }
            }
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Piece
                app={this.props.app}
                palette={this.props.palette}
                fade={this.props.turnObj.fade}
                x={x + (this.props.flip ? (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width : 8) - e.position.file : e.position.file - 1) * 100}
                y={y + (((this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height : 8) - e.position.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
                boardObj={this.props.boardObj}
                timelineObj={this.props.timelineObj}
                turnObj={this.props.turnObj}
                pieceObj={e}
                key={this.props.turnObj.turn + ':' + this.props.turnObj.player + ':' + e.piece + e.position.coordinate}
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
                selectedPiece={
                  this.props.selectedPiece &&
                  this.props.selectedPiece.piece + this.props.selectedPiece.position.coordinate === e.piece + e.position.coordinate
                }
              />
            );
          })
        :
          <></>
        }
        {Array.isArray(this.props.highlights) && typeof this.props.turnObj !== 'undefined' ?
          this.props.highlights.filter((e) => {
            return (
              e.end.turn === this.props.turnObj.turn &&
              e.end.player === this.props.turnObj.player
            );
          }).map((e) => {
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Highlight
                app={this.props.app}
                palette={this.props.palette}
                x={x + (this.props.flip ? (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width : 8) - e.end.file : e.end.file - 1) * 100}
                y={y + (((this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height : 8) - e.end.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
                moveObj={e}
                key={e.end.coordinate + 'cs'}
                onHighlightClick={(moveObj) => {
                  if(typeof this.props.onHighlightClick === 'function') {
                    this.props.onHighlightClick(moveObj);
                  }
                }}
                isCapture={this.props.turnObj.pieces.filter((e2) => {
                  return (
                    e.player !== e2.player &&
                    (e.enPassant === null ?
                      e.end.coordinate === e2.position.coordinate
                    :
                      e.enPassant.coordinate === e2.position.coordinate
                    )
                  );
                }).length > 0}
              />
            );
          })
        :
          <></>
        }
        {Array.isArray(this.props.hoverHighlights) && typeof this.props.turnObj !== 'undefined' ?
          this.props.hoverHighlights.filter((e) => {
            return (
              e.end.turn === this.props.turnObj.turn &&
              e.end.player === this.props.turnObj.player
            );
          }).map((e) => {
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Highlight
                app={this.props.app}
                palette={this.props.palette}
                x={x + (this.props.flip ? (this.props.boardObj && this.props.boardObj.width ? this.props.boardObj.width : 8) - e.end.file : e.end.file - 1) * 100}
                y={y + (((this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height : 8) - e.end.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
                moveObj={e}
                key={e.end.coordinate + 'h'}
                isHover
                isCapture={this.props.turnObj.pieces.filter((e2) => {
                  return (
                    e.player !== e2.player &&
                    (e.enPassant === null ?
                      e.end.coordinate === e2.position.coordinate
                    :
                      e.enPassant.coordinate === e2.position.coordinate
                    )
                  );
                }).length > 0}
              />
            );
          })
        :
          <></>
        }
        {this.props.turnLabel ?
          <Text
            text={'T' + this.props.turnObj.turn}
            style={{
              align: 'left',
              fill: this.props.palette.turnLabel,
              fontFamily: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
              fontWeight: 'bold',
              fontSize: 60
            }}
            x={this.props.x ? this.props.x + 0 : 0}
            y={(this.props.y ? this.props.y : 0) + (this.props.flip ? 70 : -130)}
          />
        :
          <></>
        }
        {this.props.boardLabel ?
          [0,1,2,3,4,5,6,7].map((e) => {
            return (
              <React.Fragment key={e + 'rf'}>
                <Text
                  text={String.fromCharCode(97+e)}
                  style={{
                    align: 'left',
                    fill: (Array.isArray(this.props.checks) &&
                    this.props.checks.filter((e) => {
                      return (
                        e.end.turn === this.props.turnObj.turn &&
                        e.end.player === this.props.turnObj.player
                      ) || (
                        e.start.turn === this.props.turnObj.turn &&
                        e.start.player === this.props.turnObj.player
                      );
                    }).length > 0) ?
                      this.props.palette.checkBoardLabel
                    : this.props.turnObj.player === 'white' ?
                      this.props.palette.whiteBoardLabel
                    :
                      this.props.palette.blackBoardLabel,
                    fontFamily: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
                    fontWeight: 'bold',
                    fontSize: 40
                  }}
                  key={e + 'f'}
                  x={(this.props.x ? this.props.x : 0) + ((this.props.flip ? 7 - e : e))*100}
                  y={this.props.y ?
                    this.props.y + (this.props.boardObj && this.props.boardObj.height * 100 ? this.props.boardObj.height * 100 : 800) * (this.props.flip ? -1 : 1) + (this.props.flip ? -50 : 0)
                  :
                    (this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 : 800) * (this.props.flip ? -1 : 1) + (this.props.flip ? -50 : 0)
                  }
                />
                <Text
                  text={e+1}
                  style={{
                    align: 'left',
                    fill: (Array.isArray(this.props.checks) &&
                    this.props.checks.filter((e) => {
                      return (
                        e.end.turn === this.props.turnObj.turn &&
                        e.end.player === this.props.turnObj.player
                      ) || (
                        e.start.turn === this.props.turnObj.turn &&
                        e.start.player === this.props.turnObj.player
                      );
                    }).length > 0) ?
                      this.props.palette.checkBoardLabel
                    : this.props.turnObj.player === 'white' ?
                      this.props.palette.whiteBoardLabel
                    :
                      this.props.palette.blackBoardLabel,
                    fontFamily: ['BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
                    fontWeight: 'bold',
                    fontSize: 40
                  }}
                  key={e + 'r'}
                  x={this.props.x ? this.props.x - 30 : -30}
                  y={this.props.y ?
                    this.props.y + ((this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 - 100 : 700) - e*100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)
                  :
                    ((this.props.boardObj && this.props.boardObj.height ? this.props.boardObj.height * 100 - 100 : 700) - e*100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)
                  }
                />
              </React.Fragment>
            );
          })
        :
          <></>
        }
        <Graphics ref={this.overlayRef}
          interactive={this.props.drawArrow}
          buttonMode={this.props.drawArrow}
          pointertap={(e) => {
            e = window.pixivp.toWorld(e.data.global.x, e.data.global.y);
            var point = {
              x: e.x,
              y: e.y
            };
            if(typeof this.props.onBoardClick === 'function') {
              this.props.onBoardClick(point);
            }
          }}
        />
      </>
    );
  }
}
