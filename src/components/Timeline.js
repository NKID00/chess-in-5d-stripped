import React from 'react';
import Turn from 'components/Turn';

export default class Timeline extends React.Component {
  render() {
    return (
      typeof this.props.timelineObj !== 'undefined' ?
        this.props.timelineObj.turns.map((e) => {
          var x = this.props.x ? this.props.x : 0;
          var y = this.props.y ? this.props.y : 0;
          return (
            <Turn
              app={this.props.app}
              x={x + ((e.turn * 2) + (e.player === 'white' ? 0 : 1)) * 100 + 10}
              y={y + 10}
              turnObj={e}
              key={e.turn + ':' + e.player}
            />
          );
        })
      :
        <></>
    );
  }
}
