import React from 'react';
import { withRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as auth from 'network/auth';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

class Register extends React.Component {
  static contextType = EmitterContext;
  state = {
    auth: authStore.get(),
    loading: false,
    usernameError: null,
    password: null,
    passwordError: null,
    password2: null,
    password2Error: null,
    email: null,
    emailError: null,
    serverUrl: settings.get().server,
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
    
    //Update state if settings store is changed
    this.settingsListener = this.context.on('settingsUpdate', () => {
      this.setState({ serverUrl: settings.get().server });
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
    //Stop listening to settings store changes
    if(typeof this.settingsListener === 'function') { this.settingsListener(); }
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
  async register() {
    this.setState({ loading: true });
    try {
      if(this.state.password !== this.state.password2) {
        this.setState({
          usernameError: null,
          passwordError: null,
          password2Error: <Trans>Passwords do not match!</Trans>,
          emailError: null,
        });
      }
      else {
        await auth.register(this.state.auth.username, this.state.password, this.state.email, this.context);
        this.redirect();
      }
    }
    catch(err) {
      //Describe error states and provide feedback
      var res = err.response;
      if(typeof res === 'undefined') {
        this.props.enqueueSnackbar(err.message, {variant: 'error'});
      }
      else if(res.status === 403) {
        if(res.data.error.includes('Username already exists!')) {
          this.setState({
            usernameError: <Trans>Username already taken!</Trans>,
            passwordError: null,
            passwordError2: null,
            emailError: null,
          });
        }
        else if(res.data.error.includes('Username is invalid!')) {
          this.setState({
            usernameError: <Trans>Invalid username!</Trans>,
            passwordError: null,
            passwordError2: null,
            emailError: null,
          });
        }
        else if(res.data.error.includes('Username is blacklisted')) {
          this.setState({
            usernameError: <Trans>Username blacklisted!</Trans>,
            passwordError: null,
            passwordError2: null,
            emailError: null,
          });
        }
        else if(res.data.error.includes('Email field is not a valid email')) {
          this.setState({
            usernameError: null,
            passwordError: null,
            passwordError2: null,
            emailError: <Trans>Invalid email!</Trans>,
          });
        }
        else {
          this.props.enqueueSnackbar(res.data.error, {variant: 'error'});
        }
      }
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <Container maxWidth='sm'>
        <Box m={8} />
        <Card>
          {this.state.loading ?
            <LinearProgress />
          :
            <></>
          }
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h4'>
                  <Trans>Sign Up</Trans>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2'>
                  <Trans>Connecting to:</Trans>
                  <Link
                    target='_blank'
                    rel='noopener'
                    href={this.state.serverUrl}
                  >
                    {' ' + this.state.serverUrl}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='username'
                    autoFocus
                    required
                    error={this.state.usernameError}
                    helperText={this.state.usernameError}
                    value={this.state.auth.username}
                    onChange={(event) => {
                      this.setState(deepmerge(this.state, { auth: { username: event.target.value.toLowerCase() } }));
                    }}
                    label={<Trans>Username</Trans>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='email'
                    type='email'
                    error={this.state.emailError}
                    helperText={this.state.emailError}
                    value={this.state.email}
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                    label={<Trans>Email</Trans>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='new-password'
                    type='password'
                    required
                    error={this.state.passwordError}
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
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='new-password'
                    type='password'
                    required
                    error={this.state.password2Error}
                    helperText={this.state.password2Error}
                    value={this.state.password2}
                    onChange={(event) => {
                      this.setState({ password2: event.target.value });
                    }}
                    onKeyPress={(event) => {
                      if(event.key === 'Enter') {
                        this.register();
                      }
                    }}
                    label={<Trans>Confirm Password</Trans>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Link component={RouterLink}
                  to={(() => {
                    var search = new URLSearchParams(this.props.location.search);
                    if(search.has('redirect')) {
                      return `/login?redirect=${search.get('redirect')}`;
                    }
                    return '/login';
                  })()}
                >
                  <Trans>Already have an account?</Trans>
                </Link>
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
                      onClick={this.redirect.bind(this)}
                    >
                      <Trans>Back</Trans>
                    </Button>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Button
                      fullWidth
                      variant='outlined'
                      disabled={this.state.loading}
                      onClick={this.register.bind(this)}
                    >
                      <Trans>Sign Up</Trans>
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

export default withSnackbar(withRouter(Register));
