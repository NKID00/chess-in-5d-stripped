import React from 'react';
import { useReactPWAInstall } from 'react-pwa-install';

import { Trans } from '@lingui/macro';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Logo from 'assets/logo-192x192.png';

//Rare function based React component because react-pwa-install
export default function PwaInstall() {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    pwaInstall({
      title: (<Trans>Install Chess In 5D</Trans>),
      logo: Logo,
      features: (
        <ul>
          <li><Trans>Play games offline!</Trans></li>
          <li><Trans>Save, load, and study games!</Trans></li>
          <li><Trans>Play on mobile devices!</Trans></li>
        </ul>
      ),
      description: (<Trans>Chess across time and space! Open source implementation of '5D Chess With Multiverse Time Travel'. Play the game of Chess In 5D here!</Trans>)
    });
  }

  if(!supported() || isInstalled()) {
    return <></>;
  }
  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>
          <Trans>Web app available!</Trans>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant='body2' component='p'>
              <Trans>Playing on mobile? Looking for a native application experience? Install the web app now!</Trans>
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={handleClick}
            >
              <Trans>Install Web App</Trans>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}