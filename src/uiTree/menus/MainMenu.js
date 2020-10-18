import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
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
              to='/network'
              variant='primary'
              width={1}
              my={3}
            >
              Network Game
            </LinkButton>
            <LinkButton
              to='/rules'
              variant='primary'
              width={1}
              my={3}
            >
              Rules
            </LinkButton>
            <LinkButton
              to='/options'
              variant='primary'
              width={1}
              my={3}
            >
              Options
            </LinkButton>
            <LinkButton
              to='/bugs'
              variant='secondary'
              width={1}
              my={3}
            >
              Report Bugs
            </LinkButton>
            <Button
              variant='primary'
              color='white'
              bg='#fc6d27'
              width={1}
              my={3}
              onClick={() => { window.open('https://gitlab.com/alexbay218/chess-in-5d'); }}
            >
              GitLab
            </Button>
            <Button
              variant='primary'
              color='white'
              bg='#7289da'
              width={1}
              my={3}
              onClick={() => { window.open('https://discord.gg/Df44sHt'); }}
            >
              Discord
            </Button>
          </Box>
          <Box width={1/3}></Box>
        </Flex>
      </>
    );
  }
}
