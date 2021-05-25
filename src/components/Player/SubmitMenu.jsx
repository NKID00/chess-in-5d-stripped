import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SendIcon from '@material-ui/icons/Send';
import UndoIcon from '@material-ui/icons/Undo';

const widthThreshold = 300;
export default class SubmitMenu extends React.Component {
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
              color='primary'
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
      </Card>
    );
  }
}
