import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Dashboard extends React.Component {
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6} />
        </Grid>
      </Box>
    );
  }
}
