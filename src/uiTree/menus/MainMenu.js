import React from 'react';

import { Box, Flex, Text } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';

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
        >
          <img src={LogoIcon} alt='Logo' />
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
              <del><i>Network Game</i></del>
            </LinkButton>
            <LinkButton
              bg='grey'
              disabled
              width={1}
              my={3}
            >
              <del><i>Options</i></del>
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
