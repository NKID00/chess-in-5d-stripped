import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import EmitterContext from 'EmitterContext';
import * as muiTheme from 'state/theme';

export default class Clock extends React.Component {
  static contextType = EmitterContext;
  state = {
    clockFont: muiTheme.get().extra.clock.fontFamily
  };
  componentDidMount() {
    //Update state if theme settings are changed
    this.themeListener = this.context.on('themeUpdate', () => {
      this.setState({
        clockFont: muiTheme.get().extra.clock.fontFamily
      });
    });
  }
  componentWillUnmount() {
    //Stop listening to theme setting changes
    if(typeof this.themeListener === 'function') { this.themeListener(); }
  }
  render() {
    return (
      <Card>
        <Box m={1}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                fullWidth
                style={{
                  fontFamily: this.state.clockFont,
                  color: '#ffffff',
                  backgroundColor: '#000000',
                }}
                disableElevation
              >
                Test
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                style={{
                  fontFamily: this.state.clockFont,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                }}
                disableElevation
              >
                Test
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  }
}
