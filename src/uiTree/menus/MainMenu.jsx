import React from 'react';

import { Box, Flex, Button } from 'rebass';
import LinkButton from 'components/LinkButton';
import MenuBar from 'components/MenuBar';
import TutorialPopup from 'components/TutorialPopup';

export default class MainMenu extends React.Component {
  render() {
    return (
      <>
        <MenuBar />
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
              to='/tutorial'
              variant='primary'
              width={1}
              my={3}
            >
              Tutorials
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
        <TutorialPopup />
      </>
    );
  }
}
