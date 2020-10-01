import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';

export default class NotationViewer extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state={
    open: false
  };
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = this.buttonRef.current.getBoundingClientRect().right - this.boxRef.current.getBoundingClientRect().width + 'px';
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
        >
          View Notation
        </Button>
        {typeof this.props.notation === 'string' && this.state.open ?
          <Box
            ref={this.boxRef}
            p={2}
            width={[1/2,1/3,1/4,1/5]}
            bg='grey'
          >
            {this.props.notation.replace(/\r\n/g, '\n').split('\n').map((e) => {
              return (e.length > 0 ?
                <Box
                  p={2}
                  m={2}
                  color={e.includes('w.') ? 'black' : 'white'}
                  bg={e.includes('w.') ? 'white' : 'black'}
                  key={e}
                >
                  <Text p={1} fontWeight='bold'>{e}</Text>
                </Box>
              :
                null
              );
            })}
            <Flex>
              <Box mx='auto' />
              <Button
                variant='primary'
                m={1}
                onClick={() => {}}
              >
                Import
              </Button>
              <Button
                variant='primary'
                m={1}
                onClick={() => {}}
              >
                Export
              </Button>
            </Flex>
          </Box>
        :
          <></>
        }
      </>
    );
  }
}
