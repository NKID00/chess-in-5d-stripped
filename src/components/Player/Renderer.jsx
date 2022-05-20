import React from 'react';

import Box from '@material-ui/core/Box';

import ChessRenderer from '5d-chess-renderer';
import Chess from '5d-chess-js';

import EmitterContext from 'utils/EmitterContext';
import * as crPalette from 'state/palette';
import * as crConfig from 'state/config';
import * as crTexture from 'state/texture';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

const keylist = [
  'highlight',
  'whiteSquare',
  'blackSquare',
  'whiteBoardBorder',
  'blackBoardBorder',
  'checkBoardBorder',
  'inactiveBoardBorder',
  'blackP',
  'blackW',
  'blackB',
  'blackN',
  'blackR',
  'blackS',
  'blackQ',
  'blackK',
  'blackC',
  'blackY',
  'blackU',
  'blackD',
  'whiteP',
  'whiteW',
  'whiteB',
  'whiteN',
  'whiteR',
  'whiteS',
  'whiteQ',
  'whiteK',
  'whiteC',
  'whiteY',
  'whiteU',
  'whiteD'
];

export default class Renderer extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  chessRenderer = null;
  updatePalette() {
    //Update chessRenderer palette based on global palette settings and local palette props
    if(typeof this.props.palette === 'object' && this.props.palette !== null) {
      this.chessRenderer.global.palette(deepmerge(this.props.palette, crPalette.get()));
    }
    else {
      this.chessRenderer.global.palette(crPalette.get());
    }
  }
  updateConfig() {
    //Update chessRenderer palette based on global palette settings and local palette props
    var newConfig = deepmerge({ app: { interactive: true } }, crConfig.get());
    if(typeof this.props.config === 'object' && this.props.config !== null) {
      this.chessRenderer.global.config(deepmerge(newConfig, this.props.config));
    }
    else {
      this.chessRenderer.global.config(newConfig);
    }
  }
  async firstTextureLoad() {
    let textures = {};
    for(let i = 0;i < keylist.length;i++) {
      let currentKey = keylist[i];
      let currentTexture = await crTexture.get(currentKey);
      if(currentTexture !== null) {
        textures[currentKey] = currentTexture.texture;
      }
    }
    return textures;
  }
  async updateTexture() {
    let didUpdate = false;
    for(var i = 0;i < keylist.length;i++) {
      var currentKey = keylist[i];
      var currentTexture = await crTexture.get(currentKey);
      if(currentTexture !== null) {
        this.chessRenderer.global.texture(currentKey, currentTexture.texture, true);
        didUpdate = true;
      }
    }
    if(didUpdate) {
      this.chessRenderer.global.emitter.emit('textureUpdate');
    }
  }
  updateRenderer() {
    if(this.chessRenderer !== null) {
      if(typeof this.props.board === 'object' && this.props.board !== null) {
        this.chessRenderer.global.board(this.props.board, true);
      }
      if(typeof this.props.actionHistory === 'object' && this.props.actionHistory !== null) {
        this.chessRenderer.global.actionHistory(this.props.actionHistory, true);
      }
      if(typeof this.props.moveBuffer === 'object' && this.props.moveBuffer !== null) {
        this.chessRenderer.global.moveBuffer(this.props.moveBuffer, true);
      }
      if(typeof this.props.checks === 'object' && this.props.checks !== null) {
        this.chessRenderer.global.checks(this.props.checks, true);
      }
      if(typeof this.props.board === 'object' && this.props.board !== null) {
        this.chessRenderer.global.emitter.emit('boardUpdate', this.props.board);
      }
      if(typeof this.props.actionHistory === 'object' && this.props.actionHistory !== null) {
        this.chessRenderer.global.emitter.emit('actionHistoryUpdate', this.props.actionHistory);
      }
      if(typeof this.props.moveBuffer === 'object' && this.props.moveBuffer !== null) {
        this.chessRenderer.global.emitter.emit('moveBufferUpdate', this.props.moveBuffer);
      }
      if(typeof this.props.checks === 'object' && this.props.checks !== null) {
        this.chessRenderer.global.emitter.emit('checksUpdate', this.props.checks);
      }
      if(typeof this.props.availableMoves === 'object' && this.props.availableMoves !== null) {
        this.chessRenderer.global.availableMoves(this.props.availableMoves);
      }
      if(typeof this.props.pastAvailableMoves === 'object' && this.props.pastAvailableMoves !== null) {
        this.chessRenderer.global.pastAvailableMoves(this.props.pastAvailableMoves);
      }
    }
    else {
      window.setTimeout(this.updateRenderer.bind(this), 500);
    }
  }
  async componentDidMount() {
    //Attach to div element
    this.chessRenderer = new ChessRenderer(
      this.rootRef.current,
      deepmerge({ app: { interactive: false } }, crConfig.get()),
      crPalette.get(),
      null,
      await this.firstTextureLoad()
    );
    window.cr = this.chessRenderer;
    //Initialization
    this.chessRenderer.global.sync(new Chess());
    this.chessRenderer.zoom.present(true, 1.75);
    //Renderer listener
    this.chessRenderer.on('moveSelect', (move) => {
      if(typeof this.props.onMove === 'function') {
        this.props.onMove(move);
      }
    });
    //Listen for changes in palette, config, and texture settings
    this.paletteListener = this.context.on('paletteUpdate', () => {
      this.updatePalette();
    });
    this.configListener = this.context.on('configUpdate', () => {
      this.updateConfig();
    });
    this.textureListener = this.context.on('textureUpdate', () => {
      this.updateTexture();
    });
    //Update palette and config right now
    this.updatePalette();
    this.updateConfig();
    //Update renderer data
    this.updateRenderer();
  }
  componentDidUpdate(prevProps) {
    //Look for changes in div width or height and update chessRenderer
    //Check if palette props has changed
    if(!deepequal(prevProps.palette, this.props.palette)) {
      this.updatePalette();
    }
    //Check if config props has changed
    if(!deepequal(prevProps.config, this.props.config)) {
      this.updateConfig();
    }
    //Update renderer data
    this.updateRenderer();
  }
  componentWillUnmount() {
    //Stop listening to palette, config, and texture changes
    if(typeof this.paletteListener === 'function') { this.paletteListener(); }
    if(typeof this.configListener === 'function') { this.configListener(); }
    if(typeof this.textureListener === 'function') { this.textureListener(); }
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