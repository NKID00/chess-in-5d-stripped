import React from 'react';

import { Box, Flex } from 'rebass';
import LinkButton from 'components/LinkButton';
import MenuBar from 'components/MenuBar';

export default class LocalMenu extends React.Component {
  render() {
    return (
      <>
        <MenuBar />
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
              Human vs Human
            </LinkButton>
            <LinkButton
              to='/local/game/computer'
              variant='primary'
              width={1}
              my={3}
            >
              Human vs Computer
            </LinkButton>
            <LinkButton
              to='/local/game/computeronly'
              variant='primary'
              width={1}
              my={3}
            >
              Computer vs Computer
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
