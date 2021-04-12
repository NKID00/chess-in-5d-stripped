import React from 'react';
import { withRouter } from 'react-router';
import { withSnackbar } from 'notistack';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import EmitterContext from 'EmitterContext';
import * as authStore from 'state/auth';
import * as auth from 'network/auth';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

class Login extends React.Component {
  static contextType = EmitterContext;
  state = {
    auth: authStore.get(),
    usernameError: '',
    password: '',
    passwordError: ''
  }
  componentDidMount() {
    //Check if already logged in
    if(authStore.isLoggedIn()) {
      this.redirect();
    }

    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      if(authStore.isLoggedIn()) {
        this.redirect();
      }
      this.setState({ auth: authStore.get() });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //Update settings if auth store has changed
    if(!deepequal(prevState.auth, this.state.auth)) {
      authStore.set(this.state.auth, this.context);
    }
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  redirect() {
    //Redirect to custom url if needed
    var search = new URLSearchParams(this.props.location.search);
    if(search.has('redirect')) {
      this.props.history.replace(search.get('redirect'));
    }
    else {
      this.props.history.replace('/');
    }
  }
  async login() {
    try {
      await auth.login(this.state.auth.username, this.state.password, this.context);
      this.redirect();
    }
    catch(err) {
      //Describe error states and provide feedback
      var res = err.response;
      if(typeof res === 'undefined') {
        this.props.enqueueSnackbar(err.message, {variant: 'error'});
      }
      else if(res.status === 403) {
        if(res.data.error.includes('User not found!')) {
          this.setState({
            usernameError: 'User does not exist!',
            passwordError: ''
          });
        }
        else if(res.data.error.includes('Username is invalid!')) {
          this.setState({
            usernameError: res.data.error,
            passwordError: ''
          });
        }
        else if(res.data.error.includes('Password do not match!')) {
          this.setState({
            usernameError: '',
            passwordError: 'Password incorrect!'
          });
        }
        else {
          this.props.enqueueSnackbar(res.data.error, {variant: 'error'});
        }
      }
    }
  }
  render() {
    return (
      <Container maxWidth='sm'>
        <Box m={8} />
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h4'>
                  <Trans>Sign In</Trans>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='username'
                    autoFocus
                    required
                    error={this.state.usernameError.length > 0}
                    helperText={this.state.usernameError}
                    value={this.state.auth.username}
                    onChange={(event) => {
                      this.setState(deepmerge(this.state, { auth: { username: event.target.value } }));
                    }}
                    label={<Trans>Username</Trans>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='current-password'
                    type='password'
                    required
                    error={this.state.passwordError.length > 0}
                    helperText={this.state.passwordError}
                    value={this.state.password}
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                    label={<Trans>Password</Trans>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  justify='flex-end'
                >
                  <Grid item xs={6} md={3}>
                    <Button
                      fullWidth
                    >
                      <Trans>Back</Trans>
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Button
                      fullWidth
                      variant='outlined'
                      onClick={this.login.bind(this)}
                    >
                      <Trans>Sign In</Trans>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default withSnackbar(withRouter(Login));
