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
    for(var i = 0;i < 8;i++) {
      for(var j = 0;j < 8;j++) {
        if((i + j) % 2 !== 0) {
          graphics.beginFill(this.props.palette.whiteSquare);
          graphics.drawRect(x + (i * 10), y + (j * 10), 10, 10);
          graphics.endFill();
        }
        else {
          graphics.beginFill(this.props.palette.blackSquare);
          graphics.drawRect(x + (i * 10), y + (j * 10), 10, 10);
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
        <Graphics
          app={this.props.app}
          ref={this.turnRef}
        />
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
                x={x + (e.end.file - 1) * 10}
                y={y + (8 - e.end.rank) * 10}
                moveObj={e}
                key={e.end.coordinate}
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
        {typeof this.props.turnObj !== 'undefined' ?
          this.props.turnObj.pieces.map((e) => {
            var x = this.props.x ? this.props.x : 0;
            var y = this.props.y ? this.props.y : 0;
            return (
              <Piece
                app={this.props.app}
                palette={this.props.palette}
                x={x + (e.position.file - 1) * 10}
                y={y + (8 - e.position.rank) * 10}
                pieceObj={e}
                key={e.piece + e.position.coordinate}
                onPieceClick={(piece) => {
                  if(typeof this.props.onPieceClick === 'function') {
                    this.props.onPieceClick(piece);
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
      </>
    );
  }
}
