import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LocalAnalyzer from 'uiTree/games/LocalAnalyzer';
import LocalHuman from 'uiTree/games/LocalHuman';

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
        </Switch>
      </>
    );
  }
}
