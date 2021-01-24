import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Flex } from 'rebass';
import MenuBackdrop from 'uiTree/MenuBackdrop';
import MainMenu from 'uiTree/menus/MainMenu';
import LocalMenu from 'uiTree/menus/LocalMenu';
import NetworkMenu from 'uiTree/menus/NetworkMenu';
import TutorialMenu from 'uiTree/menus/TutorialMenu';
import OptionsMenu from 'uiTree/menus/OptionsMenu';
import BugTrackerMenu from 'uiTree/menus/BugTrackerMenu';
import ServerMenu from 'uiTree/menus/network/ServerMenu';
import SessionRedirect from 'uiTree/menus/network/SessionRedirect';

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
          <Route exact path='/network/server'>
            <ServerMenu />
          </Route>
          <Route exact path='/network/server/join/:id'>
            <SessionRedirect />
          </Route>
          <Route exact path='/tutorial'>
            <TutorialMenu />
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
          '/network/server',
          '/network/server/join/:id',
          '/tutorial',
          '/tutorial/rules',
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
          <Flex
            width={1}
            sx={{
              position: 'absolute',
              bottom: '0px'
            }}
            justifyContent='center'
            color='white'
            bg='black'
          >
            {'Version ' + process.env.REACT_APP_VERSION}
          </Flex>
        </Route>
      </>
    );
  }
}

export default withRouter(Menu);
