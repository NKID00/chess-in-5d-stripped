import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import QuickPlayOptions from 'route/Main/PlayMenu/QuickPlayMenu/QuickPlayOptions';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as sessions from 'network/sessions';

/*
Props:
 - onQuick
 - onRanked
 - onLocal
*/
class QuickPlayMenu extends React.Component {
  static contextType = EmitterContext;
  state = {
    loggedIn: authStore.isLoggedIn()
  };
  async onLocal() {
    let variants = settings.get().quickPlay.variants;
    let formats = settings.get().quickPlay.formats;
    let newSession = await sessions.createSession(
      false,
      variants[0],
      formats[0],
      'white',
      false,
      this.context
    );
    this.props.history.push('/play?id=' + newSession.id);
  }
  componentDidMount() {
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.setState({ loggedIn: authStore.isLoggedIn() });
    });
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    return (
      <>
        <Hidden xsDown>
          <Box display='flex' width={1} height={130}>
            <Tooltip
              arrow
              title={<Trans>Log in to play online!</Trans>}
              disableFocusListener={this.state.loggedIn}
              disableHoverListener={this.state.loggedIn}
              disableTouchListener={this.state.loggedIn}
            >
              <Box p={1} width={1/2} height={1}>
                <Button
                  disabled={!this.state.loggedIn}
                  color='primary'
                  variant='contained'
                  style={{ width: '100%', height: '100%' }}
                  onClick={() => {
                    if(typeof this.props.onQuick === 'function') {
                      this.props.onQuick();
                    }
                  }}
                >
                  <Trans><s>Quick Play</s> <i>WIP</i></Trans>
                </Button>
              </Box>
            </Tooltip>
            <Box p={1} width={1/2} height={1}>
              <Tooltip
                arrow
                title={<Trans>Log in to play online!</Trans>}
                disableFocusListener={this.state.loggedIn}
                disableHoverListener={this.state.loggedIn}
                disableTouchListener={this.state.loggedIn}
              >
                <Box pb={0.5} width={1} height={1/2}>
                  <Button
                    disabled={!this.state.loggedIn}
                    color='secondary'
                    variant='contained'
                    style={{ width: '100%', height: '100%' }}
                    onClick={() => {
                      if(typeof this.props.onRanked === 'function') {
                        this.props.onRanked();
                      }
                    }}
                  >
                    <Trans><s>Ranked Play</s> <i>WIP</i></Trans>
                  </Button>
                </Box>
              </Tooltip>
              <Box pt={0.5} width={1} height={1/2}>
                <Button
                  color='default'
                  variant='outlined'
                  style={{ width: '100%', height: '100%' }}
                  onClick={() => {
                    this.onLocal();
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
              <Trans><s>Quick Play</s> <i>WIP</i></Trans>
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
              <Trans><s>Ranked Play</s> <i>WIP</i></Trans>
            </Button>
          </Box>
          <Box p={1} width={1} height={50}>
            <Button
              color='default'
              variant='outlined'
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                this.onLocal();
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
              <QuickPlayOptions />
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    );
  }
 }

 export default withRouter(QuickPlayMenu);