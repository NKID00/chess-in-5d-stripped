import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Button from '@material-ui/core/Button';
import ProfileMenu from 'route/MainAppBar/ProfileMenu';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';

class LoginButton extends React.Component {
  static contextType = EmitterContext;
  state = {
    loggedIn: authStore.isLoggedIn(),
    auth: authStore.get()
  };
  componentDidMount() {
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.setState({
        loggedIn: authStore.isLoggedIn(),
        auth: authStore.get()
      });
    });
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    if(this.state.loggedIn) {
      return (
        <ProfileMenu username={this.state.auth.username} />
      );
    }
    else if(this.state.auth.username.length > 0) {
      return (
        <Button
          onClick={(() => {
            if(this.props.location.pathname.length > 0 && this.props.location.pathname !== '/login') {
              this.props.history.push(`/login?redirect=${this.props.location.pathname+this.props.location.search}`);
            }
            else {
              this.props.history.push('/login');
            }
          })}
        >
          <Trans>Sign In</Trans>
        </Button>
      );
    }
    else {
      return (
        <Button
          onClick={(() => {
            if(this.props.location.pathname.length > 0 && this.props.location.pathname !== '/register') {
              this.props.history.push(`/register?redirect=${this.props.location.pathname+this.props.location.search}`);
            }
            else {
              this.props.history.push('/register');
            }
          })}
        >
          <Trans>Sign Up</Trans>
        </Button>
      );
    }
  }
}

export default withRouter(LoginButton);