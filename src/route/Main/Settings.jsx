import React from 'react';

import { Trans } from '@lingui/macro';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import Palette from 'route/Main/Settings/Palette';

export default class Settings extends React.Component {
  state = {
    tab: 'palette'
  }
  render() {
    return (
      <Box m={2}>
        <Card>
          <TabContext value={this.state.tab}>
            <AppBar position='static' color='default'>
              <TabList
                onChange={(e,v) => { this.setState({ tab: v }); }}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                selectionFollowsFocus
              >
                <Tab value='general' label={<Trans>General</Trans>} />
                <Tab value='theme' label={<Trans>Theme</Trans>} />
                <Tab value='palette' label={<Trans>Palette</Trans>} />
                <Tab value='graphics' label={<Trans>Graphics</Trans>} />
              </TabList>
            </AppBar>
            <TabPanel value='palette'>
              <Palette />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    );
  }
}
