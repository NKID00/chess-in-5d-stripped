import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ColorPicker from 'components/ColorPicker';

import EmitterContext from 'EmitterContext';
import * as muiTheme from 'state/theme';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

export default class Palette extends React.Component {
  static contextType = EmitterContext;
  state = {
    section: 'typography',
    showSection: false,
    theme: muiTheme.get()
  }
  componentDidMount() {
    //Update state if theme settings are changed
    this.themeListener = this.context.on('themeUpdate', () => {
      this.setState({ theme: muiTheme.get() });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //Update theme settings if state has changed
    if(!deepequal(prevState.theme, this.state.theme)) {
      muiTheme.set(this.state.theme, this.context);
    }
  }
  componentWillUnmount() {
    //Stop listening to theme setting changes
    if(typeof this.themeListener === 'function') { this.themeListener(); }
  }
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  square
                  variant='outlined'
                  style={{
                    width: '100%',
                    zIndex: -100
                  }}
                >
                  <Toolbar></Toolbar>
                  <Box m={4}>
                    <Card>
                      <CardContent>
                        <Typography variant='h4' gutterBottom>
                          h4. Heading
                        </Typography>
                        <Typography variant='h5' gutterBottom>
                          h5. Heading
                        </Typography>
                        <Typography variant='h6' gutterBottom>
                          h6. Heading
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom>
                          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='subtitle2' gutterBottom>
                          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='caption' display='block' gutterBottom>
                          caption text
                        </Typography>
                        <Typography variant='overline' display='block' gutterBottom>
                          overline text
                        </Typography>
                        <Box width={1} my={2}>
                          <Button variant='contained'>Default</Button>
                          <Button variant='contained' color='primary'>
                            Primary
                          </Button>
                          <Button variant='contained' color='secondary'>
                            Secondary
                          </Button>
                          <Button variant='contained' disabled>
                            Disabled
                          </Button>
                        </Box>
                        <Box width={1} my={2}>
                          <Button variant='outlined'>Default</Button>
                          <Button variant='outlined' color='primary'>
                            Primary
                          </Button>
                          <Button variant='outlined' color='secondary'>
                            Secondary
                          </Button>
                          <Button variant='outlined' disabled>
                            Disabled
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='outlined'
                  onClick={() =>{
                    muiTheme.reset(this.context);
                  }}
                  fullWidth
                >
                  Reset Theme
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Accordion
              expanded={this.state.section === 'typography' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'typography', showSection: this.state.section !== 'typography' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Typography</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl variant='outlined' fullWidth>
                      <InputLabel><Trans>Font Family</Trans></InputLabel>
                      <Select
                        value={this.state.theme.typography.fontFamily}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { typography: { fontFamily: event.target.value } } }));
                        }}
                        label={<Trans>Font Family</Trans>}
                      >
                        <MenuItem value='domine' style={{ fontFamily: 'domine' }}>
                          Domine
                        </MenuItem>
                        <MenuItem value='exo' style={{ fontFamily: 'exo' }}>
                          Exo
                        </MenuItem>
                        <MenuItem value='merriweather' style={{ fontFamily: 'merriweather' }}>
                          Merriweather
                        </MenuItem>
                        <MenuItem value='newsreader' style={{ fontFamily: 'newsreader' }}>
                          Newsreader
                        </MenuItem>
                        <MenuItem value='open sans' style={{ fontFamily: 'open sans' }}>
                          Open Sans
                        </MenuItem>
                        <MenuItem value='playfair display' style={{ fontFamily: 'playfair display' }}>
                          Playfair Display
                        </MenuItem>
                        <MenuItem value='roboto condensed' style={{ fontFamily: 'roboto condensed' }}>
                          Roboto Condensed
                        </MenuItem>
                        <MenuItem value='roboto' style={{ fontFamily: 'roboto' }}>
                          Roboto
                        </MenuItem>
                        <MenuItem value='vollkorn' style={{ fontFamily: 'vollkorn' }}>
                          Vollkorn
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'background' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'background', showSection: this.state.section !== 'background' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Background</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='h6'><Trans>Appbar Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.overrides.MuiToolbar.root.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { overrides: { MuiToolbar: { root: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='h6'><Trans>Background Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.overrides.MuiPaper.outlined.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { overrides: { MuiPaper: { outlined: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='h6'><Trans>Card Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.background.paper}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { background: { paper: hexStr } } } }));
                      }}
                    />
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