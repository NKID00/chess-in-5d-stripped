import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';

export default class AnalyzeMenu extends React.Component {
  render() {
    return (
      <Box p={1} style={{ height: '100%' }}>
        <ButtonGroup fullWidth style={{ height: '100%' }}>
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
