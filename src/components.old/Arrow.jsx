import React from 'react';
import { Graphics } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js-legacy';

const deepcompare = require('deep-equal');

export default class Arrow extends React.Component {
  arrowRef = React.createRef();
  draw() {
    var sx = this.props.sx ? this.props.sx : 0;
    var sy = this.props.sy ? this.props.sy : 0;
    var tx = this.props.tx ? this.props.tx : 0;
    var ty = this.props.ty ? this.props.ty : 0;
    var line = 0x000000;
    if(typeof this.props.color !== 'undefined') {
      line = this.props.color;
    }
    else {
      line = this.props.isCapture ?
        this.props.palette.captureArrow
      : this.props.isCheck ?
        this.props.palette.checkArrow
      :
        this.props.palette.moveArrow
      ;
    }
    var headlen = 40;
    var dx = tx - sx;
    var dy = ty - sy;
    var angle = Math.atan2(dy, dx);
    var graphics = this.arrowRef.current;
    graphics.clear();
    var arrow = (size, color) => {
      graphics.lineStyle({
        width: size,
        color: color,
        alpha: 1,
        alignment: 0.5,
        native: false,
        cap: PIXI.LINE_CAP.ROUND,
        join: PIXI.LINE_JOIN.ROUND
      });
      graphics.moveTo(sx - (size - 10) / 2 * Math.cos(angle), sy - (size - 10) / 2 * Math.sin(angle));
      graphics.lineTo(tx - headlen / 2 * Math.cos(angle), ty - headlen / 2 * Math.sin(angle));
      graphics.closePath();
      graphics.lineStyle({
        width: size-10,
        color: color,
        alpha: 1,
        alignment: 0.5,
        native: false,
        cap: PIXI.LINE_CAP.ROUND,
        join: PIXI.LINE_JOIN.ROUND
      });
      graphics.beginFill(color, 1);
      graphics.drawPolygon([
        tx - headlen * Math.cos(angle - Math.PI / 6), ty - headlen * Math.sin(angle - Math.PI / 6),
        tx, ty,
        tx - headlen * Math.cos(angle + Math.PI / 6), ty - headlen * Math.sin(angle + Math.PI / 6)
      ]);
      graphics.endFill();
    }
    arrow(30, 0x000000);
    arrow(15, line);
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
