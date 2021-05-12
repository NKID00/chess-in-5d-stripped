import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EmitterContext from 'EmitterContext';
import * as settings from 'state/settings';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

export default class General extends React.Component {
  static contextType = EmitterContext;
  state = {
    section: 'language',
    showSection: false,
    settings: settings.get()
  }
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
                          this.setState(deepmerge(this.state, { settings: { server: event.target.value } }));
                        }}
                        label={<Trans>Server Key</Trans>}
                      />
                    </FormControl>
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
                  <Grid item xs={12} sm={6} md={12} lg={6}>
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
        </Grid>
      </Box>
    );
  }
}