import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import TextField from '@material-ui/core/TextField';
import { BiChat, BiSend } from 'react-icons/bi';

export default class Settings extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: false,
    chatStr: ''
  };
  sendChat() {
    if(typeof this.props.sendChat === 'function') {
      this.props.sendChat(this.state.chatStr);
    }
    this.setState({chatStr: ''});
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = window.innerWidth - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
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
          <BiChat size={20} />
        </Button>
        <Box
          ref={this.boxRef}
          p={2}
          width={[1/2,1/3,1/4]}
          bg='white'
          color='black'
          sx={{display: this.state.open ? 'block' : 'none', maxHeight: '65vh', overflowY: 'auto'}}
        >
          {this.props.chat.map((e) => {
            return (
              <Text p={2} width={1}>
                <b>{e.source === 'host' ? this.props.hostName : this.props.clientName}:</b> {e.string}
              </Text>
            );
          })}
          <Flex width={1}>
            <TextField
              fullWidth
              value={this.state.playerName}
              onChange={(e) => {
                if(e.keyCode === 13) {
                  this.sendChat();
                }
                else {
                  this.setState({chatStr: e.target.value});
                }
              }}
            />
            <Button
              variant='outline'
              bg='white'
              color='black'
              justifyContent='center'
              alignItems='center'
              px={2}
              onClick={() => {
                this.sendChat();
              }}
            >
              <BiSend size={20} />
            </Button>
          </Flex>
        </Box>
      </>
    );
  }
}
