import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text } from 'rebass';
import MenuBar from 'components/MenuBar';
import Options from 'Options';
import LinkButton from 'components/LinkButton';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import UsersMenu from 'uiTree/menus/network/UsersMenu';
import SessionMenu from 'uiTree/menus/network/SessionMenu';
import LoginRedirect from 'components/network/LoginRedirect';
import UserProfile from 'components/network/UserProfile';

export default class ServerMenu extends React.Component {
  state = {
    tab: 'users'
  }
  render() {
    return (
      <>
        <MenuBar />
        <Modal
          isOpen={true}
          style={{
            overlay: {backgroundColor: 'rgba(0,0,0,0)'},
            content: {padding: '0px'}
          }}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            width={1}
            sx={{position: 'absolute', top: 0, zIndex: 100}}
          >
            <Text p={2} fontWeight='bold'>Connected to server ({Options.get('server').url})</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.tab}
                onChange={(e, v) => {
                  this.setState({ tab: v });
                }}
                indicatorColor='primary'
                variant='fullWidth'
              >
                <Tab label='My Profile' value='user' />
                <Tab label='Users' value='users' />
                <Tab label='Sessions' value='sessions' />
                <Tab label='Past Games (WIP)' value='games' />
                <Tab label='Rankings (WIP)' value='rankings' />
              </Tabs>
            </AppBar>
            <Box px={2} py={2}>
              {this.state.tab === 'user' ?
                <>
                  <UserProfile />
                  <LoginRedirect to='/network/server' backLink='/network' />
                </>
              : this.state.tab === 'users' ?
                <>
                  <UsersMenu />
                </>
              : this.state.tab === 'sessions' ?
                <SessionMenu />
              : this.state.tab === 'games' ?
                'Past Games'
              :
                'Rankings'
              }
            </Box>
          </Box>
          <Flex
            p={2}
            alignItems='center'
            bg='white'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <LinkButton
              to='/network'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
          </Flex>
        </Modal>
      </>
    );
  }
}