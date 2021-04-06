import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CompactPicker } from 'react-color';

import ChessRenderer from 'components/ChessRenderer';
import Chess from '5d-chess-js';

import EmitterContext from 'EmitterContext';
import * as crPalette from 'state/palette';
import * as PIXI from 'pixi.js';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

export default class Palette extends React.Component {
  static contextType = EmitterContext;
  state = crPalette.get();
  chessRenderer = React.createRef();
  componentDidMount() {
    this.paletteListener = this.context.on('paletteUpdate', () => {
      this.setState(crPalette.get());
    });
    if(this.chessRenderer.current !== null) {
      //Setup renderer with example
      var cr = this.chessRenderer.current.chessRenderer;
      var chess = new Chess();
      chess.import(`[Board "Standard"]
[Mode "5D"]
1. e3 / e6
2. (0T2)Nb1>>(0T1)b3~ (>L1)`);
      cr.global.sync(chess);
      cr.global.availableMoves(chess.moves('object', false, false, false));
      cr.zoom.fullBoard();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepequal(prevState, this.state)) {
      crPalette.set(this.state);
      this.context.emit('paletteUpdate');
    }
  }
  componentWillUnmount() {
    if(typeof this.paletteListener === 'function') {
      this.paletteListener();
    }
  }
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box position='sticky'>
              <ChessRenderer
                ref={this.chessRenderer}
                height={600} 
                width={1}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h6'><Trans>Solid Background Color</Trans></Typography>
                <CompactPicker
                  color={{
                    r: Math.round(PIXI.utils.hex2rgb(this.state.background.single)[0] * 255),
                    g: Math.round(PIXI.utils.hex2rgb(this.state.background.single)[1] * 255),
                    b: Math.round(PIXI.utils.hex2rgb(this.state.background.single)[2] * 255),
                  }}
                  onChange={(c) => {
                    var hex = PIXI.utils.rgb2hex([c.rgb.r/255, c.rgb.g/255, c.rgb.b/255]);
                    this.setState(deepmerge(this.state, { background: { single: hex } }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'><Trans>Checkered Background Color - Light Rectangle</Trans></Typography>
                <CompactPicker
                  color={{
                    r: Math.round(PIXI.utils.hex2rgb(this.state.background.lightRectangle)[0] * 255),
                    g: Math.round(PIXI.utils.hex2rgb(this.state.background.lightRectangle)[1] * 255),
                    b: Math.round(PIXI.utils.hex2rgb(this.state.background.lightRectangle)[2] * 255),
                  }}
                  onChange={(c) => {
                    var hex = PIXI.utils.rgb2hex([c.rgb.r/255, c.rgb.g/255, c.rgb.b/255]);
                    this.setState(deepmerge(this.state, { background: { lightRectangle: hex } }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'><Trans>Checkered Background Color - Light Rectangle - Black Stripes</Trans></Typography>
                <CompactPicker
                  color={{
                    r: Math.round(PIXI.utils.hex2rgb(this.state.background.lightStripeBlack)[0] * 255),
                    g: Math.round(PIXI.utils.hex2rgb(this.state.background.lightStripeBlack)[1] * 255),
                    b: Math.round(PIXI.utils.hex2rgb(this.state.background.lightStripeBlack)[2] * 255),
                  }}
                  onChange={(c) => {
                    var hex = PIXI.utils.rgb2hex([c.rgb.r/255, c.rgb.g/255, c.rgb.b/255]);
                    this.setState(deepmerge(this.state, { background: { lightStripeBlack: hex } }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'><Trans>Checkered Background Color - Light Rectangle - White Stripes</Trans></Typography>
                <CompactPicker
                  color={{
                    r: Math.round(PIXI.utils.hex2rgb(this.state.background.lightStripeWhite)[0] * 255),
                    g: Math.round(PIXI.utils.hex2rgb(this.state.background.lightStripeWhite)[1] * 255),
                    b: Math.round(PIXI.utils.hex2rgb(this.state.background.lightStripeWhite)[2] * 255),
                  }}
                  onChange={(c) => {
                    var hex = PIXI.utils.rgb2hex([c.rgb.r/255, c.rgb.g/255, c.rgb.b/255]);
                    this.setState(deepmerge(this.state, { background: { lightStripeWhite: hex } }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'><Trans>Checkered Background Color - Dark Rectangle</Trans></Typography>
                <CompactPicker
                  color={{
                    r: Math.round(PIXI.utils.hex2rgb(this.state.background.darkRectangle)[0] * 255),
                    g: Math.round(PIXI.utils.hex2rgb(this.state.background.darkRectangle)[1] * 255),
                    b: Math.round(PIXI.utils.hex2rgb(this.state.background.darkRectangle)[2] * 255),
                  }}
                  onChange={(c) => {
                    var hex = PIXI.utils.rgb2hex([c.rgb.r/255, c.rgb.g/255, c.rgb.b/255]);
                    this.setState(deepmerge(this.state, { background: { darkRectangle: hex } }));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}