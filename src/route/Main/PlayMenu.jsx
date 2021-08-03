import React from 'react';

import { Trans } from '@lingui/macro';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import QuickPlayMenu from 'route/Main/PlayMenu/QuickPlayMenu';

export default class PlayMenu extends React.Component {
  render() {
    return (
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card>
                  <Box p={1}>
                    <QuickPlayMenu />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
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
          </Grid>
        </Grid>
      </Box>
    );
  }
}