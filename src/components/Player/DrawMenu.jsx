import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { FaEraser } from 'react-icons/fa';
import TimelineIcon from '@material-ui/icons/Timeline';
import UndoIcon from '@material-ui/icons/Undo';

import EmitterContext from 'utils/EmitterContext';
import * as crPalette from 'state/palette';

import * as PIXI from 'pixi.js';

import 'components/Player/Blink.css';

export default class DrawMenu extends React.Component {
  static contextType = EmitterContext;
  state = {
    middleMode: false,
    drawMode: false,
    drawType: 'custom1',
    eraseMode: false,
    palette: crPalette.get()
  }
  componentDidMount() {
    //Update state if palette settings are changed
    this.paletteListener = this.context.on('paletteUpdate', () => {
      this.setState({ palette: crPalette.get() });
    });
  }
  componentWillUnmount() {
    //Stop listening to palette setting changes
    if(typeof this.paletteListener === 'function') { this.paletteListener(); }
    if(typeof this.props.onDisableDraw === 'function') {
      this.props.onDisableDraw();
    }
  }
  render() {
    return (
      <Box p={1} pb={0} style={{ height: '100%' }}>
        <Grid container spacing={1} style={{ height: '100%' }}>
          <Grid item xs={2} style={{ height: '100%' }}>
            <Button
              className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''}
              fullWidth
              variant={this.state.middleMode ? 'contained' : 'outlined'}
              style={{ height: '100%' }}
              onClick={() => {
                if(this.state.drawMode) {
                  if(typeof this.props.onEnableDraw === 'function') {
                    this.props.onEnableDraw(this.state.drawType, !this.state.middleMode);
                  }
                }
                this.setState({ middleMode: !this.state.middleMode });
              }}
            >
              <TimelineIcon />
            </Button>
          </Grid>
          <Grid item xs={1} className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} style={{ height: '100%' }}>
            <Box
              className='borderBlink'
              animate={1}
              style={{
                height: '100%',
                widht: '100%',
                backgroundColor: PIXI.utils.hex2string(this.state.palette.arrow.custom1),
                margin: 0
              }}
              border={5}
              borderRadius={5}
              borderColor={this.state.drawMode && this.state.drawType === 'custom1' ?
                PIXI.utils.hex2string(this.state.palette.arrow.custom1Outline)
              :
                PIXI.utils.hex2string(this.state.palette.arrow.custom1)
              }
              onClick={() => {
                if(this.state.drawMode && this.state.drawType === 'custom1') {
                  this.setState({ drawMode: false });
                  if(typeof this.props.onDisableDraw === 'function') {
                    this.props.onDisableDraw();
                  }
                }
                else {
                  this.setState({ eraseMode: false, drawMode: true, drawType: 'custom1' });
                  if(typeof this.props.onEnableDraw === 'function') {
                    this.props.onEnableDraw('custom1', this.state.middleMode);
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={1} className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} style={{ height: '100%' }}>
            <Box
              className='borderBlink'
              animate={1}
              style={{
                height: '100%',
                widht: '100%',
                backgroundColor: PIXI.utils.hex2string(this.state.palette.arrow.custom2),
                margin: 0
              }}
              border={5}
              borderRadius={5}
              borderColor={this.state.drawMode && this.state.drawType === 'custom2' ?
                PIXI.utils.hex2string(this.state.palette.arrow.custom2Outline)
              :
                PIXI.utils.hex2string(this.state.palette.arrow.custom2)
              }
              onClick={() => {
                if(this.state.drawMode && this.state.drawType === 'custom2') {
                  this.setState({ drawMode: false });
                  if(typeof this.props.onDisableDraw === 'function') {
                    this.props.onDisableDraw();
                  }
                }
                else {
                  this.setState({ eraseMode: false, drawMode: true, drawType: 'custom2' });
                  if(typeof this.props.onEnableDraw === 'function') {
                    this.props.onEnableDraw('custom2', this.state.middleMode);
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={1} className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} style={{ height: '100%' }}>
            <Box
              className='borderBlink'
              animate={1}
              style={{
                height: '100%',
                widht: '100%',
                backgroundColor: PIXI.utils.hex2string(this.state.palette.arrow.custom3),
                margin: 0
              }}
              border={5}
              borderRadius={5}
              borderColor={this.state.drawMode && this.state.drawType === 'custom3' ?
                PIXI.utils.hex2string(this.state.palette.arrow.custom3Outline)
              :
                PIXI.utils.hex2string(this.state.palette.arrow.custom3)
              }
              onClick={() => {
                if(this.state.drawMode && this.state.drawType === 'custom3') {
                  this.setState({ drawMode: false });
                  if(typeof this.props.onDisableDraw === 'function') {
                    this.props.onDisableDraw();
                  }
                }
                else {
                  this.setState({ eraseMode: false, drawMode: true, drawType: 'custom3' });
                  if(typeof this.props.onEnableDraw === 'function') {
                    this.props.onEnableDraw('custom3', this.state.middleMode);
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={1} className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} style={{ height: '100%' }}>
            <Box
              className='borderBlink'
              animate={1}
              style={{
                height: '100%',
                widht: '100%',
                backgroundColor: PIXI.utils.hex2string(this.state.palette.arrow.custom4),
                margin: 0
              }}
              border={5}
              borderRadius={5}
              borderColor={this.state.drawMode && this.state.drawType === 'custom4' ?
                PIXI.utils.hex2string(this.state.palette.arrow.custom4Outline)
              :
                PIXI.utils.hex2string(this.state.palette.arrow.custom4)
              }
              onClick={() => {
                if(this.state.drawMode && this.state.drawType === 'custom4') {
                  this.setState({ drawMode: false });
                  if(typeof this.props.onDisableDraw === 'function') {
                    this.props.onDisableDraw();
                  }
                }
                else {
                  this.setState({ eraseMode: false, drawMode: true, drawType: 'custom4' });
                  if(typeof this.props.onEnableDraw === 'function') {
                    this.props.onEnableDraw('custom4', this.state.middleMode);
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={6} style={{ height: '100%' }}>
            <ButtonGroup className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} fullWidth style={{ height: '100%' }}>
              <Button
                onClick={() => {
                  if(typeof this.props.onUndo === 'function') {
                    this.props.onUndo();
                  }
                }}
              >
                <UndoIcon />
              </Button>
              <Button
                variant={this.state.eraseMode ? 'contained' : 'outlined'}
                onClick={() => {
                  if(this.state.eraseMode) {
                    this.setState({ eraseMode: false, drawMode: false });
                    if(typeof this.props.onDisableErase === 'function') {
                      this.props.onDisableErase();
                    }
                  }
                  else {
                    this.setState({ eraseMode: true, drawMode: false });
                    if(typeof this.props.onEnableErase === 'function') {
                      this.props.onEnableErase();
                    }
                  }
                }}
              >
                <FaEraser />
              </Button>
              <Button
                onClick={() => {
                  if(typeof this.props.onClear === 'function') {
                    this.props.onClear();
                  }
                }}
              >
                <DeleteOutlineIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    );
  }
}