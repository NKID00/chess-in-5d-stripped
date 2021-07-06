import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

/*
Props:
 - onQuick
 - onRanked
 - onLocal
*/
export default class QuickPlayMenu extends React.Component {
  render() {
    return (
      <>
        <Hidden xsDown>
          <Box display='flex' width={1} height={130}>
            <Box p={1} width={1/2} height={1}>
              <Button
                color='primary'
                variant='contained'
                style={{ width: '100%', height: '100%' }}
                onClick={() => {
                  if(typeof this.props.onQuick === 'function') {
                    this.props.onQuick();
                  }
                }}
              >
                <Trans>Quick Play</Trans>
              </Button>
            </Box>
            <Box p={1} width={1/2} height={1}>
              <Box pb={0.5} width={1} height={1/2}>
                <Button
                  color='secondary'
                  variant='outlined'
                  style={{ width: '100%', height: '100%' }}
                  onClick={() => {
                    if(typeof this.props.onRanked === 'function') {
                      this.props.onRanked();
                    }
                  }}
                >
                  <Trans>Ranked Play</Trans>
                </Button>
              </Box>
              <Box pt={0.5} width={1} height={1/2}>
                <Button
                  color='default'
                  variant='outlined'
                  style={{ width: '100%', height: '100%' }}
                  onClick={() => {
                    if(typeof this.props.onLocal === 'function') {
                      this.props.onLocal();
                    }
                  }}
                >
                  <Trans>Local Play</Trans>
                </Button>
              </Box>
            </Box>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box p={1} width={1} height={90}>
            <Button
              color='primary'
              variant='contained'
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                if(typeof this.props.onQuick === 'function') {
                  this.props.onQuick();
                }
              }}
            >
              <Trans>Quick Play</Trans>
            </Button>
          </Box>
          <Box p={1} width={1} height={50}>
            <Button
              color='secondary'
              variant='outlined'
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                if(typeof this.props.onRanked === 'function') {
                  this.props.onRanked();
                }
              }}
            >
              <Trans>Ranked Play</Trans>
            </Button>
          </Box>
          <Box p={1} width={1} height={50}>
            <Button
              color='default'
              variant='outlined'
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                if(typeof this.props.onLocal === 'function') {
                  this.props.onLocal();
                }
              }}
            >
              <Trans>Local Play</Trans>
            </Button>
          </Box>
        </Hidden>
      </>
    );
  }
 }