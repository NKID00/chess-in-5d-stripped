import React from 'react';

import Box from '@material-ui/core/Box';

import ChessRenderer from '5d-chess-renderer';
import Chess from '5d-chess-js';

import EmitterContext from 'EmitterContext';
import * as crPalette from 'state/palette';

export default class Renderer extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  chessRenderer = new ChessRenderer(null, null, crPalette.get());
  componentDidMount() {
    if(this.rootRef.current !== null) {
      this.chessRenderer.global.attach(this.rootRef.current);
      this.chessRenderer.global.sync(new Chess());
      this.chessRenderer.zoom.fullBoard();
    }
    this.paletteListener = this.context.on('paletteUpdate', () => {
      this.chessRenderer.global.palette(crPalette.get());
    });
  }
  componentDidUpdate(prevProps) {
    if(prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      if(this.rootRef.current !== null) {
        this.chessRenderer.global.attach(this.rootRef.current);
      }
    }
  }
  componentWillUnmount() {
    if(typeof this.paletteListener === 'function') {
      this.paletteListener();
    }
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