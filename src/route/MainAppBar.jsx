import React from 'react';
import { withRouter } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Logo from 'assets/logo.png';
import LoginButton from 'route/MainAppBar/LoginButton';
import Menu from 'route/MainAppBar/Menu';

class MainAppBar extends React.Component {
  state = {
    openMenu: false
  }
  render() {
    return (
      <React.Fragment>
        <AppBar position='sticky'>
          <Toolbar>
            <IconButton 
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={() => { this.setState({ openMenu: true }); }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              mx={2}
              my={1}
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              <img src={Logo} alt='Logo' style={{ height: 40 }} />
            </Box>
            <Typography
              variant='h6'
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              Chess In 5D
            </Typography>
            <Box flexGrow={1} />
            <LoginButton />
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          anchor='left'
          open={this.state.openMenu}
          onOpen={() => { this.setState({ openMenu: true }); }}
          onClose={() => { this.setState({ openMenu: false }); }}
        >
          <Menu
            onClose={() => { this.setState({ openMenu: false }); }}
          />
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}

export default withRouter(MainAppBar);