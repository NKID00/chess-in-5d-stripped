import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import * as authStore from 'state/auth';

/*
Props
- session
*/
export default class WaitModal extends React.Component {
  render() {
    let username = authStore.get().username;
    let isHost = this.props.session.host === username;
    let isWhite = this.props.session.white === username;
    let isBlack = this.props.session.black === username;
    let hasNonHost = (
      this.props.session.white === username && this.props.session.black.length > 0 ||
      this.props.session.black === username && this.props.session.white.length > 0
    );
    let hasJoined = this.props.session.requestJoin.length > 0;
    let isReady = this.props.session.ready;
    let isJoined = this.props.session.requestJoin.includes(username);
    return (
      <Dialog
        fullWidth
        maxWidth='md'
        open={!this.props.session.start}
      >
        <DialogTitle>
          <Trans>Loading Game</Trans>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display='flex'>
                <Box mx='auto'>
                  <CircularProgress
                    size={120}
                    thickness={3.3}
                    disableShrink
                    style={{
                      animationDuration: '2000ms'
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex'>
                <Box mx='auto'>
                  <Typography>
                    {isHost ?
                      !hasNonHost && !hasJoined ?
                        <Trans>Waiting for join requests...</Trans>
                      : !hasNonHost && hasJoined ?
                        <Trans>Select player from join requests</Trans>
                      : !isReady ?
                        <Trans>Waiting for opponent to confirm ready to play...</Trans>
                      :
                        <Trans>Start game</Trans>
                    :
                      !hasNonHost && !isJoined ?
                        <Trans>Submit join request</Trans>
                      : !hasNonHost && isJoined ?
                        <Trans>Waiting for host to select player</Trans>
                      :
                        <Trans>Confirm ready to play</Trans>
                    }
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={this.props.found}
            onClick={() => {
              if(typeof this.props.onCancel === 'function') {
                this.props.onCancel();
              }
            }}
          >
            <Trans>Cancel</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}