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

import CloseIcon from '@material-ui/icons/Close';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import UserText from 'components/UserText';

import * as authStore from 'state/auth';
import * as sessions from 'network/sessions';

/*
Props
- session
*/
export default class WaitModal extends React.Component {
  render() {
    let username = authStore.get().username;
    let isHost = this.props.session.host === username;
    let hasNonHost = (
      (this.props.session.white === username && this.props.session.black && this.props.session.black.length > 0) ||
      (this.props.session.black === username && this.props.session.white && this.props.session.white.length > 0)
    );
    let hasJoined = this.props.session.requestJoin.length > 0;
    let isReady = this.props.session.ready;
    let isJoined = this.props.session.requestJoin.includes(username);
    let isPlayer = this.props.session.white === username || this.props.session.black === username;
    let stage = 0;
    /*
    Stages:
    0 -> No join requests / not joined
    1 -> No non-host player / is not non-host player
    2 -> Non-host player not ready
    3 -> Host player has not started
    4 -> Is not player
    */
    if(
      (isHost && !hasNonHost && !hasJoined) ||
      (!isHost && !hasNonHost && !isJoined)
    ) {
      stage = 0;
    }
    else if(  
      (isHost && !hasNonHost && hasJoined) ||
      (!isHost && !hasNonHost && isJoined)
    ) {
      stage = 1;
    }
    else if(isPlayer && !isReady) {
      stage = 2;
    }
    else if(isPlayer && isReady) {
      stage = 3;
    }
    else {
      stage = 4;
    }
    return (
      <Dialog
        fullWidth
        maxWidth='md'
        open={!this.props.session.started}
      >
        <DialogTitle>
          <Trans>Loading Game</Trans>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display='flex'>
                <Box mx='auto'>
                  {(
                    (isHost && (stage === 0 || stage === 2)) ||
                    (!isHost && (stage === 1 || stage === 3))
                  ) ?
                    <CircularProgress
                      size={120}
                      thickness={3.3}
                      disableShrink
                      style={{
                        animationDuration: '2000ms'
                      }}
                    />
                  : (
                    (isHost && (stage === 1 || stage === 3)) ||
                    (!isHost && (stage === 0 || stage === 2))
                  ) ?
                    <PriorityHighIcon
                      style={{ fontSize: 120 }}
                      color='primary'
                    />
                  :
                    <CloseIcon
                      style={{ fontSize: 120 }}
                      color='primary'
                    />
                  }
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex'>
                <Box mx='auto'>
                  <Typography>
                    {isHost ?
                      stage === 0 ?
                        <Trans>Waiting for join requests...</Trans>
                      : stage === 1 ?
                        <Trans>Select player from join requests</Trans>
                      : stage === 2 ?
                        <Trans>Waiting for opponent to confirm ready to play...</Trans>
                      :
                        <Trans>Start game</Trans>
                    :
                      stage === 0 ?
                        <Trans>Submit join request</Trans>
                      : stage === 1 ?
                        <Trans>Waiting for host to select player...</Trans>
                      : stage === 2 ?
                        <Trans>Confirm ready to play</Trans>
                      : stage === 3 ?
                        <Trans>Waiting for host to start game...</Trans>
                      :
                        <Trans>Host selected another player</Trans>
                    }
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {isHost && stage === 1 ?
              this.props.session.requestJoin.map((username) => {
                return (
                  <Box m={1}>
                    <Button
                      onClick={() => {
                        sessions.addUserSession(this.props.session.id, username);
                      }}
                    >
                      <UserText username={username} />
                    </Button>
                  </Box>
                );
              })
            :
              null
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={this.props.found}
            onClick={() => {
              if(typeof this.props.onBack === 'function') {
                this.props.onBack();
              }
            }}
          >
            <Trans>Back</Trans>
          </Button>
          {!isHost && stage === 0 ?
            <Button
              color='primary'
              onClick={() => {
                sessions.requestJoinSession(this.props.session.id);
              }}
            >
              <Trans>Join</Trans>
            </Button>
          : !isHost && stage === 2 && !this.props.session.ready ?
            <Button
              color='primary'
              onClick={() => {
                sessions.readySession(this.props.session.id);
              }}
            >
              <Trans>Ready</Trans>
            </Button>
          : !isHost && stage === 2 && this.props.session.ready ?
            <Button
              color='primary'
              onClick={() => {
                sessions.unreadySession(this.props.session.id);
              }}
            >
              <Trans>Unready</Trans>
            </Button>
          : isHost && stage === 3 ?
            <Button
              color='primary'
              onClick={() => {
                sessions.startSession(this.props.session.id);
              }}
            >
              <Trans>Start</Trans>
            </Button>
          :
            null
          }
        </DialogActions>
      </Dialog>
    );
  }
}