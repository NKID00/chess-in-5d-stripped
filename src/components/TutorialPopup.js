import React from 'react';

import Options from 'Options';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';

import ReactMarkdown from 'react-markdown';
import LinkButton from 'components/LinkButton';

export default class RulesPopup extends React.Component {
  state = {
    showTutorialPopup: Options.get('tutorial').tutorialPopup
  };
  render() {
    return (
      <Modal
        isOpen={this.state.showTutorialPopup}
        style={{
          overlay: {backgroundColor: 'rgba(0,0,0,0)'},
          content: {
            top: '30vh',
            left: '20vw',
            width: '60vw',
            height: '40vh',
            padding: '0px'
          }
        }}
      >
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
          sx={{position: 'absolute', top: 0}}
        >
          <Text p={2} fontWeight='bold'>Welcome</Text>
          <Box mx='auto' />
        </Flex>
        <Box id='markdown-container' width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
          <ReactMarkdown
            linkTarget='_blank'
            source={`# Welcome to Chess in 5D!

A reimplementation of *5D Chess with Multiverse Time Travel*, Chess in 5D looks to faithfully replicate the rules as expressed in that game while providing additional features.

Whether you're a beginner or a FIDE Grand Master, Chess in 5D is a completely new experience!

If you have not already experienced *5D Chess with Multiverse Time Travel*, playing through the tutorial is highly recommended.`
            }
          />
          <Box my={3} />
        </Box>
        <Flex
          p={2}
          alignItems='center'
          bg='white'
          width={1}
          sx={{position: 'absolute', bottom: 0}}
        >
          <Box mx='auto' />
          <Button
            variant='secondary'
            m={1}
            onClick={() => {
              this.setState({ showTutorialPopup: false });
              Options.set('tutorial', { tutorialPopup: false });
            }}
          >
            Close
          </Button>
          <LinkButton
            to='/tutorial/basics'
            m={1}
            onClick={() => {
              this.setState({ showTutorialPopup: false });
              Options.set('tutorial', { tutorialPopup: false });
            }}
          >
            Start Tutorial
          </LinkButton>
        </Flex>
      </Modal>
    );
  }
}
