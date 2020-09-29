import React from 'react';
import Timeline from 'components/Timeline';
import { Stage, AppContext } from 'react-pixi-fiber';
import Viewport from 'components/Viewport';

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

export default class Board extends React.Component {
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
      <Stage
        options={{
          height: this.state.height,
          width: this.state.width,
          backgroundColor: (this.props.palette ?
            this.props.palette.background
          :
            defaultPalette.background
          )
        }}
        style={{
          left: 0,
          top: 0,
          position: 'absolute',
          zIndex: -100
        }}
      >
        <AppContext.Consumer>
          {app =>
            <Viewport
              app={app}
              drag
              pinch
              wheel
              decelerate
            >
              {typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.map((e) => {
                  return (
                    <Timeline
                      app={app}
                      palette={this.props.palette ? this.props.palette : defaultPalette}
                      x={this.props.x ? this.props.x : 0}
                      y={(this.props.x ? this.props.x : 0) + e.timeline * 100}
                      timelineObj={e}
                      key={e.timeline}
                      onPieceClick={(piece) => {
                        if(typeof this.props.onPieceClick === 'function') {
                          this.props.onPieceClick(piece);
                        }
                      }}
                      onHighlightClick={(moveObj) => {
                        if(typeof this.props.onHighlightClick === 'function') {
                          this.props.onHighlightClick(moveObj);
                        }
                      }}
                      selectedPiece={this.props.selectedPiece}
                      highlights={this.props.highlights}
                    />
                  );
                })
              :
                <></>
              }
            </Viewport>
          }
        </AppContext.Consumer>
      </Stage>
    );
  }
}
