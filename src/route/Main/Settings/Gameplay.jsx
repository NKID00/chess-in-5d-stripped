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
import Slider from '@material-ui/core/Slider';
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
  setupRenderer() {
    if(this.chessRenderer.current !== null && this.chessRenderer.current.chessRenderer !== null) {
      //Setup renderer with example
      var cr = this.chessRenderer.current.chessRenderer;
      this.resetView();
      cr.global.emitter.on('resizeEvent', () => {
        cr.zoom.fullBoard();
      });
    }
    else {
      window.setTimeout(this.setupRenderer.bind(this), 500);
    }
  }
  componentDidMount() {
    //Update state if config settings are changed
    this.configListener = this.context.on('configUpdate', () => {
      this.setState({ config: crConfig.get() });
    });
    this.setupRenderer();
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
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.background.expandDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { background: { expandDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Expand Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
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
                    <Typography>
                      <Trans>Future Board Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.board.ghostAlpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { board: { ghostAlpha: v } } }));
                      }}
                    />
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
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.blinkDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { blinkDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Blinking Animation Cycle Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.board.fadeDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { board: { fadeDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Fade Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Show Board Shadows</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.boardShadow.show}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { boardShadow: { show: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.boardShadow.offsetX}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { boardShadow: { offsetX: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Shadow Offset X</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.boardShadow.offsetY}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { boardShadow: { offsetY: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Board Shadow Offset Y</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Board Shadow Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.boardShadow.alpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { boardShadow: { alpha: v } } }));
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'promotion' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'promotion', showSection: this.state.section !== 'promotion' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Promotion Menu</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotion.borderWidth}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotion: { borderWidth: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Promotion Menu Border Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotion.borderHeight}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotion: { borderHeight: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Promotion Menu Border Height</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotion.borderRadius}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotion: { borderRadius: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Promotion Menu Border Radius</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotion.borderLineWidth}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotion: { borderLineWidth: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Promotion Menu Border Line Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotion.fadeDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotion: { fadeDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Fade Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Show Promotion Menu Shadows</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.promotionShadow.show}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { promotionShadow: { show: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotionShadow.offsetX}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotionShadow: { offsetX: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Promotion Menu Shadow Offset X</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.promotionShadow.offsetY}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { promotionShadow: { offsetY: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Promotion Menu Shadow Offset Y</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Promotion Menu Shadow Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.promotionShadow.alpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { promotionShadow: { alpha: v } } }));
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'label' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'label', showSection: this.state.section !== 'label' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Labels</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.boardLabel.fadeDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { boardLabel: { fadeDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Fade Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'square' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'square', showSection: this.state.section !== 'square' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Squares</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.square.height}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { square: { height: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Square Height</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.square.width}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { square: { width: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Square Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.square.fadeDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { square: { fadeDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Fade Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'highlight' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'highlight', showSection: this.state.section !== 'highlight' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Square Highlights</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Move Hover Highlight Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.highlight.hoverAlpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { highlight: { hoverAlpha: v } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Past Move Hover Highlight Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.highlight.pastHoverAlpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { highlight: { pastHoverAlpha: v } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Move Selected Highlight Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.highlight.selectedAlpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { highlight: { selectedAlpha: v } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Past Move Selected Highlight Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.highlight.pastSelectedAlpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { highlight: { pastSelectedAlpha: v } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.highlight.fadeDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { highlight: { fadeDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Fade Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
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
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.piece.height}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { piece: { height: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Piece Height</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.piece.width}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { piece: { width: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Piece Width</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.piece.fadeDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { piece: { fadeDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Fade Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'arrow' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'arrow', showSection: this.state.section !== 'arrow' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Arrows</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Spatial - Enable Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.spatialCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { spatialCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Spatial - Use Split Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.spatialSplitCurve}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { spatialSplitCurve: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Spatial - Enable Midpoint Mode</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.spatialMiddle}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { spatialMiddle: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Spatial - Enable Real End Mode</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.spatialRealEnd}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { spatialRealEnd: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Non-Spatial - Enable Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.nonSpatialCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { nonSpatialCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Non-Spatial - Use Split Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.nonSpatialSplitCurve}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { nonSpatialSplitCurve: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Non-Spatial - Enable Midpoint Mode</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.nonSpatialMiddle}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { nonSpatialMiddle: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Non-Spatial - Enable Real End Mode</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.nonSpatialRealEnd}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { nonSpatialRealEnd: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Custom - Enable Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.customCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { customCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Custom - Use Split Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.customSplitCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { customSplitCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Custom (Middle Mode) - Enable Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.customMiddleCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { customMiddleCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Custom (Middle Mode) - Use Split Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.customMiddleSplitCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { customMiddleSplitCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControlLabel
                      label={<Trans>Check - Enable Curved Arrow</Trans>}
                      control={
                        <Checkbox
                          color='primary'
                          checked={this.state.config.arrow.checkCurved}
                          onChange={(e) => { 
                            this.setState(deepmerge(this.state, { config: { arrow: { checkCurved: e.target.checked } } }));
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.arrow.size}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { arrow: { size: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Arrow Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.arrow.headSize}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { arrow: { headSize: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Arrow Head Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.arrow.outlineSize}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { arrow: { outlineSize: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Arrow Outline Size</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.arrow.midpointRadius}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { arrow: { midpointRadius: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Arrow Midpoint Radius</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <Typography>
                      <Trans>Arrow Transparency</Trans>
                    </Typography>
                    <Slider
                      color='primary'
                      min={0}
                      max={1}
                      step={0.05}
                      valueLabelDisplay='auto'
                      value={this.state.config.arrow.alpha}
                      onChange={(e, v) => { 
                        this.setState(deepmerge(this.state, { config: { arrow: { alpha: v } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.arrow.animateDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { arrow: { animateDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'ripple' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'ripple', showSection: this.state.section !== 'ripple' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Ripple Animation</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.ripple.timelineDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { ripple: { timelineDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Timeline Ripple Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.ripple.turnDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { ripple: { turnDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Turn Ripple Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.ripple.rankDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { ripple: { rankDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>Rank Ripple Animation Duration (ms)</Trans>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={12} lg={6}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        value={this.state.config.ripple.fileDuration}
                        onChange={(event) => {
                          this.setState(deepmerge(this.state, { config: { ripple: { fileDuration: Number(event.target.value) } } }));
                        }}
                        label={<Trans>File Ripple Animation Duration (ms)</Trans>}
                      />
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