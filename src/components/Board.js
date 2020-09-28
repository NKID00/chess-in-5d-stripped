import React from 'react';
import Timeline from 'components/Timeline';

export default class Board extends React.Component {
  render() {
    return (typeof this.props.boardObj !== 'undefined' ?
      this.props.boardObj.timelines.map((e) => {
        return (
          <Timeline
            app={this.props.app}
            palette={this.props.palette}
            highlights={this.props.highlights}
            y={e.timeline * 100}
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
          />
        );
      })
    :
      <></>
    );
  }
}
