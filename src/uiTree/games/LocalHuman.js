import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import LinkButton from 'components/LinkButton';
import GamePlayer from 'components/GamePlayer';

export default class LocalHuman extends React.Component {
  state = {
    start: true
  };
  render() {
    return (
      <>
        <Modal
          isOpen={!this.state.start}
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
            <Text p={2} fontWeight='bold'>Settings</Text>
            <Box mx='auto' />
          </Flex>
          <Flex width={1} px={2} py={5} sx={{height: '100%'}}>

          </Flex>
          <Flex
            p={2}
            alignItems='center'
            sx={{position: 'absolute', bottom: 0, width: '100%'}}
          >
            <Box mx='auto' />
            <LinkButton
              to='/local'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary' onClick={() => { this.setState({start: true}); }}>Start</Button>
          </Flex>
        </Modal>
        <GamePlayer
          canControlWhite
          canControlBlack
        />
      </>
    );
  }
}
