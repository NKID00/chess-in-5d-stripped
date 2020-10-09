import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';

import ReactMarkdown from 'react-markdown';
import RulesText from 'components/RulesText.md';

export default class RulesMenu extends React.Component {
  state = {
    text: '### Loading...'
  };
  componentDidMount() {
    fetch(RulesText)
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
          <img src={LogoIcon} alt='Logo' />
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
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
            <Text p={2} fontWeight='bold'>Rules</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <ReactMarkdown source={this.state.text} />
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
          </Flex>
        </Modal>
      </>
    );
  }
}
