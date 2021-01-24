import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { AiOutlinePlus } from 'react-icons/ai';
import LoginRedirect from 'components/network/LoginRedirect';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export default class NewSessionCard extends React.Component {
  render() {
    return (
      <Accordion TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<AiOutlinePlus />}
        >
          <Typography>
            Create New Session
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            
          </Grid>
          <LoginRedirect 
            to='/network/server'
            backLink='/network'
          />
        </AccordionDetails>
      </Accordion>
    );
  }
}