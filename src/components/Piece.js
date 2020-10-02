import React from 'react';
import { Graphics } from 'react-pixi-fiber';

const deepcompare = require('deep-compare');

export default class Piece extends React.Component {
  piecePoly = {
    base: [
      10,95,
      10,85,
      20,75,
      80,75,
      90,85,
      90,95
    ],
    middle: [
      30,70,
      30,50,
      70,50,
      70,70
    ],
    pawn: [
      30,45,
      25,35,
      40,25,
      60,25,
      75,35,
      70,45
    ],
    bishop: [
      30,45,
      20,35,
      50,10,
      80,35,
      70,45
    ],
    knight: [
      30,45,
      45,10,
      80,35,
      70,45
    ],
    rook: [
      30,45,
      15,25,
      85,25,
      70,45
    ],
    queen: [
      30,45,
      15,20,
      50,10,
      85,20,
      70,45
    ],
    king: [
      30,45,
      35,30,
      20,30,
      15,17.5,
      40,17.5,
      35,2.5,
      65,2.5,
      60,17.5,
      85,17.5,
      80,30,
      65,30,
      70,45
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
    graphics.drawRect(x, y, 100, 100);
    graphics.endFill();
    graphics.beginFill(fill);
    graphics.lineStyle(5, this.props.palette.selectedPiece, this.props.selectedPiece ? 1 : 0);
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
