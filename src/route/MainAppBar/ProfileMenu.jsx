import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import UserAvatar from 'components/UserAvatar';

import EmitterContext from 'utils/EmitterContext';
import * as auth from 'network/auth';

class ProfileMenu extends React.Component {
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
            <ClickAwayListener
              onClickAway={() => {
                this.setState({ showMenu: false });
              }}
            >
              <MenuList autoFocusItem={this.state.showMenu}>
                <MenuItem disabled>{this.props.username}</MenuItem>
                <MenuItem
                  onClick={() => {
                    this.props.history.push('/profile');
                  }}
                >
                  <Trans>Edit Profile</Trans>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.props.history.push('/settings');
                  }}
                >
                  <Trans>Settings</Trans>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    auth.logout(this.context);
                  }}
                >
                  <Trans>Log Out</Trans>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </>
    );
  }
}

export default withRouter(ProfileMenu);