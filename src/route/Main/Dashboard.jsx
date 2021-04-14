import React from 'react';

import { Trans } from '@lingui/macro';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import * as motd from 'network/motd';
import * as settings from 'state/settings';

class Welcome extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h4'>
            <Trans>Welcome to Chess In 5D!</Trans>
          </Typography>
          <Typography variant='body2' component='p'>
            <Trans>This view is still a work in progress.</Trans>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

class DiscordJoin extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6'>
            <Trans>Join the community!</Trans>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography variant='body2' component='p'>
                <Trans>Looking for people to play with? Join the 5DCWMTT Discord!</Trans>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Button
                fullWidth
                variant='contained'
                onClick={() => { window.open('https://www.5dchesswithmultiversetimetravel.com/discord'); }}
              >
                <Trans>5DCWMTT Discord</Trans>
              </Button>
            </Grid>
            <Grid item xs={7}>
              <Typography variant='body2' component='p'>
                <Trans>Want to contribute? Working on a 5D Chess project? Join the Open 5D Chess Discord!</Trans>
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => { window.open('https://discord.chessin5d.net'); }}
              >
                <Trans>Open 5D Chess Discord</Trans>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

class Motd extends React.Component {
  state = {
    message: null
  }
  async componentDidMount() {
    this.setState({
      message: await motd.getMotd()
    });
  }
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6'>
            <Trans>Message of the day from:</Trans>
            <Link>{' ' + settings.get().server}</Link>
          </Typography>
          <Typography variant='body2'>
            {this.state.message === null ?
              ''
            :
              this.state.message
            }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default class Dashboard extends React.Component {
  render() {
    return (
      <Box m={2}>
        <Hidden smDown>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Welcome />
                </Grid>
                <Grid item xs={12}>
                  <DiscordJoin />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <Motd />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Welcome />
            </Grid>
            <Grid item xs={12}>
              <Motd />
            </Grid>
            <Grid item xs={12}>
              <DiscordJoin />
            </Grid>
          </Grid>
        </Hidden>
      </Box>
    );
  }
}
