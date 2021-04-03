import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';

export default class Menu extends React.Component {
  render() {
    return (
      <List>
        <ListItem
          button
          onClick={() => {}}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans>Dashboard</Trans>
          </ListItemText>
          <Box m={2} />
        </ListItem>
      </List>
    );
  }
}
