import React from 'react';

import { Trans } from '@lingui/macro';

import Markdown from 'react-markdown';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const widthThreshold = 300;
export default class TutorialMenu extends React.Component {
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
      <Box p={1} ref={this.rootRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box p={1} style={{ overflowY: 'auto', flex: 1 }}>
          <Markdown>
            {this.props.displayText}
          </Markdown>
        </Box>
        <Box pt={1} style={{ flexBasis: 'auto' }}>
          <ButtonGroup fullWidth>
            <Button
              variant='contained'
              color='primary'
              disabled={!this.props.allowBack}
              startIcon={this.state.showText ? <ArrowBackIosIcon /> : null}
              onClick={() => {
                if(typeof this.props.onBack === 'function') {
                  this.props.onBack();
                }
              }}
            >
              {this.state.showText ?
                <Trans>Back</Trans>
              :
                <ArrowBackIosIcon />
              }
            </Button>
            <Button
              variant='contained'
              color='primary'
              disabled={!this.props.allowNext}
              endIcon={this.state.showText ? <ArrowForwardIosIcon /> : null}
              onClick={() => {
                if(typeof this.props.onNext === 'function') {
                  this.props.onNext();
                }
              }}
            >
              {this.state.showText ?
                <Trans>Next</Trans>
              :
                <ArrowForwardIosIcon />
              }
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }
}
