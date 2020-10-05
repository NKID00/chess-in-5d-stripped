import React from 'react';

import { Box, Flex, Text } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';

export default class LocalMenu extends React.Component {
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
              to='/local/game/analyze'
              variant='primary'
              width={1}
              my={3}
            >
              Match Analyzer
            </LinkButton>
            <LinkButton
              to='/local/game/human'
              variant='primary'
              width={1}
              my={3}
            >
              Versus Human
            </LinkButton>
            <LinkButton
              variant='primary'
              bg='grey'
              disabled
              width={1}
              my={3}
            >
              <del><i>Versus Computer</i></del>
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
