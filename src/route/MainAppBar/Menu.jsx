import React from 'react';

import { withRouter } from "react-router";

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';

class Menu extends React.Component {
  static contextType = EmitterContext;
  state = {
    loggedIn: authStore.isLoggedIn()
  }
  componentDidMount() {
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.setState({ loggedIn: authStore.isLoggedIn() });
    });
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    return (
      <List>
        <ListItem
          button
          onClick={() => {
            this.props.history.push('/');
            if(typeof this.props.onClose === 'function') { this.props.onClose(); }
          }}
        >
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Analyze</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            this.props.history.push('/settings');
            if(typeof this.props.onClose === 'function') { this.props.onClose(); }
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Settings</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
      </List>
    );
  }
}

export default withRouter(Menu);