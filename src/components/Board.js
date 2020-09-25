import React from 'react';
import { Stage, AppContext } from 'react-pixi-fiber';
import Viewport from 'components/Viewport';
import Timeline from 'components/Timeline';

const defaultPalette = {
  background: 0xffffff,
  whitePiece: 0xffffff,
  blackPiece: 0x000000,
  whiteSquare: 0xaaaaaa,
  blackSquare: 0x555555
};

export default class Board extends React.Component {
  render() {
    return (
      <Stage options={{
        backgroundColor: (this.props.palette ? 
          this.props.palette.background
        :
          defaultPalette.background
        ),
        height: this.props.height ? this.props.height : 600,
        width: this.props.width ? this.props.width : 800
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
              {typeof this.props.boardObj !== 'undefined' ?
                this.props.boardObj.timelines.map((e) => {
                  return (
                    <Timeline
                      app={app}
                      palette={this.props.palette ?
                        this.props.palette
                      :
                        defaultPalette
                      }
                      y={e.timeline * 100}
                      timelineObj={e}
                      key={e.timeline}
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
