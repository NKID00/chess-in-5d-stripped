import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        <Box p={1} width={1}>
          <Accordion
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>
                <Trans>Options</Trans>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Trans>WIP Variants + Time Format Selector</Trans>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    );
  }
 }