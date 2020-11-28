import React from 'react';

import { Box, Flex, Text } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';

export default class TutorialMenu extends React.Component {
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
        <Flex>
          <Box width={1/3}></Box>
          <Box width={1/3}>
            <LinkButton
              to='/tutorial/basics'
              variant='primary'
              width={1}
              my={3}
            >
              Basics
            </LinkButton>
            <LinkButton
              to='/tutorial/movement'
              variant='primary'
              width={1}
              my={3}
            >
              Movement
            </LinkButton>
            <LinkButton
              to='/tutorial/movement2'
              variant='primary'
              width={1}
              my={3}
            >
              Movement Part 2
            </LinkButton>
            <LinkButton
              to='/tutorial/checkmate'
              variant='primary'
              width={1}
              my={3}
            >
              (WIP) Checkmate
            </LinkButton>
            <LinkButton
              to='/tutorial/rules'
              variant='primary'
              width={1}
              my={3}
            >
              (WIP) Rules
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
