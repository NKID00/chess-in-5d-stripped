import React from 'react';
import Turn from 'components/Turn';

export default class Timeline extends React.Component {
  render() {
    return (typeof this.props.timelineObj !== 'undefined' ?
      this.props.timelineObj.turns.map((e) => {
        var x = this.props.x ? this.props.x : 0;
        var y = this.props.y ? this.props.y : 0;
        return (
          <Turn
            app={this.props.app}
            palette={this.props.palette}
            highlights={Array.isArray(this.props.highlights) ?
              this.props.highlights.filter((e) => {
                return e.end.timeline === this.props.timelineObj.timeline;
              })
            :
              []
            }
            x={x + (((e.turn - 1) * 2) + (e.player === 'white' ? 0 : 1)) * 100 + 10}
            y={y + 10}
            turnObj={e}
            key={e.turn + ':' + e.player}
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
            selectedPiece={
              this.props.selectedPiece &&
              this.props.selectedPiece.position.timeline === this.props.timelineObj.timeline &&
              this.props.selectedPiece.position.turn === e.turn &&
              this.props.selectedPiece.position.player === e.player ?
                this.props.selectedPiece
              :
                null
            }
          />
        );
      })
    :
      <></>
    );
  }
}
