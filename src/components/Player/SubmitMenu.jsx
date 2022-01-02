import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SendIcon from '@material-ui/icons/Send';
import UndoIcon from '@material-ui/icons/Undo';

import EmitterContext from 'utils/EmitterContext';

import * as PIXI from 'pixi.js';

const widthThreshold = 300;
const heightThreshold = 50;
export default class SubmitMenu extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  state = {
    showText: true
  };
  resize() {
    if(this.rootRef.current) {
      var width = this.rootRef.current.getBoundingClientRect().width;
      var height = this.rootRef.current.getBoundingClientRect().height;
      this.setState({
        showText: width > widthThreshold && height > heightThreshold
      });
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener);
    //Listen to layout resize updates
    this.layoutListener = this.context.on('layoutResizeUpdate', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    //Stop listening to layout resize updates
    if(typeof this.layoutListener === 'function') { this.layoutListener(); }
  }
  render() {
    return (
      <Box p={1} ref={this.rootRef} style={{ height: '100%' }}>
        <ButtonGroup className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} fullWidth style={{ height: '100%' }}>
          <Button
            disabled={!this.props.canUndo}
            startIcon={this.state.showText ? <UndoIcon /> : null}
            onClick={() => {
              if(typeof this.props.onUndo === 'function') {
                this.props.onUndo();
              }
            }}
          >
            {this.state.showText ?
              <Trans>Undo</Trans>
            :
              <UndoIcon />
            }
          </Button>
          <Button
            variant='contained'
            color={this.props.canSubmit ? 'primary' : 'default'}
            disabled={!this.props.canSubmit}
            endIcon={this.state.showText ? <SendIcon /> : null}
            onClick={() => {
              if(typeof this.props.onSubmit === 'function') {
                this.props.onSubmit();
              }
            }}
          >
            {this.state.showText ?
              <Trans>Submit</Trans>
            :
              <SendIcon />
            }
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
}
