import React from 'react';
import { Graphics } from 'react-pixi-fiber';

export default class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.piecePoly = {
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
    this.pieceRef = React.createRef();
  }
  draw() {
    var x = this.props.x ? this.props.x : 0;
    var y = this.props.y ? this.props.y : 0;
    var fill = this.props.player === 'black' ? 0x000000 : 0xffffff;
    var graphics = this.pieceRef.current;
    graphics.clear();
    graphics.beginFill(fill);
    graphics.lineStyle(1, fill, 0);
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
    if(this.props.type === 'B') {
      graphics.drawPolygon(this.piecePoly.bishop.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.type === 'N') {
      graphics.drawPolygon(this.piecePoly.knight.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.type === 'R') {
      graphics.drawPolygon(this.piecePoly.rook.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.type === 'Q') {
      graphics.drawPolygon(this.piecePoly.queen.map((e,i) => {
        return i % 2 === 0 ? e + x : e + y;
      }));
    }
    else if(this.props.type === 'K') {
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
  }
  componentDidUpdate(prevProps) {
    if(
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y ||
      prevProps.player !== this.props.player ||
      prevProps.type !== this.props.type
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <Graphics ref={this.pieceRef} />
    );
  }
}
