import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import MenuBackdrop from 'uiTree/MenuBackdrop';
import MainMenu from 'uiTree/menus/MainMenu';
import LocalMenu from 'uiTree/menus/LocalMenu';
import NetworkMenu from 'uiTree/menus/NetworkMenu';
import RulesMenu from 'uiTree/menus/RulesMenu';
import OptionsMenu from 'uiTree/menus/OptionsMenu';
import BugTrackerMenu from 'uiTree/menus/BugTrackerMenu';

class Menu extends React.Component {
  state = {
    noBlur: false
  };
  componentDidMount() {
    var url = new URLSearchParams(this.props.location.search);
    var hostId = url.get('noblur');
    if(hostId !== null) {
      this.setState({noBlur: true});
    }
  }
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
          <Route exact path='/network'>
            <NetworkMenu />
          </Route>
          <Route exact path='/rules'>
            <RulesMenu />
          </Route>
          <Route exact path='/options'>
            <OptionsMenu />
          </Route>
          <Route exact path='/bugs'>
            <BugTrackerMenu />
          </Route>
        </Switch>
        <Route exact path={[
          '/',
          '/local',
          '/network',
          '/rules',
          '/options',
          '/bugs'
        ]}>
          {!this.state.noBlur ?
            <MenuBackdrop />
          :
            <div style={{
              position: 'fixed',
              zIndex: -100,
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'black'
            }}></div>
          }
        </Route>
      </>
    );
  }
}

export default withRouter(Menu);
