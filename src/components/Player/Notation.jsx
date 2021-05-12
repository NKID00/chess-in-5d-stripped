import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import EmitterContext from 'EmitterContext';
import * as crConfig from 'state/config';

export default class Clock extends React.Component {
  static contextType = EmitterContext;
  state = {
    config: crConfig.get()
  };
  componentDidMount() {
    //Update state if theme settings are changed
    this.configListener = this.context.on('configUpdate', () => {
      this.setState({
        config: crConfig.get()
      });
    });
  }
  componentWillUnmount() {
    //Stop listening to theme setting changes
    if(typeof this.configListener === 'function') { this.configListener(); }
  }
  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              Test
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
