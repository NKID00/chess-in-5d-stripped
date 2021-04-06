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
import SettingsIcon from '@material-ui/icons/Settings';

class Menu extends React.Component {
  render() {
    return (
      <List>
        <ListItem
          button
          onClick={() => { this.props.history.push('/'); }}
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
          onClick={() => { this.props.history.push('/play'); }}
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
          onClick={() => { this.props.history.push('/analyze'); }}
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
          onClick={() => { this.props.history.push('/edit'); }}
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
          onClick={() => { this.props.history.push('/settings'); }}
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