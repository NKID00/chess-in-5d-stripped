import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings';
import VisibilityIcon from '@material-ui/icons/Visibility';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

const deepmerge = require('deepmerge');

export default class Menu extends React.Component {
  state = {
    showSubmit: false,
    showView: false,
    showClock: false,
    showTutorial: false,
    showNotation: false,
    showAnalyze: false,
    showSettings: false,
  }
  propSync() {
    if(this.state.showSubmit !== this.props.showSubmit) {
      this.setState({ showSubmit: this.props.showSubmit });
    }
    if(this.state.showView !== this.props.showView) {
      this.setState({ showView: this.props.showView });
    }
    if(this.state.showClock !== this.props.showClock) {
      this.setState({ showClock: this.props.showClock });
    }
    if(this.state.showTutorial !== this.props.showTutorial) {
      this.setState({ showTutorial: this.props.showTutorial });
    }
    if(this.state.showNotation !== this.props.showNotation) {
      this.setState({ showNotation: this.props.showNotation });
    }
    if(this.state.showAnalyze !== this.props.showAnalyze) {
      this.setState({ showAnalyze: this.props.showAnalyze });
    }
    if(this.state.showSettings !== this.props.showSettings) {
      this.setState({ showSettings: this.props.showSettings });
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
    if(this.props.showViewButton) {
      availableButtons.push(
        <Button
          variant={this.state.showView ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showView: !this.state.showView }));
            }
          }}
        >
          <VisibilityIcon />
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
          <HourglassEmptyIcon />
        </Button>
      );
    }
    if(this.props.showTutorialButton) {
      availableButtons.push(
        <Button
          variant={this.state.showTutorial ? 'contained' : 'default'}
          onClick={() => {
            if(typeof this.props.onChange === 'function') {
              this.props.onChange(deepmerge(this.state, { showTutorial: !this.state.showTutorial }));
            }
          }}
        >
          <MenuBookIcon />
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
          <YoutubeSearchedForIcon />
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
      <Box m={1}>
        <ButtonGroup fullWidth>
          {availableButtons}
        </ButtonGroup>
      </Box>
    );
  }
}
