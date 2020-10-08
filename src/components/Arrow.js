import React from 'react';
import { Graphics } from 'react-pixi-fiber';

const deepcompare = require('deep-compare');

export default class Arrow extends React.Component {
  arrowRef = React.createRef();
  draw() {
    var sx = this.props.sx ? this.props.sx : 0;
    var sy = this.props.sy ? this.props.sy : 0;
    var tx = this.props.tx ? this.props.tx : 0;
    var ty = this.props.ty ? this.props.ty : 0;
    var line = this.props.isCapture ?
      this.props.palette.captureArrow
    : this.props.isCheck ?
      this.props.palette.checkArrow
    :
      this.props.palette.moveArrow
    ;
    var headlen = 50;
    var dx = tx - sx;
    var dy = ty - sy;
    var angle = Math.atan2(dy, dx);
    var graphics = this.arrowRef.current;
    graphics.clear();
    var arrow = () => {
      graphics.moveTo(sx, sy);
      graphics.lineTo(tx, ty);
      graphics.closePath();
      graphics.moveTo(tx, ty);
      graphics.lineTo(tx - headlen * Math.cos(angle - Math.PI / 6), ty - headlen * Math.sin(angle - Math.PI / 6));
      graphics.closePath();
      graphics.moveTo(tx, ty);
      graphics.lineTo(tx - headlen * Math.cos(angle + Math.PI / 6), ty - headlen * Math.sin(angle + Math.PI / 6));
      graphics.closePath();
    }
    graphics.lineStyle(20, (this.props.moveObj.player === 'white' ?
      this.props.palette.whiteArrowOutline
    :
      this.props.palette.blackArrowOutline
    ), 1, 0.5);
    arrow();
    graphics.lineStyle(10, line, 1, 0.5);
    arrow();
  }
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate(prevProps) {
    if(
      !deepcompare(prevProps.palette, this.props.palette) ||
      prevProps.sx !== this.props.sx ||
      prevProps.sy !== this.props.sy ||
      prevProps.tx !== this.props.tx ||
      prevProps.ty !== this.props.ty ||
      prevProps.isCapture !== this.props.isCapture ||
      prevProps.isCheck !== this.props.isCheck
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <Graphics ref={this.arrowRef} />
    );
  }
}
