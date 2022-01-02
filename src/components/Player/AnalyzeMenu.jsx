import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import RestoreIcon from '@material-ui/icons/Restore';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import * as PIXI from 'pixi.js';

export default class AnalyzeMenu extends React.Component {
  render() {
    return (
      <Box p={1} style={{ height: '100%' }}>
        <ButtonGroup className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} fullWidth style={{ height: '100%' }}>
          <Button
            onClick={() => {
              if(typeof this.props.onPreviousAction === 'function') {
                this.props.onPreviousAction();
              }
            }}
          >
            <SkipPreviousIcon />
          </Button>
          <Button
            onClick={() => {
              if(typeof this.props.onPreviousMove === 'function') {
                this.props.onPreviousMove();
              }
            }}
          >
            <FastRewindIcon />
          </Button>
          <Button
            onClick={() => {
              if(typeof this.props.onRestore === 'function') {
                this.props.onRestore();
              }
            }}
          >
            <RestoreIcon />
          </Button>
          <Button
            onClick={() => {
              if(typeof this.props.onNextMove === 'function') {
                this.props.onNextMove();
              }
            }}
          >
            <FastForwardIcon />
          </Button>
          <Button
            onClick={() => {
              if(typeof this.props.onNextAction === 'function') {
                this.props.onNextAction();
              }
            }}
          >
            <SkipNextIcon />
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
}
