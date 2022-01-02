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

/*
Props
 - open
 - ranked
 - totalPlayers
 - found
 - opponentTimeout
 - onCancel
*/
export default class QuickPlayModal extends React.Component {
  render() {
    return (
      <Dialog
        fullWidth
        maxWidth='md'
        open={this.props.open}
      >
        <DialogTitle>
          {this.props.ranked ?
            <Trans>Ranked Play Queue</Trans>
          :
            <Trans>Quick Play Queue</Trans>
          }
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display='flex'>
                <Box mx='auto'>
                  {this.props.opponentTimeout ?
                    <CloseIcon
                      style={{ fontSize: 120 }}
                      color='primary'
                    />
                  : this.props.found ?
                    <CheckIcon
                      style={{ fontSize: 120 }}
                      color='primary'
                    />
                  :
                    <CircularProgress
                      size={120}
                      thickness={3.3}
                      disableShrink
                      style={{
                        animationDuration: '2000ms'
                      }}
                    />
                  }
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display='flex'>
                <Box mx='auto'>
                  <Typography>
                    {this.props.opponentTimeout ?
                      <Trans>Opponent did not accept, rejoining queue...</Trans>
                    : this.props.found ?
                      <Trans>Match Found! Waiting for match to start...</Trans>
                    : this.props.ranked ?
                      <Trans>{this.props.totalPlayers} players looking for ranked match</Trans>
                    :
                      <Trans>{this.props.totalPlayers} players looking for match</Trans>
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