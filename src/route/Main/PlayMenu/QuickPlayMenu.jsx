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
import QuickPlayModal from 'route/Main/PlayMenu/QuickPlayModal';

import EmitterContext from 'utils/EmitterContext';
import Delay from 'utils/Delay';
import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as sessions from 'network/sessions';
import * as quickplay from 'network/quickplay';

class QuickPlayMenu extends React.Component {
  static contextType = EmitterContext;
  state = {
    loggedIn: authStore.isLoggedIn(),
    queueDuration: 0,
    totalPlayers: 0,
    queueStarted: false,
    matchFound: false,
    ranked: false,
    opponentTimeout: false
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
  async quickplay(ranked = false) {
    let variants = settings.get().quickPlay.variants;
    let formats = settings.get().quickPlay.formats;
    this.setState({
      queueDuration: 0,
      queueStarted: true,
      matchFound: false,
      ranked: ranked,
      opponentTimeout: false
    });
    try {
      await quickplay.cancelQueue();
      let matchStarted = false;
      while(!matchStarted) {
        //Start queue
        let res = await quickplay.startQueue(ranked, variants, formats);
        let matchFound = res.sessionId;
        while(matchFound === null) {
          await Delay(333);
          res = await quickplay.getQueue();
          this.setState({ queueDuration: Date.now() - res.date });
          matchFound = res.sessionId;
        }
        this.setState({ matchFound: true });
        //Confirm and wait for session start
        await quickplay.confirmQueue();
        res = await sessions.getSession(matchFound);
        matchStarted = res.started;
        const maxWait = Date.now() + 5000;
        while(!matchStarted || Date.now() > maxWait) {
          await Delay(333);
          res = await sessions.getSession(matchFound);
          matchStarted = res.started;
        }
        //Show opponent timeout if needed
        if(!matchStarted) {
          await quickplay.cancelQueue();
          this.setState({ opponentTimeout: true });
          await Delay(2000);
          this.setState({
            matchFound: false,
            opponentTimeout: false
          });
        }
        else {
          this.props.history.push('/play?id=' + matchFound);
        }
      }
    }
    catch(err) {
      this.setState({ queueStarted: false });
    }
  }
  async cancel() {
    await quickplay.cancelQueue();
    this.setState({
      queueStarted: false,
      matchFound: false,
      opponentTimeout: false
    });
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
        <QuickPlayModal
          open={this.state.queueStarted}
          ranked={this.state.ranked}
          totalPlayers={0}
          found={this.state.matchFound}
          opponentTimeout={this.state.opponentTimeout}
          onCancel={this.cancel.bind(this)}
        />
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
                    this.quickplay();
                  }}
                >
                  <Trans>Quick Play</Trans>
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
                      this.quickplay(true);
                    }}
                  >
                    <Trans>Ranked Play</Trans>
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
          <Tooltip
            arrow
            title={<Trans>Log in to play online!</Trans>}
            disableFocusListener={this.state.loggedIn}
            disableHoverListener={this.state.loggedIn}
            disableTouchListener={this.state.loggedIn}
          >
            <Box p={1} width={1} height={90}>
              <Button
                disabled={!this.state.loggedIn}
                color='primary'
                variant='contained'
                style={{ width: '100%', height: '100%' }}
                onClick={() => {
                  this.quickplay();
                }}
              >
                <Trans>Quick Play</Trans>
              </Button>
            </Box>
          </Tooltip>
          <Tooltip
            arrow
            title={<Trans>Log in to play online!</Trans>}
            disableFocusListener={this.state.loggedIn}
            disableHoverListener={this.state.loggedIn}
            disableTouchListener={this.state.loggedIn}
          >
            <Box p={1} width={1} height={50}>
              <Button
                disabled={!this.state.loggedIn}
                color='secondary'
                variant='outlined'
                style={{ width: '100%', height: '100%' }}
                onClick={() => {
                  this.quickplay(true);
                }}
              >
                <Trans>Ranked Play</Trans>
              </Button>
            </Box>
          </Tooltip>
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