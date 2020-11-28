import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';
import copy from 'copy-to-clipboard';

import ReactMarkdown from 'react-markdown';
import BugTrackerText from 'components/BugTrackerText.md';

export default class RulesMenu extends React.Component {
  state = {
    debug: navigator.userAgent,
    text: '### Loading...'
  };
  componentDidMount() {
    fetch(BugTrackerText)
    .then((res) => { return res.text(); })
    .then((text) => { this.setState({text: text}); });
  }
  render() {
    return (
      <>
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
        >
          <img src={LogoIcon} alt='Logo' onClick={() => { window.location.href = window.location.origin; }} />
          <Text p={2} fontWeight='bold' onClick={() => { window.location.href = window.location.origin; }}>Chess in 5D</Text>
          <Box mx='auto' />
        </Flex>
        <Modal
          isOpen={true}
          style={{content: {padding: '0px'}}}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            width={1}
            sx={{position: 'absolute', top: 0}}
          >
            <Text p={2} fontWeight='bold'>Bug Reporter</Text>
            <Box mx='auto' />
          </Flex>
          <Box id='markdown-container' width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <Text
              p={2}
              sx={{
                WebkitTouchCallout: 'all',
                WebkitUserSelect: 'all',
                KhtmlUserSelect: 'all',
                MozUserSelect: 'all',
                MsUserSelect: 'all',
                userSelect: 'all'
              }}
            >
              {this.state.debug}
            </Text>
            <ReactMarkdown
              linkTarget='_blank'
              source={this.state.text}
              transformImageUri={(uri) => {
                return uri.startsWith('http') ? uri : `http://localhost:3000${uri}`;
              }}
            />
          </Box>
          <Flex
            p={2}
            alignItems='center'
            bg='white'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <LinkButton
              to='/'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary'
              onClick={() => {
                copy(this.state.debug);
              }}
            >
              Copy to clipboard
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
}
