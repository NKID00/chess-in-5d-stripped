import React from 'react';

import { HexColorPicker } from 'react-colorful';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import * as PIXI from 'pixi.js';

export default class ColorPicker extends React.Component {
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mt={2}>
            <HexColorPicker
              style={{ width: '100%', height: '16vh' }}
              color={this.props.color ?
                PIXI.utils.hex2string(this.props.color)
              :
                this.props.colorStr
              }
              onChange={(c) => {
                var hex = PIXI.utils.string2hex(c);
                if(typeof this.props.onChange === 'function') {
                  this.props.onChange(hex, c);
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              variant='outlined'
              value={this.props.color ?
                PIXI.utils.hex2string(this.props.color)
              :
                this.props.colorStr
              }
              onChange={(event) => {
                var c = event.target.value;
                var hex = PIXI.utils.string2hex(c);
                if(typeof this.props.onChange === 'function') {
                  this.props.onChange(hex, c);
                }
              }}
              label='Hex'
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}