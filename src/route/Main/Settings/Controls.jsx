import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import HotkeyPicker from 'components/HotkeyPicker';
import Hotkeys from 'components/Player/Hotkeys';

import EmitterContext from 'utils/EmitterContext';
import * as hotkeys from 'state/hotkeys';

export default class Controls extends React.Component {
  static contextType = EmitterContext;
  state = {
    enableTesting: false,
    testOutput: ''
  };
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>
              <Trans>Keyboard Bindings</Trans>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant={this.state.enableTesting ? 'contained' : 'outlined'}
              onClick={() => { this.setState({ testOutput: '', enableTesting: !this.state.enableTesting }); }}
            >
              <Trans>Test Output:</Trans>{' '}{this.state.testOutput}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='undo'
              label={<Trans>Undo</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='submit'
              label={<Trans>Submit</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='restore'
              label={<Trans>Restore</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='previousAction'
              label={<Trans>Previous Action</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='previousMove'
              label={<Trans>Previous Move</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='nextMove'
              label={<Trans>Next Move</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <HotkeyPicker
              hotkeyTarget='nextAction'
              label={<Trans>Next Action</Trans>}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='outlined'
              onClick={() =>{
                hotkeys.reset(this.context);
              }}
            >
              <Trans>Restore Default Hotkeys</Trans>
            </Button>
          </Grid>
        </Grid>
        <Hotkeys
          disabled={!this.state.enableTesting}
          onUndo={() => { this.setState({ testOutput: <Trans>Undo</Trans> }); }}
          onSubmit={() => { this.setState({ testOutput: <Trans>Submit</Trans> }); }}
          onRestore={() => { this.setState({ testOutput: <Trans>Restore</Trans> }); }}
          onPreviousAction={() => { this.setState({ testOutput: <Trans>Previous Action</Trans> }); }}
          onPreviousMove={() => { this.setState({ testOutput: <Trans>Previous Move</Trans> }); }}
          onNextMove={() => { this.setState({ testOutput: <Trans>Next Move</Trans> }); }}
          onNextAction={() => { this.setState({ testOutput: <Trans>Next Action</Trans> }); }}
        />
      </Box>
    );
  }
}