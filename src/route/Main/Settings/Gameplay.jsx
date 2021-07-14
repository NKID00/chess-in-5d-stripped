import React from 'react';

import { Trans } from '@lingui/macro';

import Chess from '5d-chess-js';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Renderer from 'components/Player/Renderer';
import { PieceSetList, resetPieceSet } from 'components/PieceLists';

import EmitterContext from 'utils/EmitterContext';
import * as crConfig from 'state/config';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

export default class Gameplay extends React.Component {
  static contextType = EmitterContext;
  state = {
    section: 'app',
    showSection: false,
    config: crConfig.get()
  }
  chessRenderer = React.createRef();
  resetView() {
    var cr = this.chessRenderer.current.chessRenderer;
    var chess = new Chess();
    chess.import(`[Board "Standard"]
[Mode "5D"]
1. e3 / e6
2. (0T2)Nb1>>(0T1)b3~ (>L1)`);
    cr.global.sync(chess);
    cr.global.availableMoves(chess.moves('object', false, false, false));
    cr.zoom.fullBoard();
  }
  componentDidMount() {
    //Update state if config settings are changed
    this.configListener = this.context.on('configUpdate', () => {
      this.setState({ config: crConfig.get() });
    });
    if(this.chessRenderer.current !== null) {
      //Setup renderer with example
      var cr = this.chessRenderer.current.chessRenderer;
      this.resetView();
      cr.global.emitter.on('resizeEvent', () => {
        cr.zoom.fullBoard();
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    //Update config settings if state has changed
    if(!deepequal(prevState.config, this.state.config)) {
      crConfig.set(this.state.config, this.context);
    }
  }
  componentWillUnmount() {
    //Stop listening to config setting changes
    if(typeof this.configListener === 'function') { this.configListener(); }
  }
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Renderer
                  ref={this.chessRenderer}
                  height='70vh'
                  width={1}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  onClick={this.resetView.bind(this)}
                  fullWidth
                >
                  <Trans>Reset Preview</Trans>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='outlined'
                  onClick={() =>{
                    crConfig.reset(this.context);
                    resetPieceSet(this.context);
                    this.resetView();
                  }}
                  fullWidth
                >
                  <Trans>Restore Default Settings</Trans>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Accordion
              expanded={this.state.section === 'app' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'app', showSection: this.state.section !== 'app' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Application</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Force Canvas Fallback</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.app.forceCanvas}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { app: { forceCanvas: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Show FPS Indicator</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.fps.show}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { fps: { show: e.target.checked } } }));
                          }}
                        />
                      }
                    />
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
                    <FormControlLabel
                      label={<Trans>Show Blur</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.background.blur}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { background: { blur: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.background.blurStrength}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { background: { blurStrength: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Blur Strength</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Show Striped</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.background.striped}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { background: { striped: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.background.stripeRatio}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { background: { stripeRatio: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Strip Ratio</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Show Checkered Background</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.background.showRectangle}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { background: { showRectangle: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'board' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'board', showSection: this.state.section !== 'board' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Board</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.marginWidth}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { marginWidth: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Margin Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.marginHeight}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { marginHeight: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Margin Height</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.borderWidth}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { borderWidth: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Border Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.borderHeight}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { borderHeight: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Border Height</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.borderRadius}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { borderRadius: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Border Radius</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.borderLineWidth}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { borderLineWidth: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Border Line Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.ghostAlpha}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { ghostAlpha: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Future Board Transparency</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Show Blinking Border on Present Board</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.board.showPresentBlink}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { board: { showPresentBlink: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'piece' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'piece', showSection: this.state.section !== 'piece' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Piece Sets</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PieceSetList emitter={this.context} />
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