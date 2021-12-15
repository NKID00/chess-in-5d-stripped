import React from 'react';

import { Trans } from '@lingui/macro';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import PwaInstall from 'route/Main/Dashboard/PwaInstall';

import * as motd from 'network/motd';
import * as settings from 'state/settings';

export class Welcome extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h4'>
            <Trans>Welcome to Chess In 5D!</Trans>
          </Typography>
          <Typography variant='body1' component='p'>
            This website is still a work in progress. These items are still currently WIP:
          </Typography>
          <Typography variant='body2' component='p'>
            <ul>
              <li>Puzzles</li>
              <li>Tutorial</li>
              <li>Editor</li>
              <li>User Stats</li>
              <li>Ranking Stats</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export class DiscordJoin extends React.Component {
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
                <Trans>Want to contribute? Working on an open source 5D Chess project? Got a bug to report? Join the Open 5D Chess Discord!</Trans>
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

export class Motd extends React.Component {
  state = {
    message: null
  }
  async componentDidMount() {
    this.setState({
      message: await motd.get()
    });
  }
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6'>
            <Trans>Message of the day from:</Trans>
            <Link
              target='_blank'
              rel='noopener'
              href={settings.get().server}
            >
              {' ' + settings.get().server}
            </Link>
          </Typography>
            {this.state.message === null ?
              <Box m={1}>
                <LinearProgress />
              </Box>
            :
              <Typography variant='body2'>
                {this.state.message}
              </Typography>
            }
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Motd />
                </Grid>
                <Grid item xs={12}>
                  <PwaInstall />
                </Grid>
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
            <Grid item xs={12}>
              <PwaInstall />
            </Grid>
          </Grid>
        </Hidden>
      </Box>
    );
  }
}
