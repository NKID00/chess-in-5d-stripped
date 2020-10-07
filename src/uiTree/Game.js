import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LocalAnalyzer from 'uiTree/games/LocalAnalyzer';
import LocalHuman from 'uiTree/games/LocalHuman';
import LocalComputer from 'uiTree/games/LocalComputer';
import NetworkHostHuman from 'uiTree/games/NetworkHostHuman';
import NetworkClientHuman from 'uiTree/games/NetworkClientHuman';

export default class Menu extends React.Component {
  render() {
    return (
      <>
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
          <Route exact path='/network/game/host'>
            <NetworkHostHuman />
          </Route>
          <Route exact path='/network/game/client'>
            <NetworkClientHuman />
          </Route>
        </Switch>
      </>
    );
  }
}
