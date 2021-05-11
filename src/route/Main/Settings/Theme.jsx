import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Alert from '@material-ui/lab/Alert';
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
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Clock from 'components/Player/Clock';
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
                          <Trans>H4 Heading</Trans>
                        </Typography>
                        <Typography variant='h5' gutterBottom>
                          <Trans>H5 Heading</Trans>
                        </Typography>
                        <Typography variant='h6' gutterBottom>
                          <Trans>H6 Heading</Trans>
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom>
                          <Trans>Subtitle1</Trans> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='subtitle2' gutterBottom>
                          <Trans>Subtitle2</Trans> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                          <Trans>Body1</Trans> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='body2' gutterBottom>
                          <Trans>Body2</Trans> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                        </Typography>
                        <Typography variant='caption' display='block' gutterBottom>
                          <Trans>Caption Text</Trans>
                        </Typography>
                        <Typography variant='overline' display='block' gutterBottom>
                          <Trans>Overline Text</Trans>
                        </Typography>
                        <Box width={1} my={2}>
                          <Button variant='contained'>
                            <Trans>Default</Trans>
                          </Button>
                          <Button variant='contained' color='primary'>
                            <Trans>Primary</Trans>
                          </Button>
                          <Button variant='contained' color='secondary'>
                            <Trans>Secondary</Trans>
                          </Button>
                          <Button variant='contained' disabled>
                            <Trans>Disabled</Trans>
                          </Button>
                        </Box>
                        <Box width={1} my={2}>
                          <Button variant='outlined'>
                            <Trans>Default</Trans>
                          </Button>
                          <Button variant='outlined' color='primary'>
                            <Trans>Primary</Trans>
                          </Button>
                          <Button variant='outlined' color='secondary'>
                            <Trans>Secondary</Trans>
                          </Button>
                          <Button variant='outlined' disabled>
                            <Trans>Disabled</Trans>
                          </Button>
                        </Box>
                        <FormControl fullWidth>
                          <TextField
                            variant='outlined'
                            label={<Trans>Example Textfield</Trans>}
                          />
                        </FormControl>
                        <Box width={1} my={2}>
                          <Alert fullWidth severity='error'><Trans>Error - example error alert!</Trans></Alert>
                        </Box>
                        <Box width={1} my={2}>
                          <Alert fullWidth severity='warning'><Trans>Warning - example warning alert!</Trans></Alert>
                        </Box>
                        <Box width={1} my={2}>
                          <Alert fullWidth severity='info'><Trans>Info - example info alert!</Trans></Alert>
                        </Box>
                        <Box width={1} my={2}>
                          <Alert fullWidth severity='success'><Trans>Success - example success alert!</Trans></Alert>
                        </Box>
                        <Clock />
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
                        <MenuItem value='fira-sans' style={{ fontFamily: 'fira sans' }}>
                          Fira Sans
                        </MenuItem>
                        <MenuItem value='eb-garamond' style={{ fontFamily: 'eb garamond' }}>
                          EB Garamond
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
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.theme.typography.fontSize}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { typography: { fontSize: event.target.value } } }));
                        }}
                        label={<Trans>Font Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'spacing' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'spacing', showSection: this.state.section !== 'spacing' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Spacing</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.spacing}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { spacing: Number(event.target.value) } }));
                        }}
                        label={<Trans>Spacing Factor</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.breakpoints.values.xs}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { breakpoints: { values: { xs: Number(event.target.value) } } } }));
                        }}
                        label={<Trans>Extra Small Breakpoint</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.breakpoints.values.sm}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { breakpoints: { values: { sm: Number(event.target.value) } } } }));
                        }}
                        label={<Trans>Small Breakpoint</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.breakpoints.values.md}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { breakpoints: { values: { md: Number(event.target.value) } } } }));
                        }}
                        label={<Trans>Medium Breakpoint</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.breakpoints.values.lg}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { breakpoints: { values: { lg: Number(event.target.value) } } } }));
                        }}
                        label={<Trans>Large Breakpoint</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.breakpoints.values.xl}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { breakpoints: { values: { xl: Number(event.target.value) } } } }));
                        }}
                        label={<Trans>Extra Large Breakpoint</Trans>}
                      />
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
                <Typography variant='h5'><Trans>Background Palette</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Menubar Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.overrides.MuiToolbar.root.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { overrides: { MuiToolbar: { root: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Secondary Menubar Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.background.default}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { background: { default: hexStr } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Background Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.overrides.MuiPaper.outlined.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { overrides: { MuiPaper: { outlined: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Card Color</Trans></Typography>
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
            <Accordion
              expanded={this.state.section === 'main' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'main', showSection: this.state.section !== 'main' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Main Palette</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Palette Mode</Trans></Typography>
                    <Grid container alignItems='center' spacing={1}>
                      <Grid item><Trans>Light</Trans></Grid>
                      <Grid item>
                        <Switch
                          color='primary'
                          checked={this.state.theme.palette.type === 'dark'}
                          onChange={(event) => {
                            this.setState(deepmerge(this.state, { theme: { palette: { type: event.target.checked ? 'dark' : 'light' } } }));
                          }}
                        />
                      </Grid>
                      <Grid item><Trans>Dark</Trans></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Primary Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.primary.main}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { primary: { main: hexStr } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Secondary Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.secondary.main}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { secondary: { main: hexStr } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Error Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.error.main}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { error: { main: hexStr } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Warning Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.warning.main}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { warning: { main: hexStr } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Info Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.info.main}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { info: { main: hexStr } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Success Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.palette.success.main}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { palette: { success: { main: hexStr } } } }));
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