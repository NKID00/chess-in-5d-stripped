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
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Clock from 'components/Player/Clock';
import ColorPicker from 'components/ColorPicker';
import { RegularFont, MonospaceFont } from 'components/FontLists';
import Notation from 'components/Player/Notation';
import Status from 'components/Player/Status';
import SubmitMenu from 'components/Player/SubmitMenu';
import ViewMenu from 'components/Player/ViewMenu';

import EmitterContext from 'utils/EmitterContext';
import * as muiTheme from 'state/theme';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');
const store = require('store');

const defaultTestNotation = `1. b3 / g5
2. h4 / Bg7
3. a3 / e5
4. d4 / g4
5. b4 / Kf8
6. Bf4 / Ne7 7. c4 / Ng8
8. Qd3 {test comment here [test tag]} / (0T8)Qd8>>(0T7)e8~ (>L-1)
9. (-1T8)Bh2 / (-1T8)Qd8>>(0T8)e7 (>L-2);another test comment
10. (-1T9)f3 (0T9)Nc3 / (0T9)d5 (-1T9)g3
11. (0T10)Kd1 (-1T10)Qd1>>(-1T9)d2~ (>L1) (-2T9)Qd3>>(-1T8)e3~ (>L2) / (2T8)exf4
12. (2T9)Rh3 / (1T9)Qe8>>(0T9)e7~ (>L-3) (-2T9)b6 (2T9)h6
13. (-3T10)Nc3>>(-1T10)d3~ (>L3) (1T10)Qg5 (2T10)Qg3 (-2T10)Bg3 / (3T10)Bh6 (-1T10)c6 (1T10)Kf8>>(1T9)g8~ (>L-4)
14. (-4T10)e4 / (0T10)Bc8>>(1T10)d8 (>L-5) (2T10)Qd8>>(3T10)d8 (>L-6) (-3T10)Kf8>(-2T10)e8 (-4T10)Qd8
15. (-4T11)Qd1>(-5T11)c1 (2T11)Ke1>>(2T10)d2~ (>L4) / (4T10)b5 ; another test comment
16. (4T11)Ng1>x(3T11)g3 (-3T11)Qd3>(-2T11)c2 (0T11)Qd3>>(0T9)f3~ (>L5) / (5T9)e4
17. (5T10)Bxc7 / (5T10)Kf8>(4T11)g8
18. (1T11)Qg5>>x(0T11)g4~ (>L6) (5T11)Bc7>>x(5T10)b7~ (>L7) / (7T10)d6
19. (-6T11)Ng1>>(-5T11)g3 (>L8) (-1T11)Pf3>>(-2T11)f3 (>L9) (7T11)Qfe3 / (5T11)Nb8>x(7T11)b7 (-2T11)Qe7>>(-2T10)e8~ (>L-7)
20. (-7T11)Bf1>>(-3T11)f5 (>L10) / (2T11)Ne7>>(0T10)e7~ (>L-8)
21. (-8T11)Bg5 / (-4T11)Bg7>>(-2T11)g5~ (>L-9) (9T11)Nc6 (3T11)Nb8>>(4T11)b6~ (>L-10) (1T11)f6 (8T11)Bc8>>(5T11)f8~ (>L-11) (-8T11)Nf5 (-6T11)Bf6 (-3T11)Qe7>>(-2T10)e8 (>L-12) (-5T11)Bg7>>(-6T11)g6 (>L-13) (10T11)Bg7>>x(8T11)g5 (>L-14) (0T11)h5 (-1T11)Qe8>>(0T11)e8 (>L-15) (-7T11)Qe7>>(-8T11)e8 (>L-16) (6T11)dxc4
22. (4T12)Qe3>(3T12)f4 (-4T12)a4 (8T12)Qg5>>(3T12)g5~ (~T11) (>L11) (-12T11)Ke1>(-11T12)d1 / (-12T11)c5`;

const defaultTestHighlightNotation = `1. b3 / g5
2. h4 / Bg7
3. a3 / e5
4. d4 / g4
5. b4 / Kf8
6. Bf4 / Ne7 7. c4 / Ng8
8. Qd3 {test comment here [test tag]} / (0T8)Qd8>>(0T7)e8~ (>L-1)
9. (-1T8)Bh2 / (-1T8)Qd8>>(0T8)e7 (>L-2);another test comment
10. (-1T9)f3 (0T9)Nc3 / (0T9)d5 (-1T9)g3
11. (0T10)Kd1 (-1T10)Qd1>>(-1T9)d2~ (>L1) (-2T9)Qd3>>(-1T8)e3~ (>L2) / (2T8)exf4
12. (2T9)Rh3 / (1T9)Qe8>>(0T9)e7~ (>L-3) (-2T9)b6 (2T9)h6
13. (-3T10)Nc3>>(-1T10)d3~ (>L3) (1T10)Qg5 (2T10)Qg3 (-2T10)Bg3 / (3T10)Bh6 (-1T10)c6 (1T10)Kf8>>(1T9)g8~ (>L-4)
14. (-4T10)e4 / (0T10)Bc8>>(1T10)d8 (>L-5) (2T10)Qd8>>(3T10)d8 (>L-6) (-3T10)Kf8>(-2T10)e8 (-4T10)Qd8
15. (-4T11)Qd1>(-5T11)c1 (2T11)Ke1>>(2T10)d2~ (>L4) / (4T10)b5 ; another test comment
16. (4T11)Ng1>x(3T11)g3 (-3T11)Qd3>(-2T11)c2 (0T11)Qd3>>(0T9)f3~ (>L5) / (5T9)e4
17. (5T10)Bxc7 / (5T10)Kf8>(4T11)g8
18. (1T11)Qg5>>x(0T11)g4~ (>L6) (5T11)Bc7>>x(5T10)b7~ (>L7) / (7T10)d6
19. (-6T11)Ng1>>(-5T11)g3 (>L8) (-1T11)Pf3>>(-2T11)f3 (>L9) (7T11)Qfe3 / (5T11)Nb8>x(7T11)b7 (-2T11)Qe7>>(-2T10)e8~ (>L-7)
20. (-7T11)Bf1>>(-3T11)f5 (>L10) / (2T11)Ne7>>(0T10)e7~ (>L-8)
21. (-8T11)Bg5 / (-4T11)Bg7>>(-2T11)g5~ (>L-9) (9T11)Nc6 (3T11)Nb8>>(4T11)b6~ (>L-10) (1T11)f6 (8T11)Bc8>>(5T11)f8~ (>L-11) (-8T11)Nf5 (-6T11)Bf6 (-3T11)Qe7>>(-2T10)e8 (>L-12) (-5T11)Bg7>>(-6T11)g6 (>L-13) (10T11)Bg7>>x(8T11)g5 (>L-14) (0T11)h5 (-1T11)Qe8>>(0T11)e8 (>L-15) (-7T11)Qe7>>(-8T11)e8 (>L-16) (6T11)dxc4
22. (4T12)Qe3>(3T12)f4 (-4T12)a4 (8T12)Qg5>>(3T12)g5~ (~T11) (>L11) (-12T11)Ke1>(-11T12)d1`;

export default class Theme extends React.Component {
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
                        <Box mt={2}>
                          <LinearProgress />
                        </Box>
                      </CardContent>
                    </Card>
                    <Box my={2} />
                    <Card>
                      <Box pb={1}><Clock /></Box>
                    </Card>
                    <Box my={2} />
                    <Card>
                      <Notation notation={defaultTestNotation} highlightNotation={defaultTestHighlightNotation} />
                    </Card>
                    <Box my={2} />
                    <Card>
                      <SubmitMenu />
                    </Card>
                    <Box my={2} />
                    <Card>
                      <Box pb={1}>
                        <Status
                          whitePlayerName='White'
                          whitePlayerType='human'
                          blackPlayerName='Black'
                          blackPlayerType='bot'
                        />
                      </Box>
                    </Card>
                    <Box my={2} />
                    <Card>
                      <Box pb={1}><ViewMenu /></Box>
                    </Card>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant='contained'
                  onClick={() =>{
                    muiTheme.reset(this.context);
                  }}
                  fullWidth
                >
                  <Trans>Restore Default Theme</Trans>
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant='outlined'
                  onClick={() =>{
                    store.remove('player/layouts');
                  }}
                  fullWidth
                >
                  <Trans>Restore Default Layout</Trans>
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
                      <InputLabel><Trans>Main - Font Family</Trans></InputLabel>
                      <Select
                        value={this.state.theme.typography.fontFamily}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { typography: { fontFamily: event.target.value } } }));
                        }}
                        label={<Trans>Main - Font Family</Trans>}
                      >
                        {RegularFont}
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
                        label={<Trans>Main - Font Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl variant='outlined' fullWidth>
                      <InputLabel><Trans>Clock - Font Family</Trans></InputLabel>
                      <Select
                        value={this.state.theme.extra.clock.fontFamily}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { extra: { clock: { fontFamily: event.target.value } } } }));
                        }}
                        label={<Trans>Clock - Font Family</Trans>}
                      >
                        {MonospaceFont}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.theme.extra.clock.fontSize}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { extra: { clock: { fontSize: event.target.value } } } }));
                        }}
                        label={<Trans>Clock - Font Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl variant='outlined' fullWidth>
                      <InputLabel><Trans>Notation - Font Family</Trans></InputLabel>
                      <Select
                        value={this.state.theme.extra.clock.fontFamily}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { extra: { notation: { fontFamily: event.target.value } } } }));
                        }}
                        label={<Trans>Notation - Font Family</Trans>}
                      >
                        {RegularFont}
                        {MonospaceFont}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.theme.extra.clock.fontSize}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { extra: { notation: { fontSize: event.target.value } } } }));
                        }}
                        label={<Trans>Notation - Font Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        type='number'
                        value={this.state.theme.extra.notation.highlight.size}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { theme: { extra: { notation: { highlight: { size: Number(event.target.value) } } } } }));
                        }}
                        label={<Trans>Notation - Highlight Size</Trans>}
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
                    <Typography variant='body1'><Trans>Appbar Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.overrides.MuiToolbar.root.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { overrides: { MuiToolbar: { root: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Menubar Color</Trans></Typography>
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
                      <Grid item>
                        <Typography>
                          <Trans>Light</Trans>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Switch
                          color='primary'
                          checked={this.state.theme.palette.type === 'dark'}
                          onChange={(event) => {
                            this.setState(deepmerge(this.state, { theme: { palette: { type: event.target.checked ? 'dark' : 'light' } } }));
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography>
                          <Trans>Dark</Trans>
                        </Typography>
                      </Grid>
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
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Notation - Highlight</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.extra.notation.highlight.color}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { extra: { notation: { highlight: { color: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Notation - New Present Token - Background Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.extra.notation.newPresentToken.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { extra: { notation: { newPresentToken: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Notation - New Present Token - Text Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.extra.notation.newPresentToken.color}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { extra: { notation: { newPresentToken: { color: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Notation - New Timeline Token - Background Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.extra.notation.newTimelineToken.backgroundColor}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { extra: { notation: { newTimelineToken: { backgroundColor: hexStr } } } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography variant='body1'><Trans>Notation - New Timeline Token - Text Color</Trans></Typography>
                    <ColorPicker
                      colorStr={this.state.theme.extra.notation.newTimelineToken.color}
                      onChange={(hex, hexStr) => {
                        this.setState(deepmerge(this.state, { theme: { extra: { notation: { newTimelineToken: { color: hexStr } } } } }));
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