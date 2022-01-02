import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SessionCard from 'components/SessionCard';

import EmitterContext from 'utils/EmitterContext';
import * as sessions from 'network/sessions';

export default class SessionsPanel extends React.Component {
  static contextType = EmitterContext;
  state = {
    sessionRequests: [],
    currentSessions: [],
    pastSessions: []
  };
  async refresh() {
    let sessionData = await sessions.getSessions();
    this.setState(sessionData);
  }
  componentDidMount() {
    this.refresh();
    //Update state if session store is changed
    this.sessionListener = this.context.on('sessionsUpdate', () => {
      this.refresh();
    });
    //Update state if interval triggered
    this.sessionRefreshInterval = window.setInterval(this.refresh.bind(this), 2500);
  }
  componentWillUnmount() {
    //Stop listening to session store changes
    if(typeof this.sessionListener === 'function') { this.sessionListener(); }
    window.clearInterval(this.sessionRefreshInterval);
  }
  render() {
    return (
      <>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>
              <Trans>Game Requests</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {this.state.sessionRequests.length > 0 ?
              <Grid container spacing={2}>
                {this.state.sessionRequests.map((session, i) => (
                  <Grid key={i} item xs={12}>
                    <SessionCard flat session={session} />
                  </Grid>
                ))}
              </Grid>
            :
              <Typography>
                <Trans>No game requests...</Trans>
              </Typography>
            }
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>
              <Trans>Current Games</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {this.state.currentSessions.length > 0 ?
              <Grid container spacing={2}>
                {this.state.currentSessions.map((session, i) => (
                  <Grid key={i} item xs={12}>
                    <SessionCard flat session={session} />
                  </Grid>
                ))}
              </Grid>
            :
              <Typography>
                <Trans>No ongoing games...</Trans>
              </Typography>
            }
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>
              <Trans>Past Games</Trans>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {this.state.pastSessions.length > 0 ?
              <Grid container spacing={2}>
                {this.state.pastSessions.map((session, i) => (
                  <Grid key={i} item xs={12}>
                    <SessionCard flat session={session} />
                  </Grid>
                ))}
              </Grid>
            :
              <Typography>
                <Trans>No past games...</Trans>
              </Typography>
            }
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
}