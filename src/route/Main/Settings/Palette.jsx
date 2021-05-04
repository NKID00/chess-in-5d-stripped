import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ColorPicker from 'components/ColorPicker';
import Renderer from 'components/player/Renderer';
import Chess from '5d-chess-js';

import EmitterContext from 'EmitterContext';
import * as crPalette from 'state/palette';

const deepmerge = require('deepmerge');
const deepequal = require('fast-deep-equal');

export default class Palette extends React.Component {
  static contextType = EmitterContext;
  state = {
    section: 'background',
    showSection: false,
    palette: crPalette.get()
  }
  chessRenderer = React.createRef();
  componentDidMount() {
    //Update state if palette settings are changed
    this.paletteListener = this.context.on('paletteUpdate', () => {
      this.setState({ palette: crPalette.get() });
    });
    //Setup renderer with example
    var cr = this.chessRenderer.current.chessRenderer;
    var chess = new Chess();
    chess.import(`[Board "Standard"]
[Mode "5D"]
1. e3 / e6
2. (0T2)Nb1>>(0T1)b3~ (>L1)`);
    this.setState({
      board: chess.board,
      actionHistory: chess.actionHistory,
      moveBuffer: chess.moveBuffer,
      checks: chess.checks,
      availableMoves: chess.moves('object', false, false, false)
    });
    cr.zoom.fullBoard();
    cr.global.emitter.on('resizeEvent', () => {
      cr.zoom.fullBoard();
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //Update palette settings if state has changed
    if(!deepequal(prevState.palette, this.state.palette)) {
      crPalette.set(this.state.palette, this.context);
    }
  }
  componentWillUnmount() {
    //Stop listening to palette setting changes
    if(typeof this.paletteListener === 'function') { this.paletteListener(); }
  }
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Renderer
              ref={this.chessRenderer}
              height='70vh'
              width={1}
              board={this.state.board}
              actionHistory={this.state.actionHistory}
              moveBuffer={this.state.moveBuffer}
              checks={this.state.checks}
              availableMoves={this.state.availableMoves}
              pastAvailableMoves={this.state.pastAvailableMoves}
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Solid Background Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.single}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { single: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Checkered Background - Light Rectangle Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.lightRectangle}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { lightRectangle: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Checkered Background - Dark Rectangle Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.darkRectangle}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { darkRectangle: hex } } }));
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'backgroundStripes' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'backgroundStripes', showSection: this.state.section !== 'backgroundStripes' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Background Stripes</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Light Rectangle - Black Stripe Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.lightStripeBlack}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { lightStripeBlack: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Light Rectangle - White Stripe Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.lightStripeWhite}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { lightStripeWhite: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Dark Rectangle - Black Stripe Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.darkStripeBlack}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { darkStripeBlack: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Dark Rectangle - White Stripe Color</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.background.darkStripeWhite}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { background: { darkStripeWhite: hex } } }));
                      }}
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
                <Typography variant='h5'><Trans>Board Borders</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>White Board Border</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.whiteBorder}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { whiteBorder: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>White Board Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.whiteBorderOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { whiteBorderOutline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Black Board Border</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.blackBorder}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { blackBorder: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Black Board Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.blackBorderOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { blackBorderOutline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Check Board Border</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.checkBorder}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { checkBorder: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Check Board Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.checkBorderOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { checkBorderOutline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Inactive Board Border</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.inactiveBorder}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { inactiveBorder: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Inactive Board Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.board.inactiveBorderOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { board: { inactiveBorderOutline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Board Shadow</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardShadow.shadow}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardShadow: { shadow: hex } } }));
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'boardLabel' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'boardLabel', showSection: this.state.section !== 'boardLabel' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Board Labels</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Timeline Labels</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardLabel.timeline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardLabel: { timeline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Turn Labels</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardLabel.turn}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardLabel: { turn: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>White Board Labels</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardLabel.whiteBoard}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardLabel: { whiteBoard: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Black Board Labels</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardLabel.blackBoard}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardLabel: { blackBoard: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Check Board Labels</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardLabel.checkBoard}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardLabel: { checkBoard: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Inactive Board Labels</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.boardLabel.inactiveBoard}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { boardLabel: { inactiveBoard: hex } } }));
                      }}
                    />
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
                <Typography variant='h5'><Trans>Square</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>White Squares</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.square.white}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { square: { white: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Black Squares</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.square.black}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { square: { black: hex } } }));
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'squareHighlight' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'squareHighlight', showSection: this.state.section !== 'squareHighlight' ? true : !this.state.showSection });
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
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Piece Highlights</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.highlight.self}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { highlight: { self: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Move Highlights</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.highlight.move}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { highlight: { move: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Past Move Highlights</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.highlight.pastMove}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { highlight: { pastMove: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Capture Move Highlights</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.highlight.capture}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { highlight: { capture: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Past Capture Move Highlights</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.highlight.pastCapture}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { highlight: { pastCapture: hex } } }));
                      }}
                    />
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
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Move Arrow</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.move}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { move: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Move Arrow Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.moveOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { moveOutline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Check Move Arrow</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.check}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { check: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Check Move Arrow Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.checkOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { checkOutline: hex } } }));
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.section === 'customArrow' && this.state.showSection}
              onChange={() => {
                this.setState({ section: 'customArrow', showSection: this.state.section !== 'customArrow' ? true : !this.state.showSection });
              }}
              elevation={0}
              style={{ margin: 0 }}
              square={false}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h5'><Trans>Custom Arrows</Trans></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Default Custom Arrow</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Default Custom Arrow Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.customOutline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { customOutline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #1</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom1}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom1: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #1 Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom1Outline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom1Outline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #2</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom2}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom2: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #2 Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom2Outline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom2Outline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #3</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom3}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom3: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #3 Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom3Outline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom3Outline: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #4</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom4}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom4: hex } } }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Typography variant='h6'><Trans>Custom Arrow #4 Outline</Trans></Typography>
                    <ColorPicker
                      color={this.state.palette.arrow.custom4Outline}
                      onChange={(hex) => {
                        this.setState(deepmerge(this.state, { palette: { arrow: { custom4Outline: hex } } }));
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