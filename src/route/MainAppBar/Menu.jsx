import React from 'react';

import { withRouter } from "react-router";

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import { GiPawn } from 'react-icons/gi';
import ExtensionIcon from '@material-ui/icons/Extension';
import TimelineIcon from '@material-ui/icons/Timeline';
import CreateIcon from '@material-ui/icons/Create';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonIcon from '@material-ui/icons/Person';
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
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Dashboard</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            this.props.history.push('/play-menu');
            if(typeof this.props.onClose === 'function') { this.props.onClose(); }
          }}
        >
          <ListItemIcon>
            <GiPawn size={25} />
          </ListItemIcon>
          <ListItemText>
            <Trans>Play</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
        <ListItem
          button
          disabled
          onClick={() => {
            this.props.history.push('/puzzles');
            if(typeof this.props.onClose === 'function') { this.props.onClose(); }
          }}
        >
          <ListItemIcon>
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Puzzles</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
        <ListItem
          button
          disabled
          onClick={() => {
            this.props.history.push('/learn');
            if(typeof this.props.onClose === 'function') { this.props.onClose(); }
          }}
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Learn</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            this.props.history.push('/analyze-menu');
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
          disabled
          onClick={() => {
            this.props.history.push('/edit');
            if(typeof this.props.onClose === 'function') { this.props.onClose(); }
          }}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Edit</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
        <Divider />
        {this.state.loggedIn ?
          <ListItem
            button
            onClick={() => {
              this.props.history.push('/profile');
              if(typeof this.props.onClose === 'function') { this.props.onClose(); }
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <Trans>Profile</Trans>
            </ListItemText>
            <Box m={2} />
          </ListItem>
        :
          <></>
        }
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