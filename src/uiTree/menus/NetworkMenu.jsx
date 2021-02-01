import React from 'react';

import { Box, Flex } from 'rebass';
import LinkButton from 'components/LinkButton';
import MenuBar from 'components/MenuBar';

export default class NetworkMenu extends React.Component {
  render() {
    return (
      <>
        <MenuBar />
        <Flex>
          <Box width={1/3}></Box>
          <Box width={1/3}>
            <LinkButton
              to='/network/server'
              variant='primary'
              width={1}
              my={3}
            >
              Connect to Server
            </LinkButton>
            <LinkButton
              to='/network/game/host'
              variant='primary'
              width={1}
              my={3}
            >
              Host Private Game
            </LinkButton>
            <LinkButton
              to='/network/game/client'
              variant='primary'
              width={1}
              my={3}
            >
              Join Private Game
            </LinkButton>
            <LinkButton
              to='/'
              variant='secondary'
              width={1}
              my={3}
            >
              Back
            </LinkButton>
          </Box>
          <Box width={1/3}></Box>
        </Flex>
      </>
    );
  }
}
