import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Chess from '5d-chess-js';
import ChessClock from '5d-chess-clock';

import * as sessions from 'network/sessions';

/*
Props
 - open
 - onCancel
*/
class NewSessionModal extends React.Component {
  chess = new Chess();
  chessClock = new ChessClock();
  state = {
    type: 'online',
    side: 'random',
    ranked: false,
    variant: 'turn_zero',
    useCustomVariant: false,
    customVariant: '',
    format: 'blitz',
    useCustomFormat: false,
    customFormat: ''
  }
  render() {
    let variants = this.chess.variants.filter(e => e.shortName !== 'custom');
    let formats = this.chessClock.formats;
    return (
      <Dialog
        fullWidth
        maxWidth='md'
        open={this.props.open}
        onClose={this.props.onCancel}
      >
        <DialogTitle>
          <Trans>New Game</Trans>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel><Trans>Match Type</Trans></InputLabel>
                <Select
                  value={this.state.type}
                  onChange={(event) => {
                    this.setState({ type: event.target.value });
                  }}
                  label={<Trans>Match Type</Trans>}
                >
                  <MenuItem value='online'>
                    <Trans>Online</Trans>
                  </MenuItem>
                  <MenuItem value='local'>
                    <Trans>Local</Trans>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel><Trans>Starting Side</Trans></InputLabel>
                <Select
                  value={this.state.side}
                  onChange={(event) => {
                    this.setState({ side: event.target.value });
                  }}
                  label={<Trans>Starting Side</Trans>}
                >
                  <MenuItem value='white'>
                    <Trans>White</Trans>
                  </MenuItem>
                  <MenuItem value='black'>
                    <Trans>Black</Trans>
                  </MenuItem>
                  <MenuItem value='random'>
                    <Trans>Random</Trans>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                label={<Trans>Ranked</Trans>}
                control={
                  <Checkbox
                    disabled={this.state.useCustomFormat || this.state.useCustomVariant}
                    color='primary'
                    checked={this.state.ranked}
                    onChange={(event) => { 
                      this.setState({ ranked: event.target.checked});
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel><Trans>Variant</Trans></InputLabel>
                <Select
                  disabled={this.state.useCustomVariant}
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
            <Grid item xs={3}>
              <FormControlLabel
                label={<Trans>Use Custom Variant</Trans>}
                control={
                  <Checkbox
                    disabled={this.state.ranked}
                    color='primary'
                    checked={this.state.useCustomVariant}
                    onChange={(event) => { 
                      this.setState({ useCustomVariant: event.target.checked});
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  disabled={!this.state.useCustomVariant}
                  multiline
                  variant='outlined'
                  value={this.state.customVariant}
                  onChange={(event) => {
                    this.setState({ customVariant: event.target.value });
                  }}
                  label={<Trans>Custom Variant</Trans>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel><Trans>Format</Trans></InputLabel>
                <Select
                  disabled={this.state.useCustomFormat}
                  value={this.state.format}
                  onChange={(event) => {
                    this.setState({ format: event.target.value });
                  }}
                  label={<Trans>Format</Trans>}
                >
                  {formats.map((format) => (
                    <MenuItem key={format.shortName} value={format.shortName}>
                      {format.name}
                    </MenuItem>
                  ))}
                  <MenuItem key='untimed' value='untimed'>
                    <i><Trans>Untimed</Trans></i>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel
                label={<Trans>Use Custom Format</Trans>}
                control={
                  <Checkbox
                    disabled={this.state.ranked}
                    color='primary'
                    checked={this.state.useCustomFormat}
                    onChange={(event) => { 
                      this.setState({ useCustomFormat: event.target.checked});
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  disabled={!this.state.useCustomFormat}
                  multiline
                  variant='outlined'
                  value={this.state.customFormat}
                  onChange={(event) => {
                    this.setState({ customFormat: event.target.value });
                  }}
                  label={<Trans>Custom Format</Trans>}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if(typeof this.props.onCancel === 'function') {
                this.props.onCancel();
              }
            }}
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button
            color='primary'
            onClick={async () => {
              let newSession = await sessions.createSession(
                this.state.type === 'online',
                this.state.useCustomVariant ? this.state.customVariant : this.state.variant,
                this.state.useCustomFormat ?
                  this.state.customFormat
                : this.state.format === 'untimed' ?
                  null
                :
                  this.state.format,
                this.state.side,
                this.state.ranked
              );
              this.props.history.push('/play?id=' + newSession.id);
            }}
          >
            <Trans>Start</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withRouter(NewSessionModal);