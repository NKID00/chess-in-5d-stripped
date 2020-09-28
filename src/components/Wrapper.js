import React from 'react';
import { Stage, AppContext } from 'react-pixi-fiber';
import Viewport from 'components/Viewport';

import GamePlayer from 'components/GamePlayer';

const defaultPalette = {
  background: 0xffffff,
  whitePiece: 0xffffff,
  blackPiece: 0x000000,
  whiteSquare: 0xaaaaaa,
  blackSquare: 0x555555,
  selectedPiece: 0x0000ff,
  moveHighlight: 0x00ff00,
  captureHighlight: 0xff0000
};

export default class Wrapper extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  resizeListener = (() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <Stage options={{
        height: this.state.height,
        width: this.state.width,
        backgroundColor: (this.props.palette ?
          this.props.palette.background
        :
          defaultPalette.background
        )
      }}>
        <AppContext.Consumer>
          {app =>
            <Viewport
              app={app}
              drag
              pinch
              wheel
              decelerate
            >
              <GamePlayer
                app={app}
                palette={this.props.palette ?
                  this.props.palette
                :
                  defaultPalette
                }
              />
            </Viewport>
          }
        </AppContext.Consumer>
      </Stage>
    );
  }
}