import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SwapVertIcon from '@material-ui/icons/SwapVert';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

const widthThreshold = 300;
export default class ViewMenu extends React.Component {
  rootRef = React.createRef();
  state = {
    showText: true
  };
  resize() {
    if(this.rootRef.current) {
      var width = this.rootRef.current.getBoundingClientRect().width;
      this.setState({
        showText: width > widthThreshold
      });
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <Card ref={this.rootRef}>
        <Box m={1}>
          <ButtonGroup fullWidth>
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
      </Card>
    );
  }
}
