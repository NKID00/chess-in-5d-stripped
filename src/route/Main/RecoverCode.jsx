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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

class RecoverCode extends React.Component {
  static contextType = EmitterContext;
  state = {
    loading: false,
    email: '',
    emailError: '',
    serverUrl: settings.get().server,
    showModal: false,
  }
  componentDidMount() {
    //Check if already logged in
    if(authStore.isLoggedIn()) {
      this.redirect();
    }

    //Update state if settings store is changed
    this.settingsListener = this.context.on('settingsUpdate', () => {
      this.setState({ serverUrl: settings.get().server });
    });
  }
  componentWillUnmount() {
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
  async request() {
    this.setState({ loading: true });
    try {
      await auth.recoverCode(this.state.email, this.context);
      this.setState({
        showModal: true
      });
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
            emailError: 'User with email does not exist!'
          });
        }
        else if(res.data.error.includes('Email is not a valid email!')) {
          this.setState({
            emailError: res.data.error
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
                      disabled={this.state.loading}
                      variant='outlined'
                      onClick={this.request.bind(this)}
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

export default withSnackbar(withRouter(RecoverCode));
