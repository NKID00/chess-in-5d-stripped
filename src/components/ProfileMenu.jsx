import React from 'react';

import { Trans } from '@lingui/macro';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import UserAvatar from 'components/UserAvatar';

import EmitterContext from 'EmitterContext';
import * as auth from 'network/auth';

export default class ProfileMenu extends React.Component {
  static contextType = EmitterContext;
  avatarRef = React.createRef();
  state = {
    showMenu: false
  };
  render() {
    return (
      <>
        <IconButton
          ref={this.avatarRef}
          onClick={() => {
            this.setState({ showMenu: !this.state.showMenu });
          }}
        >
          <UserAvatar username={this.props.username} />
        </IconButton>
        <Popper
          open={this.state.showMenu}
          anchorEl={this.avatarRef.current}
          style={{ zIndex: 1900 }}
        >
          <Paper>
            <MenuList autoFocusItem={this.state.showMenu}>
              <MenuItem>{this.props.username}</MenuItem>
              <MenuItem
                onClick={() => {
                  auth.logout(this.context);
                }}
              >
                <Trans>Log Out</Trans>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </>
    );
  }
}
