import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LocalAnalyzer from 'uiTree.old/games/LocalAnalyzer';
import LocalHuman from 'uiTree.old/games/LocalHuman';
import LocalComputer from 'uiTree.old/games/LocalComputer';
import LocalComputerOnly from 'uiTree.old/games/LocalComputerOnly';
import NetworkHostPrivate from 'uiTree.old/games/NetworkHostPrivate';
import NetworkClientPrivate from 'uiTree.old/games/NetworkClientPrivate';
import NetworkSpectateClient from 'uiTree.old/games/NetworkSpectateClient';
import NetworkPlayClient from 'uiTree.old/games/NetworkPlayClient';

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
