import React from 'react';
import { Redirect } from 'react-router';

import { withSnackbar } from 'notistack';
import Options from 'Options';
import LoginMenu from 'components/network/LoginMenu';

const axios = require('axios');

class LoginRedirect extends React.Component {
  state = {
    invalid: Options.get('name').token.length === 0
  };
  async check() {
    var token = Options.get('name').token;
    var lastCheck = Options.get('name').tokenCheck;
    if(Date.now() >= lastCheck + 1000 && token.length > 0) {
      axios.get(Options.get('server').url + '/authCheck', {
        headers: {
          'Authorization': token
        }
      }).then((res) => {
        if(res.status === 200) {
          Options.set('name', { tokenCheck: Date.now() });
          this.setState({ invalid: false });
        }
        else {
          this.props.enqueueSnackbar('Token invalid, please login again!', {variant: 'warning'});
          console.error(res);
          this.setState({ invalid: true });
        }
      }).catch((err) => {
        this.props.enqueueSnackbar('Token expired, please login again!', {variant: 'warning'});
        console.error(err);
        this.setState({ invalid: true });
      });
    }
  }
  componentDidMount() {
    this.check();
  }
  render() {
    return (
      this.state.invalid ?
        <LoginMenu
          to={this.props.to}
          backLink={this.props.backLink}
          open={this.state.invalid}
          onLogin={() => {
            this.check();
          }}
        />
      :
        <Redirect to={this.props.to} />
    );
  }
}

export default withSnackbar(LoginRedirect);