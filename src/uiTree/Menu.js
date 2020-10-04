import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import MenuBackdrop from 'uiTree/MenuBackdrop';
import MainMenu from 'uiTree/menus/MainMenu';
import LocalMenu from 'uiTree/menus/LocalMenu';

export default class Menu extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path='/'>
          <Redirect push to='/main' />
          </Route>
          <Route exact path='/main'>
            <MainMenu />
          </Route>
          <Route exact path='/local'>
            <LocalMenu />
          </Route>
        </Switch>
        <Route exact path={[
          '/main',
          '/local'
        ]}>
          <MenuBackdrop />
        </Route>
      </>
    );
  }
}