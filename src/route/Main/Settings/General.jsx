import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EmitterContext from 'utils/EmitterContext';
import * as settings from 'state/settings';
import * as version from 'state/version';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');
const browserInfo = require('browser-info');

export default class General extends React.Component {
  static contextType = EmitterContext;
  state = {
    section: 'language',
    showSection: false,
    settings: settings.get()
  };
  componentDidMount() {
    //Update state if settings are changed
    this.settingsListener = this.context.on('settingsUpdate', () => {
      this.setState({ settings: settings.get() });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //Update settings if state has changed
    if(!deepequal(prevState.settings, this.state.settings)) {
      settings.set(this.state.settings, this.context);
    }
  }
  componentWillUnmount() {
    //Stop listening to settings changes
    if(typeof this.settingsListener === 'function') { this.settingsListener(); }
  }
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Accordion
              expanded={this.state.section === 'network' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'network', showSection: this.state.section !== 'network' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Network</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.settings.server}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { settings: { server: event.target.value } }));
                        }}
                        label={<Trans>Server Url</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.settings.key}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { settings: { key: event.target.value } }));
                        }}
                        label={<Trans>Server Key</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Enable Chat</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.settings.xmpp}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { settings: { xmpp: e.target.checked } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Use BOSH for Chat</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.settings.xmppBosh}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { settings: { xmppBosh: e.target.checked } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Auto Update</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.settings.autoUpdate}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { settings: { autoUpdate: e.target.checked } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={this.state.section === 'language' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'language', showSection: this.state.section !== 'language' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Language</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl variant='outlined' fullWidth>
                      <InputLabel><Trans>Locale</Trans></InputLabel>
                      <Select
                        value={this.state.settings.locale}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { settings: { locale: event.target.value } }));
                        }}
                        label={<Trans>Locale</Trans>}
                      >
                        <MenuItem value='en'>
                          English
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion
              expanded={this.state.section === 'developer' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'developer', showSection: this.state.section !== 'developer' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Developer</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Build Version:</Trans>{` ${version.get()}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Build Type:</Trans>{` ${process.env.NODE_ENV.toUpperCase()}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Mobile Console</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.settings.eruda}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { settings: { eruda: e.target.checked } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <Trans>Browser Info:</Trans>
                    </Typography>
                    <code>
                      {JSON.stringify(browserInfo())}
                    </code>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      <Trans>User Agent:</Trans>
                    </Typography>
                    <code>
                      {navigator.userAgent}
                    </code>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    );
  }
}