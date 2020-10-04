import React from 'react';

import GamePlayer from 'components/GamePlayer';

export default class LocalHuman extends React.Component {
  render() {
    return <GamePlayer canImport canControlWhite canControlBlack />;
  }
}