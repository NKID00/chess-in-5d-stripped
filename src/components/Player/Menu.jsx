import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SendIcon from '@material-ui/icons/Send';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import SettingsIcon from '@material-ui/icons/Settings';

const deepmerge = require('deepmerge');

export default class Menu extends React.Component {
  state = {
    showClock: false,
    showNotation: false,
  }
  propSync() {
    if(this.state.showClock !== this.props.showClock) {
      this.setState({ showClock: this.props.showClock });
    }
    if(this.state.showNotation !== this.props.showNotation) {
      this.setState({ showNotation: this.props.showNotation });
    }
  }
  componentDidMount() {
    this.propSync();
  }
  componentDidUpdate() {
    this.propSync();
  }
  render() {
    var availableButtons = [];
    if(this.props.showSubmitButton) {
      availableButtons.push(
        <Button
          variant={this.state.showSubmit ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showSubmit: !this.state.showSubmit }));
            }
          }}
        >
          <SendIcon />
        </Button>
      );
    }
    if(this.props.showClockButton) {
      availableButtons.push(
        <Button
          variant={this.state.showClock ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showClock: !this.state.showClock }));
            }
          }}
        >
          <AvTimerIcon />
        </Button>
      );
    }
    if(this.props.showNotationButton) {
      availableButtons.push(
        <Button
          variant={this.state.showNotation ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showNotation: !this.state.showNotation }));
            }
          }}
        >
          <FormatListNumberedIcon />
        </Button>
      );
    }
    if(this.props.showAnalyzeButton) {
      availableButtons.push(
        <Button
          variant={this.state.showAnalyze ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showAnalyze: !this.state.showAnalyze }));
            }
          }}
        >
          <CompareArrowsIcon />
        </Button>
      );
    }
    if(this.props.showSettingsButton) {
      availableButtons.push(
        <Button
          variant={this.state.showSettings ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showSettings: !this.state.showSettings }));
            }
          }}
        >
          <SettingsIcon />
        </Button>
      );
    }
    return (
      <Box m={1} style={{ overflowX: 'auto', width: '100%' }}>
        <ButtonGroup>
          {availableButtons}
        </ButtonGroup>
      </Box>
    );
  }
}
