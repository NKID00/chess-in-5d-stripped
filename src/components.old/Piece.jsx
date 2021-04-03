import React from 'react';

import { Sprite, Graphics } from 'react-pixi-fiber';
import BlackPawn from 'assets/b.png';
import BlackBishop from 'assets/bB.png';
import BlackKnight from 'assets/bN.png';
import BlackRook from 'assets/bR.png';
import BlackQueen from 'assets/bQ.png';
import BlackKing from 'assets/bK.png';
import WhitePawn from 'assets/w.png';
import WhiteBishop from 'assets/wB.png';
import WhiteKnight from 'assets/wN.png';
import WhiteRook from 'assets/wR.png';
import WhiteQueen from 'assets/wQ.png';
import WhiteKing from 'assets/wK.png';
import * as PIXI from 'pixi.js-legacy';

export default class Piece extends React.Component {
  pieceRef = React.createRef();
  highlightRef = React.createRef();
  draw() {
    if(this.props.pieceObj.player === 'white') {
      if(this.props.pieceObj.piece === 'B') {
        this.pieceRef.current.texture = PIXI.Texture.from(WhiteBishop);
      }
      else if(this.props.pieceObj.piece === 'N') {
        this.pieceRef.current.texture = PIXI.Texture.from(WhiteKnight);
      }
      else if(this.props.pieceObj.piece === 'R') {
        this.pieceRef.current.texture = PIXI.Texture.from(WhiteRook);
      }
      else if(this.props.pieceObj.piece === 'Q' || this.props.pieceObj.piece === 'P') {
        this.pieceRef.current.texture = PIXI.Texture.from(WhiteQueen);
      }
      else if(this.props.pieceObj.piece === 'K') {
        this.pieceRef.current.texture = PIXI.Texture.from(WhiteKing);
      }
      else {
        this.pieceRef.current.texture = PIXI.Texture.from(WhitePawn);
      }
    }
    else {
      if(this.props.pieceObj.piece === 'B') {
        this.pieceRef.current.texture = PIXI.Texture.from(BlackBishop);
      }
      else if(this.props.pieceObj.piece === 'N') {
        this.pieceRef.current.texture = PIXI.Texture.from(BlackKnight);
      }
      else if(this.props.pieceObj.piece === 'R') {
        this.pieceRef.current.texture = PIXI.Texture.from(BlackRook);
      }
      else if(this.props.pieceObj.piece === 'Q' || this.props.pieceObj.piece === 'P') {
        this.pieceRef.current.texture = PIXI.Texture.from(BlackQueen);
      }
      else if(this.props.pieceObj.piece === 'K') {
        this.pieceRef.current.texture = PIXI.Texture.from(BlackKing);
      }
      else {
        this.pieceRef.current.texture = PIXI.Texture.from(BlackPawn);
      }
    }
    var x = this.props.x ? this.props.x : 0;
    var y = this.props.y ? this.props.y : 0;
    var fill = this.props.palette.selectedPiece;
    var graphics = this.highlightRef.current;
    graphics.clear();
    if(this.props.selectedPiece) {
      graphics.beginFill(fill, 0.01);
      graphics.drawRect(x, y, 100, 100);
      graphics.endFill();
      graphics.beginFill(fill, 0.65);
      graphics.lineStyle(1, fill, 0);
      graphics.drawCircle(x + 50,y + 50, 40);
      graphics.endFill();
    }
  }
  componentDidMount() {
    this.pieceRef.current.buttonMode = true;
    this.pieceRef.current.interactive = true;
    this.pieceRef.current.roundPixels = false;
    this.highlightRef.current.buttonMode = true;
    this.highlightRef.current.interactive = true;
    this.draw();
  }
  componentDidUpdate(prevProps) {
    if(
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y ||
      prevProps.selectedPiece !== this.props.selectedPiece
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <>
        <Graphics ref={this.highlightRef}
          pointertap={(e) => {
            if(typeof this.props.onPieceClick === 'function') {
              this.props.onPieceClick(this.props.pieceObj);
            }
          }}
        />
        <Sprite
          ref={this.pieceRef}
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
          x={this.props.x}
          y={this.props.y}
          width={100}
          height={100}
          alpha={this.props.fade ? 0.35 : 1}
        />
      </>
    );
  }
}
