import React from 'react';
import { Graphics } from 'react-pixi-fiber';
import Piece from 'components/Piece';

export default class Turn extends React.Component {
  constructor(props) {
    super(props);
    this.turnRef = React.createRef();
  }
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
                type={e.piece}
                player={e.player}
                key={e.piece + e.position.coordinate}
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
