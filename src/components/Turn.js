import React from 'react';
import { Graphics } from 'react-pixi-fiber';
import Piece from 'components/Piece';
import Highlight from 'components/Highlight';

const deepcompare = require('deep-compare');

export default class Turn extends React.Component {
  turnRef = React.createRef();
  draw() {
    var x = this.props.x ? this.props.x : 0;
    var y = this.props.y ? this.props.y : 0;
    var graphics = this.turnRef.current;
    graphics.clear();
    graphics.beginFill(0x000000,0);
    if(this.props.active || this.props.present) {
      graphics.lineStyle(this.props.present ? 50 : 30,
        this.props.turnObj.player === 'white' ?
          this.props.palette.whiteBoardOutline
        :
          this.props.palette.blackBoardOutline,
      1, (this.props.flip ? 0 : 1));
    }
    else {
      graphics.lineStyle(10, this.props.palette.inactiveBoardOutline, 1, (this.props.flip ? 0 : 1));
    }
    if(
      Array.isArray(this.props.checksD) &&
      this.props.checksD.filter((e) => {
        return (
          e.end.turn === this.props.turnObj.turn &&
          e.end.player === this.props.turnObj.player
        );
      }).length > 0
    ) {
      graphics.lineStyle(this.props.present ? 50 : 30, this.props.palette.checkBoardOutline, 1, (this.props.flip ? 0 : 1));
    }
    graphics.drawRect(x, y, 800, 800 * (this.props.flip ? -1 : 1));
    graphics.endFill();
    graphics.lineStyle(0);
    for(var i = 0;i < 8;i++) {
      for(var j = 0;j < 8;j++) {
        if((i + j) % 2 === 0) {
          graphics.beginFill(this.props.palette.whiteSquare);
          graphics.drawRect(x + (i * 100), y + (j * 100) * (this.props.flip ? -1 : 1), 100, 100 * (this.props.flip ? -1 : 1));
          graphics.endFill();
        }
        else {
          graphics.beginFill(this.props.palette.blackSquare);
          graphics.drawRect(x + (i * 100), y + (j * 100) * (this.props.flip ? -1 : 1), 100, 100 * (this.props.flip ? -1 : 1));
          graphics.endFill();
        }
      }
    }
  }
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate(prevProps) {
    if(
      !deepcompare(prevProps.palette, this.props.palette) ||
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <>
        <Graphics ref={this.turnRef} />
        {typeof this.props.turnObj !== 'undefined' ?
          this.props.turnObj.pieces.map((e) => {
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Piece
                app={this.props.app}
                palette={this.props.palette}
                x={x + (e.position.file - 1) * 100}
                y={y + ((8 - e.position.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
                pieceObj={e}
                key={e.piece + e.position.coordinate}
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
        {Array.isArray(this.props.checksS) && typeof this.props.turnObj !== 'undefined' ?
          this.props.checksS.filter((e) => {
            return (
              e.start.turn === this.props.turnObj.turn &&
              e.start.player === this.props.turnObj.player
            );
          }).map((e) => {
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Highlight
                app={this.props.app}
                palette={this.props.palette}
                x={x + (e.start.file - 1) * 100}
                y={y + ((8 - e.start.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
                moveObj={e}
                key={e.start.coordinate}
                isCheckSource
              />
            );
          })
        :
          <></>
        }
        {Array.isArray(this.props.checksD) && typeof this.props.turnObj !== 'undefined' ?
          this.props.checksD.filter((e) => {
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
                x={x + (e.end.file - 1) * 100}
                y={y + ((8 - e.end.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
                moveObj={e}
                key={e.end.coordinate + 'cd'}
                isCheckDestination
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
                x={x + (e.end.file - 1) * 100}
                y={y + ((8 - e.end.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
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
                x={x + (e.end.file - 1) * 100}
                y={y + ((8 - e.end.rank) * 100) * (this.props.flip ? -1 : 1) + (this.props.flip ? -100 : 0)}
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
      </>
    );
  }
}
