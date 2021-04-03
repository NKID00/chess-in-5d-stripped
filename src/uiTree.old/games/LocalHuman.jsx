import React from 'react';

import TimedGamePlayer from 'components.old/TimedGamePlayer';

export default class LocalHuman extends React.Component {
  render() {
    return (
      <TimedGamePlayer
        backLink='/local'
      />
    );
  }
}
