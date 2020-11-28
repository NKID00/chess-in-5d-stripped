import React from 'react';
import { Graphics } from 'react-pixi-fiber';

const deepcompare = require('deep-equal');

export default class Highlight extends React.Component {
  highlightRef = React.createRef();
  draw() {
    var x = this.props.x ? this.props.x : 0;
    var y = this.props.y ? this.props.y : 0;
    var fill = this.props.isCapture ?
      this.props.palette.captureHighlight
    :
      this.props.palette.moveHighlight
    ;
    var graphics = this.highlightRef.current;
    graphics.clear();
    graphics.beginFill(fill, 0.01);
    graphics.drawRect(x, y, 100, 100);
    graphics.endFill();
    graphics.beginFill(fill, this.props.isHover ? 0.25 : 0.65);
    graphics.lineStyle(1, fill, 0);
    graphics.drawCircle(x + 50,y + 50,this.props.isHover ? 25 : 40);
    graphics.endFill();
  }
  componentDidMount() {
    this.draw();
    this.highlightRef.current.buttonMode = true;
    this.highlightRef.current.interactive = true;
  }
  componentDidUpdate(prevProps) {
    if(
      !deepcompare(prevProps.palette, this.props.palette) ||
      !deepcompare(prevProps.moveObj, this.props.moveObj) ||
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y ||
      prevProps.isCapture !== this.props.isCapture
    ) {
      this.draw();
    }
  }
  render() {
    return (
      <Graphics ref={this.highlightRef}
        pointertap={(e) => {
          if(typeof this.props.onHighlightClick === 'function') {
            this.props.onHighlightClick(this.props.moveObj);
          }
        }}
      />
    );
  }
}
