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
import TimelineIcon from '@material-ui/icons/Timeline';
import CreateIcon from '@material-ui/icons/Create';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';

class Menu extends React.Component {
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
            this.props.history.push('/play');
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
            this.props.history.push('/analyze');
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