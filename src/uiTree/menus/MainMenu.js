import React from 'react';

import { Box, Flex, Text } from 'rebass';
import LinkButton from 'components/LinkButton';

export default class MainMenu extends React.Component {
  render() {
    return (
      <>
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
          mb='30vh'
        >
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
        </Flex>
        <Flex>
          <Box width={1/3}></Box>
          <Box width={1/3}>
            <LinkButton
              to='/local'
              variant='primary'
              width={1}
              my={3}
            >
              Local Game
            </LinkButton>
            <LinkButton
              bg='grey'
              disabled
              width={1}
              my={3}
            >
              Network Game (WIP)
            </LinkButton>
            <LinkButton
              bg='grey'
              disabled
              width={1}
              my={3}
            >
              Options (WIP)
            </LinkButton>
          </Box>
          <Box width={1/3}></Box>
        </Flex>
        <Flex
          width={1}
          sx={{
            position: 'absolute',
            bottom: '0px'
          }}
          justifyContent='center'
          color='white'
          bg='black'
        >
          {'Version ' + process.env.REACT_APP_VERSION}
        </Flex>
      </>
    );
  }
}
