import React from 'react';
import { Graphics } from 'react-pixi-fiber';

const deepcompare = require('deep-compare');

export default class Piece extends React.Component {
  piecePoly = {
    base: [
      1,9.5,
      1,8.5,
      2,7.5,
      8,7.5,
      9,8.5,
      9,9.5
    ],
    middle: [
      3,7,
      3,5,
      7,5,
      7,7
    ],
    pawn: [
      3,4.5,
      2.5,3.5,
      4,2.5,
      6,2.5,
      7.5,3.5,
      7,4.5
    ],
    bishop: [
      3,4.5,
      2,3.5,
      5,1,
      8,3.5,
      7,4.5
    ],
    knight: [
      3,4.5,
      4.5,1,
      8,3.5,
      7,4.5
    ],
    rook: [
      3,4.5,
      1.5,2.5,
      8.5,2.5,
      7,4.5
    ],
    queen: [
      3,4.5,
      1.5,2,
      5,1,
      8.5,2,
      7,4.5
    ],
    king: [
      3,4.5,
      3.5,3,
      2,3,
      1.5,1.75,
      4,1.75,
      3.5,0.25,
      6.5,0.25,
      6,1.75,
      8.5,1.75,
      8,3,
      6.5,3,
      7,4.5
    ]
  };
  pieceRef = React.createRef();
  draw() {
    var x = this.props.x ? this.props.x : 0;
    var y = this.props.y ? this.props.y : 0;
    var fill = this.props.pieceObj.player === 'black' ?
      this.props.palette.blackPiece
    :
      this.props.palette.whitePiece
    ;
    var graphics = this.pieceRef.current;
    graphics.clear();
    graphics.beginFill(fill, 0.01);
    graphics.drawRect(x, y, 10, 10);
    graphics.endFill();
    graphics.beginFill(fill);
    graphics.lineStyle(1, this.props.palette.selectedPiece, this.props.selectedPiece ? 1 : 0);
    graphics.drawPolygon(this.piecePoly.base.map((e,i) => {
      return i % 2 === 0 ? e + x : e + y;
    }));
    graphics.endFill();
    graphics.beginFill(fill);
    graphics.drawPolygon(this.piecePoly.middle.map((e,i) => {
      return i % 2 === 0 ? e + x : e + y;
    }));
    graphics.endFill();
    graphics.beginFill(fill);
    if(this.props.pieceObj.piece === 'B') {
      graphics.drawPolygon(this.piecePoly.bishop.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.pieceObj.piece === 'N') {
      graphics.drawPolygon(this.piecePoly.knight.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.pieceObj.piece === 'R') {
      graphics.drawPolygon(this.piecePoly.rook.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.pieceObj.piece === 'Q') {
      graphics.drawPolygon(this.piecePoly.queen.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.pieceObj.piece === 'K') {
      graphics.drawPolygon(this.piecePoly.king.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else {
      graphics.drawPolygon(this.piecePoly.pawn.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    graphics.endFill();
  }
  componentDidMount() {
    this.draw();
    this.pieceRef.current.buttonMode = true;
    this.pieceRef.current.interactive = true;
  }
  componentDidUpdate(prevProps) {
    if(
      !deepcompare(prevProps.palette, this.props.palette) ||
      !deepcompare(prevProps.pieceObj, this.props.pieceObj) ||
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y ||
      prevProps.selectedPiece !== this.props.selectedPiece
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <Graphics ref={this.pieceRef}
        pointertap={(e) => {
          if(typeof this.props.onPieceClick === 'function') {
            this.props.onPieceClick(this.props.pieceObj);
          }
        }}
        pointerover={(e) => {
          if(typeof this.props.onPieceOver === 'function') {
            this.props.onPieceOver(this.props.pieceObj);
          }
        }}
        pointerout={(e) => {
          if(typeof this.props.onPieceOut === 'function') {
            this.props.onPieceOut(this.props.pieceObj);
          }
        }}
      />
    );
  }
}
