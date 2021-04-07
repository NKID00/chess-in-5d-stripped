import React from 'react';

import Box from '@material-ui/core/Box';

import ChessRenderer from '5d-chess-renderer';
import Chess from '5d-chess-js';

import EmitterContext from 'EmitterContext';
import * as crPalette from 'state/palette';
import * as crConfig from 'state/config';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

export default class Renderer extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  chessRenderer = null;
  componentDidMount() {
    //Attach to div element
    if(this.rootRef.current !== null) {
      this.chessRenderer = new ChessRenderer(this.rootRef.current, { app: { interactive: false } });
      this.chessRenderer.global.sync(new Chess());
      this.chessRenderer.zoom.fullBoard();
    }
    //Listen for changes in palette and config settings
    this.paletteListener = this.context.on('paletteUpdate', () => {
      this.updatePalette();
    });
    this.configListener = this.context.on('configUpdate', () => {
      this.updateConfig();
    });
    //Update palette and config right now
    this.updatePalette();
    this.updateConfig();
  }
  updatePalette() {
    //Update chessRenderer palette based on global palette settings and local palette props
    if(typeof this.props.palette === 'object') {
      this.chessRenderer.global.palette(deepmerge(this.props.palette, crPalette.get()));
    }
    else {
      this.chessRenderer.global.palette(crPalette.get());
    }
  }
  updateConfig() {
    //Update chessRenderer palette based on global palette settings and local palette props
    var newConfig = { app: { interactive: true } };
    if(typeof this.props.config === 'object') {
      newConfig = deepmerge(newConfig, crConfig.get());
      newConfig = deepmerge(newConfig, this.props.config);
      this.chessRenderer.global.config(newConfig);
    }
    else {
      newConfig = deepmerge(newConfig, crConfig.get());
      this.chessRenderer.global.config(newConfig);
    }
  }
  componentDidUpdate(prevProps) {
    //Look for changes in div width or height and update chessRenderer
    if(prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      if(this.rootRef.current !== null) {
        this.chessRenderer.global.attach(this.rootRef.current);
      }
    }
    //Check if palette props has changed
    if(!deepequal(prevProps.palette, this.props.palette)) {
      this.updatePalette();
    }
    //Check if config props has changed
    if(!deepequal(prevProps.config, this.props.config)) {
      this.updateConfig();
    }
  }
  componentWillUnmount() {
    //Stop listening to palette and config setting changes
    if(typeof this.paletteListener === 'function') { this.paletteListener(); }
    if(typeof this.configListener === 'function') { this.configListener(); }
    //Free up memory by destroying the chessRenderer instance
    this.chessRenderer.destroy();
  }
  render() {
    return (
      <Box
        ref={this.rootRef}
        m={0}
        p={0}
        width={this.props.width}
        height={this.props.height}
      ></Box>
    );
  }
}