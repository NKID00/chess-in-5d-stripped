import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AvTimerIcon from '@material-ui/icons/AvTimer';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

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
    return (
      <Card>
        <Box m={1}>
          <ButtonGroup>
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
          </ButtonGroup>
        </Box>
      </Card>
    );
  }
}
