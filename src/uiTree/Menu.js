import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MenuBackdrop from 'uiTree/MenuBackdrop';
import MainMenu from 'uiTree/menus/MainMenu';
import LocalMenu from 'uiTree/menus/LocalMenu';
import RulesMenu from 'uiTree/menus/RulesMenu';

export default class Menu extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/'>
            <MainMenu />
          </Route>
          <Route exact path='/local'>
            <LocalMenu />
          </Route>
          <Route exact path='/rules'>
            <RulesMenu />
          </Route>
        </Switch>
        <Route exact path={[
          '/',
          '/local',
          '/rules'
        ]}>
          <MenuBackdrop />
        </Route>
      </>
    );
  }
}
