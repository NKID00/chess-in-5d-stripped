import React from 'react';

import { Trans } from '@lingui/macro';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Chess from '5d-chess-js';
import ChessClock from '5d-chess-clock';

import EmitterContext from 'utils/EmitterContext';
import * as settings from 'state/settings';
import * as variantsAndFormats from 'network/variantsAndFormats';

/*
Props
 - variants - Default to ['standard']
 - formats - Default to ['blitz', 'rapid']
*/
export default class QuickPlayOptions extends React.Component {
  static contextType = EmitterContext;
  chess = new Chess();
  chessClock = new ChessClock();
  state = {
    variants: this.chess.variants.filter(e => e.shortName !== 'custom'),
    formats: this.chessClock.formats,
    selectedVariants: settings.get().quickPlay.variants,
    selectedFormats: settings.get().quickPlay.formats
  }
  async rankedFilter() {
    let vAF = (await variantsAndFormats.get());
    let variants = this.chess.variants.filter(e => e.shortName !== 'custom');
    let formats = this.chessClock.formats;
    this.setState({
      variants: variants.filter(variant => vAF.variants.includes(variant.shortName)),
      formats: formats.filter(format => vAF.formats.includes(format.shortName)),
      selectedVariants: this.state.selectedVariants.filter(variantShort => vAF.variants.includes(variantShort)),
      selectedFormats: this.state.selectedFormats.filter(formatShort => vAF.formats.includes(formatShort))
    });
  }
  componentDidMount() {
    this.rankedFilter();
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.rankedFilter();
    });
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel><Trans>Variants</Trans></InputLabel>
            <Select
              multiple
              value={this.state.selectedVariants}
              onChange={(event) => {
                if(event.target.value.length > 0) {
                  this.setState({
                    selectedVariants: event.target.value
                  });
                }
              }}
              label={<Trans>Variants</Trans>}
            >
              {this.state.variants.map((variant) => (
                <MenuItem key={variant.shortName} value={variant.shortName}>
                  {variant.name.replace('Standard - ','')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel><Trans>Formats</Trans></InputLabel>
            <Select
              multiple
              value={this.state.selectedFormats}
              onChange={(event) => {
                if(event.target.value.length > 0) {
                  this.setState({
                    selectedFormats: event.target.value
                  });
                }
              }}
              label={<Trans>Formats</Trans>}
            >
              {this.state.formats.map((format) => (
                <MenuItem key={format.shortName} value={format.shortName}>
                  {format.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}