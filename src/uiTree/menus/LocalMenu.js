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
        >
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
              to='/main'
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
