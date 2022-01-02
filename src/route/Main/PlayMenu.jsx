import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import QuickPlayMenu from 'route/Main/PlayMenu/QuickPlayMenu';
import SessionsPanel from 'route/Main/PlayMenu/SessionsPanel';
import SessionsBrowser from 'route/Main/PlayMenu/SessionsBrowser';

export default class PlayMenu extends React.Component {
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <Box p={1}>
                    <QuickPlayMenu />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <SessionsBrowser />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <SessionsPanel />
          </Grid>
        </Grid>
      </Box>
    );
  }
}