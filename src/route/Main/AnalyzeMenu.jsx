import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import * as LinkCompression from 'utils/LinkCompression';

import Chess from '5d-chess-js';

import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/addon/mode/simple');
require('components/CodeMirror/NotationMode');

export class Welcome extends React.Component {
  render() {
    return (
      <Card style={{ height: '100%' }}>
        <CardContent>
          <Typography variant='h4'>
            <Trans>Welcome to Chess In 5D (Stripped ver.)!</Trans>
          </Typography>
          <Typography variant='body1' component='p'>
            <Trans>This website is a fork of Chess In 5D. It contains Analyze only and does not interact with backend.</Trans>
          </Typography>
          <Typography variant='body1' component='p'>
            <Trans>
              <Link
                target='_blank'
                rel='noopener'
                href='https://github.com/NKID00/chess-in-5d-stripped'
              >
                Source code
              </Link> under AGPL-3.0.
            </Trans>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export class Community extends React.Component {
  render() {
    return (
      <Card style={{ height: '100%' }}>
        <CardContent>
          <Typography variant='h6'>
            <Trans>Join the community!</Trans>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6' component='p'>
                <Trans>5D Chess QQ 群: 693837061 (Chinese community)</Trans>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                onClick={() => { window.open('https://www.5dchesswithmultiversetimetravel.com/discord'); }}
              >
                <Trans>5DCWMTT Discord</Trans>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => { window.open('https://discord.chessin5d.net'); }}
              >
                <Trans>Open 5D Chess Discord</Trans>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems='stretch'>
              <Grid item xs={6} display='flex'>
                <Welcome />
              </Grid>
              <Grid item xs={6} display='flex'>
                <Community />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={<Trans>New Analysis</Trans>} />
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={<Trans>Import Game</Trans>} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box height={200}>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withRouter(AnalysisMenu);