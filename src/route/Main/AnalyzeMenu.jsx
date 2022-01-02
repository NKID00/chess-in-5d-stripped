import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as LinkCompression from 'utils/LinkCompression';

import Chess from '5d-chess-js';

import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/addon/mode/simple');
require('components/CodeMirror/NotationMode');

/*
Props
 - open
 - onCancel
*/
class AnalysisMenu extends React.Component {
  chess = new Chess();
  state = {
    importString: '',
    variant: 'turn_zero'
  };
  render() {
    let variants = this.chess.variants.filter(e => e.shortName !== 'custom');
    return (
      <Box m={2}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h5'><Trans>Import Game</Trans></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box height={400}>
                  <CodeMirror
                    value={this.state.importString}
                    onBeforeChange={(e, d, v) => {
                      this.setState({ importString: v });
                    }}
                    options={{
                      mode: 'notation',
                      theme: 'mdn-like'
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color='primary'
                  disabled={this.state.importString.length <= 0}
                  onClick={() => {
                    let importB64 = LinkCompression.compressLink(this.state.importString);
                    this.props.history.push('/analyze?import=' + importB64);
                  }}
                >
                  <Trans>Start Analysis</Trans>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h5'><Trans>New Analysis</Trans></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel><Trans>Variant</Trans></InputLabel>
                  <Select
                    value={this.state.variant}
                    onChange={(event) => {
                      this.setState({ variant: event.target.value });
                    }}
                    label={<Trans>Variant</Trans>}
                  >
                    {variants.map((variant) => (
                      <MenuItem key={variant.shortName} value={variant.shortName}>
                        {variant.name.replace('Standard - ','')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color='primary'
                  onClick={() => {
                    this.chess.reset(this.state.variant);
                    let importB64 = LinkCompression.compressLink(this.chess.export('5dpgn_active_timeline'));
                    this.props.history.push('/analyze?empty=true&import=' + importB64);
                  }}
                >
                  <Trans>Start Analysis</Trans>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
}

export default withRouter(AnalysisMenu);