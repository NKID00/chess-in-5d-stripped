import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import EmitterContext from 'utils/EmitterContext';
import * as crConfig from 'state/config';

import * as PIXI from 'pixi.js';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

const widthThreshold = 300;
export default class SettingsMenu extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  state = {
    wideMode: false,
    config: crConfig.get()
  };
  resize() {
    if(this.rootRef.current) {
      var width = this.rootRef.current.getBoundingClientRect().width;
      this.setState({
        wideMode: width > widthThreshold
      });
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener);
    //Listen to layout resize updates
    this.layoutListener = this.context.on('layoutResizeUpdate', this.resizeListener);
    //Update state if config are changed
    this.configListener = this.context.on('configUpdate', () => {
      this.setState({ config: crConfig.get() });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //Update config if state has changed
    if(!deepequal(prevState.config, this.state.config)) {
      crConfig.set(this.state.config, this.context);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    //Stop listening to layout resize updates
    if(typeof this.layoutListener === 'function') { this.layoutListener(); }
    //Stop listening to config changes
    if(typeof this.configListener === 'function') { this.configListener(); }
  }
  render() {
    return (
      <Box p={1} ref={this.rootRef} style={{ height: '100%' }}>
        <Grid container spacing={2} className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} style={{ overflowY: 'auto', height: '100%' }}>
          <Grid item xs={12}>
            <Box mt={1} />
            <FormControl variant='outlined' fullWidth>
              <InputLabel><Trans>Show Board</Trans></InputLabel>
              <Select
                label={<Trans>Show Board</Trans>}
                value={this.state.config.board.showWhite && this.state.config.board.showBlack ?
                  'both'
                : !this.state.config.board.showWhite && this.state.config.board.showBlack ?
                  'black'
                :
                  'white'
                }
                onChange={(event) => {
                  if(event.target.value === 'white') {
                    this.setState(deepmerge(this.state, { config: { board: { showBlack: false, showWhite: true } } }));
                  }
                  else if(event.target.value === 'black') {
                    this.setState(deepmerge(this.state, { config: { board: { showBlack: true, showWhite: false } } }));
                  }
                  else {
                    this.setState(deepmerge(this.state, { config: { board: { showBlack: true, showWhite: true } } }));
                  }
                }}
              >
                <MenuItem value='white'><Trans>White</Trans></MenuItem>
                <MenuItem value='black'><Trans>Black</Trans></MenuItem>
                <MenuItem value='both'><Trans>Both</Trans></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant='outlined' fullWidth>
              <InputLabel><Trans>Show Move</Trans></InputLabel>
              <Select
                label={<Trans>Show Move</Trans>}
                value={this.state.config.arrow.showSpatial && this.state.config.arrow.showNonSpatial ?
                  'all'
                : !this.state.config.arrow.showSpatial && this.state.config.arrow.showNonSpatial ?
                  'nonSpatial'
                : this.state.config.arrow.showSpatial && !this.state.config.arrow.showNonSpatial ?
                  'spatial'
                :
                  'none'
                }
                onChange={(event) => {
                  if(event.target.value === 'all') {
                    this.setState(deepmerge(this.state, { config: { arrow: { showSpatial: true, showNonSpatial: true } } }));
                  }
                  else if(event.target.value === 'spatial') {
                    this.setState(deepmerge(this.state, { config: { arrow: { showSpatial: true, showNonSpatial: false } } }));
                  }
                  else if(event.target.value === 'nonSpatial') {
                    this.setState(deepmerge(this.state, { config: { arrow: { showSpatial: false, showNonSpatial: true } } }));
                  }
                  else {
                    this.setState(deepmerge(this.state, { config: { arrow: { showSpatial: false, showNonSpatial: false } } }));
                  }
                }}
              >
                <MenuItem value='all'><Trans>All</Trans></MenuItem>
                <MenuItem value='nonSpatial'><Trans>Non-Spatial Only</Trans></MenuItem>
                <MenuItem value='spatial'><Trans>Spatial Only</Trans></MenuItem>
                <MenuItem value='none'><Trans>None</Trans></MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Automatic Recenter</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.extra.autoRecenter}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { extra: { autoRecenter: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Automatic Flip Perspective</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.extra.autoFlip}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { extra: { autoFlip: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Automatic Submit</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.extra.autoSubmit}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { extra: { autoSubmit: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Show Future Boards</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.board.showGhost}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { board: { showGhost: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Timeline Labels</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.boardLabel.showTimeline}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { boardLabel: { showTimeline: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Turn Labels</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.boardLabel.showTurn}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { boardLabel: { showTurn: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={this.state.wideMode ? 6 : 12}>
            <FormControlLabel
              label={<Trans>Board Labels</Trans>}
              control={
                <Checkbox
                  color='primary'
                  checked={this.state.config.boardLabel.showFile}
                  onChange={(event) => {
                    this.setState(deepmerge(this.state, { config: { boardLabel: { showFile: event.target.checked, showRank: event.target.checked } } }));
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}