import React from 'react';

import { Box, Flex } from 'rebass';
import LinkButton from 'components/LinkButton';
import MenuBar from 'components/MenuBar';

export default class TutorialMenu extends React.Component {
  render() {
    return (
      <>
        <MenuBar />
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
              Checkmate
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
