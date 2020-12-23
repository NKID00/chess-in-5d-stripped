import React from 'react';

import TimedGamePlayer from 'components/TimedGamePlayer';

export default class NetworkClient extends React.Component {
  timedGameRef = React.createRef();
  render() {
    return (
      <TimedGamePlayer
        ref={this.timedGameRef}
        backLink='/network'
      />
    );
  }
}
