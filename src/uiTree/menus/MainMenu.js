import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';

export default class MainMenu extends React.Component {
  render() {
    return (
      <>
        <a href="https://gitlab.com/alexbay218/chess-in-5d">
          <span
            style={{
              fontFamily: 'tahoma',
              fontSize: '20px',
              position: 'fixed',
              top: '50px',
              right: '-45px',
              display: 'block',
              WebkitTransform: 'rotate(45deg)',
              MozTransform: 'rotate(45deg)',
              backgroundColor: '#fc6d27',
              color: 'white',
              padding: '4px 30px 4px 30px',
              zIndex: '999'
            }}
          >
            Fork Me On GitLab
          </span>
        </a>
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
            <Button
              variant='primary'
              color='white'
              bg='#7289da'
              width={1}
              my={3}
              onClick={() => { window.open('https://discord.gg/KP5vApW'); }}
            >
              Discord
            </Button>
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
