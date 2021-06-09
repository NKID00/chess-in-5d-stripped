import React from 'react';

import { Trans } from '@lingui/macro';

import EmitterContext from 'EmitterContext';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SwapVertIcon from '@material-ui/icons/SwapVert';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

const widthThreshold = 300;
const heightThreshold = 50;
export default class ViewMenu extends React.Component {
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
        <ButtonGroup fullWidth style={{ height: '100%' }}>
          <Button
            startIcon={this.state.showText ? <SwapVertIcon /> : null}
            onClick={() => {
              if(typeof this.props.onUndo === 'function') {
                this.props.onPresentZoom();
              }
            }}
          >
            {this.state.showText ?
              <Trans>Flip View</Trans>
            :
              <SwapVertIcon />
            }
          </Button>
          <Button
            startIcon={this.state.showText ? <SelectAllIcon /> : null}
            onClick={() => {
              if(typeof this.props.onUndo === 'function') {
                this.props.onPresentZoom();
              }
            }}
          >
            {this.state.showText ?
              <Trans>Present</Trans>
            :
              <SelectAllIcon />
            }
          </Button>
          <Button
            startIcon={this.state.showText ? <ZoomOutMapIcon /> : null}
            onClick={() => {
              if(typeof this.props.onSubmit === 'function') {
                this.props.onFullboardZoom();
              }
            }}
          >
            {this.state.showText ?
              <Trans>Full</Trans>
            :
              <ZoomOutMapIcon />
            }
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
}
