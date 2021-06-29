import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';

import Analyze from 'route/Main/Analyze';
import MainAppBar from 'route/MainAppBar';
import Dashboard from 'route/Main/Dashboard';
import Play from 'route/Main/Play';
import Settings from 'route/Main/Settings';
import Register from 'route/Main/Register';
import Login from 'route/Main/Login';

export default class Main extends React.Component {
  backgroundRef = React.createRef();
  componentDidMount() {
    window.onresize = this.resizeBackground.bind(this);
    this.resizeBackground();
  }
  resizeBackground() {
    if(this.backgroundRef.current !== null) {
      this.backgroundRef.current.style.height = `${window.innerHeight}px`;
      this.backgroundRef.current.style.width = `${window.innerWidth}px`;
    }
  }
  render() {
    return (
      <>
        <Paper
          ref={this.backgroundRef}
          square
          variant='outlined'
          style={{
            position: 'fixed',
            zIndex: -100
          }}
        />
        <MainAppBar />
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route path='/analyze'>
            <Analyze />
          </Route>
          <Route path='/play'>
            <Play />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </>
    );
  }
}
