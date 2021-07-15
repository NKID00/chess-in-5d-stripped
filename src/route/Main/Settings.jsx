import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';

import Controls from 'route/Main/Settings/Controls';
import Gameplay from 'route/Main/Settings/Gameplay';
import General from 'route/Main/Settings/General';
import Theme from 'route/Main/Settings/Theme';
import Palette from 'route/Main/Settings/Palette';

class Settings extends React.Component {
  state = {
    tab: 'general'
  }
  updateURLSearch() {
    var search = new URLSearchParams(this.props.location.search);
    if(search.has('tab')) {
      this.setState({ tab: search.get('tab') });
    }
  }
  componentDidMount() {
    this.updateURLSearch();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.location.search !== this.props.location.search) {
      this.updateURLSearch();
    }
  }
  render() {
    return (
      <Box m={2}>
        <Card>
          <TabContext value={this.state.tab}>
            <AppBar position='static' color='default'>
              <TabList
                onChange={(e,v) => {
                  this.props.history.push({ search: `?tab=${v}` });
                  this.setState({ tab: v });
                }}
                indicatorColor='primary'
                textColor='primary'
                variant='scrollable'
                scrollButtons='auto'
                selectionFollowsFocus
              >
                <Tab value='general' label={<Trans>General</Trans>} />
                <Tab value='theme' label={<Trans>Theme</Trans>} />
                <Tab value='palette' label={<Trans>Palette</Trans>} />
                <Tab value='gameplay' label={<Trans>Gameplay</Trans>} />
                <Tab value='controls' label={<Trans>Controls</Trans>} />
                <Tab value='import' disabled label={<Trans>Import / Export</Trans>} />
              </TabList>
            </AppBar>
            <TabPanel value='general'>
              <General />
            </TabPanel>
            <TabPanel value='theme'>
              <Theme />
            </TabPanel>
            <TabPanel value='palette'>
              <Palette />
            </TabPanel>
            <TabPanel value='gameplay'>
              <Gameplay />
            </TabPanel>
            <TabPanel value='controls'>
              <Controls />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    );
  }
}

export default withRouter(Settings);
