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
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as auth from 'network/auth';

const deepequal = require('fast-deep-equal');

class Recover extends React.Component {
  static contextType = EmitterContext;
  state = {
    auth: authStore.get(),
    loading: false,
    email: '',
    emailError: '',
    recoverCode: '',
    recoverCodeError: '',
    password: '',
    passwordError: '',
    password2: '',
    password2Error: '',
    serverUrl: settings.get().server,
  }
  componentDidMount() {
    //Check if already logged in
    if(authStore.isLoggedIn()) {
      this.redirect();
    }

    //Insert code from search url
    var search = new URLSearchParams(this.props.location.search);
    if(search.has('code')) {
      this.setState({
        recoverCode: search.get('code')
      });
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
    this.props.history.replace('/recover');
  }
  async recover() {
    this.setState({ loading: true });
    try {
      if(this.state.password !== this.state.password2) {
        this.setState({
          emailError: '',
          recoverCodeError: '',
          passwordError: '',
          password2Error: 'Passwords do not match!',
        });
      }
      else {
        await auth.recover(this.state.email, this.state.recoverCode, this.state.password, this.context);
        this.redirect();
      }
    }
    catch(err) {
      //Describe error states and provide feedback
      var res = err.response;
      if(typeof res === 'undefined') {
        this.props.enqueueSnackbar(err.message, {variant: 'error'});
      }
      else if(res.status === 500) {
        if(res.data.error.includes('User not found!')) {
          this.setState({
            emailError: 'User with email does not exist!',
            recoverCodeError: '',
            passwordError: '',
            passwordError2: ''
          });
        }
        else if(res.data.error.includes('Email is not a valid email!')) {
          this.setState({
            emailError: 'Not a valid email!',
            recoverCodeError: '',
            passwordError: '',
            passwordError2: ''
          });
        }
        else if(res.data.error.includes('No recovery code received!')) {
          this.setState({
            emailError: '',
            recoverCodeError: 'No Recovery Code!',
            passwordError: '',
            passwordError2: ''
          });
        }
        else if(res.data.error.includes('Recovery process has timed out!')) {
          this.setState({
            emailError: '',
            recoverCodeError: 'Recovery code has expired!',
            passwordError: '',
            passwordError2: ''
          });
        }
        else if(res.data.error.includes('Recovery code does not match!')) {
          this.setState({
            emailError: '',
            recoverCodeError: 'Invalid Recovery Code!',
            passwordError: '',
            passwordError2: ''
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
                  <Trans>Recover Password</Trans>
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
                    autoComplete='email'
                    type='email'
                    required
                    error={this.state.emailError.length > 0}
                    helperText={this.state.emailError}
                    value={this.state.email}
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                    onKeyPress={(event) => {
                      if(event.key === 'Enter') {
                        this.request();
                      }
                    }}
                    label={<Trans>Email</Trans>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    required
                    error={this.state.recoverCodeError.length > 0}
                    helperText={this.state.recoverCodeError}
                    value={this.state.recoverCode}
                    onChange={(event) => {
                      this.setState({ recoverCode: event.target.value });
                    }}
                    label={<Trans>Recovery Code</Trans>}
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
                <FormControl fullWidth>
                  <TextField
                    variant='outlined'
                    autoComplete='new-password'
                    type='password'
                    required
                    error={this.state.password2Error.length > 0}
                    helperText={this.state.password2Error}
                    value={this.state.password2}
                    onChange={(event) => {
                      this.setState({ password2: event.target.value });
                    }}
                    label={<Trans>Confirm Password</Trans>}
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
                      onClick={this.recover.bind(this)}
                    >
                      <Trans>Continue</Trans>
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

export default withSnackbar(withRouter(Recover));
