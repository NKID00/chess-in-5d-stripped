import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class SessionsPanel extends React.Component {
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
            <Typography>
              <Trans>No game requests...</Trans>
            </Typography>
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
            <Typography>
              <Trans>No ongoing games...</Trans>
            </Typography>
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
            <Typography>
              <Trans>No past games...</Trans>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </>
    );
  }
}