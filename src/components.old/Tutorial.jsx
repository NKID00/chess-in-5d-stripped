import React from 'react';

import { Box, Flex, Button } from 'rebass';
import { MdHelpOutline } from 'react-icons/md';

import ReactMarkdown from 'react-markdown';

export default class Tutorial extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: true
  };
  componentDidMount() {
    if(this.boxRef.current !== null && this.buttonRef.current !== null) {
      this.boxRef.current.style.position = 'absolute';
      this.boxRef.current.style.left = '13px';
      this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = '13px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
  }
  render() {
    return (
      <>
        <Button
          ref={this.buttonRef}
          variant='primary'
          onClick={() => {
            this.setState({open: !this.state.open});
          }}
          justifyContent='center'
          alignItems='center'
          px={2}
          ml={2}
        >
          <MdHelpOutline size={20} />
        </Button>
        <Box
          ref={this.boxRef}
          p={2}
          width={[2/3,1/2,2/5]}
          bg='white'
          color='black'
          sx={{display: this.state.open ? 'block' : 'none'}}
        >
          <Box
            sx={{maxHeight: '80vh', overflowY: 'auto'}}
          >
            {Array.isArray(this.props.tutorialArray) && this.props.step >= 0 && this.props.step < this.props.tutorialArray.length ?
              <Box id='markdown-tutorial'>
                <ReactMarkdown
                  linkTarget='_blank'
                  source={this.props.tutorialArray[this.props.step].text}
                  transformImageUri={(uri) => {
                    return this.props.tutorialArray[this.props.step].assets[uri];
                  }}
                />
              </Box>
            :
              <></>
            }
          </Box>
          <Flex width={1}>
            <Button
              disabled={this.props.disablePrevious}
              variant={this.props.disablePrevious ? 'outline' : 'primary'}
              onClick={() => {
                if(typeof this.props.onPrevious === 'function') {
                  this.props.onPrevious();
                }
              }}
              m={1}
              width={1}
            >
              Prev
            </Button>
            <Button
              disabled={this.props.disableNext}
              variant={this.props.disableNext ? 'outline' : 'primary'}
              onClick={() => {
                if(typeof this.props.onNext === 'function') {
                  this.props.onNext();
                }
              }}
              m={1}
              width={1}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </>
    );
  }
}
