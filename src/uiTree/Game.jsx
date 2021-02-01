import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LocalAnalyzer from 'uiTree/games/LocalAnalyzer';
import LocalHuman from 'uiTree/games/LocalHuman';
import LocalComputer from 'uiTree/games/LocalComputer';
import LocalComputerOnly from 'uiTree/games/LocalComputerOnly';
import NetworkHostPrivate from 'uiTree/games/NetworkHostPrivate';
import NetworkClientPrivate from 'uiTree/games/NetworkClientPrivate';
import NetworkSpectateClient from 'uiTree/games/NetworkSpectateClient';
import NetworkPlayClient from 'uiTree/games/NetworkPlayClient';

export default class Game extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/local/game/analyze'>
          <LocalAnalyzer />
        </Route>
        <Route exact path='/local/game/human'>
          <LocalHuman />
        </Route>
        <Route exact path='/local/game/computer'>
          <LocalComputer />
        </Route>
        <Route exact path='/local/game/computeronly'>
          <LocalComputerOnly />
        </Route>
        <Route exact path='/network/game/host'>
          <NetworkHostPrivate />
        </Route>
        <Route exact path='/network/game/client'>
          <NetworkClientPrivate />
        </Route>
        <Route exact path='/network/server/spectate/:id'>
          <NetworkSpectateClient />
        </Route>
        <Route exact path='/network/server/play/:id'>
          <NetworkPlayClient />
        </Route>
      </Switch>
    );
  }
}
