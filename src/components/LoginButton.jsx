import React from 'react';

import { Trans } from '@lingui/macro';

import LinkButton from 'components/LinkButton';
import ProfileMenu from 'components/ProfileMenu';

import EmitterContext from 'EmitterContext';
import * as authStore from 'state/auth';

export default class LoginButton extends React.Component {
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
        <LinkButton
          to='/login'
        >
          <Trans>Sign In</Trans>
        </LinkButton>
      );
    }
    else {
      return (
        <LinkButton
          to='/register'
        >
          <Trans>Sign Up</Trans>
        </LinkButton>
      );
    }
  }
}