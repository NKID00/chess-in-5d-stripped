import React from 'react';

import { withSnackbar } from 'notistack';
import { Box, Flex, Text, Button } from 'rebass';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { AiOutlinePlus } from 'react-icons/ai';
import LoginRedirect from 'components/network/LoginRedirect';
import Options from 'Options';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const axios = require('axios');

class NewSessionCard extends React.Component {
  state = {
    hostSelected: 'white',
    variant: 'standard',
    format: 'untimed',
    ranked: false,
    showForm: false
  }
  async create() {
    var postData = {
      player: this.state.hostSelected,
      variant: this.state.variant,
      ranked: this.state.ranked
    };
    if(this.state.format !== 'untimed') {
      postData.format = this.state.format;
    }
    try {
      var token = Options.get('name').token;
      await axios.post(Options.get('server').url + '/sessions/new', postData, {
        headers: {
          'Authorization': token
        }
      });
      this.setState({ showForm: false });
    }
    catch(err) {
      this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
      console.error(err);
    }
  }
  render() {
    return (
      <Accordion
        expanded={this.state.showForm}
        onChange={(e, ex) => { this.setState({showForm: ex}); }}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<AiOutlinePlus />}
        >
          <Typography>
            Create New Session
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Flex>
                <Text p={2} fontWeight='bold'>Host Side</Text>
                <Select
                  value={this.state.hostSelected}
                  onChange={(e) => { 
                    this.setState({hostSelected: e.target.value});
                  }}
                >
                  <MenuItem value='white'>White</MenuItem>
                  <MenuItem value='black'>Black</MenuItem>
                  <MenuItem value='random'>Random</MenuItem>
                </Select>
              </Flex>
            </Grid>
            <Grid item xs={6}>
              <Flex>
                <Text p={2} fontWeight='bold'>Variant</Text>
                <Select
                  value={this.state.variant}
                  onChange={(e) => { 
                    this.setState({variant: e.target.value});
                  }}
                >
                  <MenuItem value='standard'>Standard</MenuItem>
                  <MenuItem value='defended pawn'>Defended Pawn</MenuItem>
                  <MenuItem value='half reflected'>Half Reflected</MenuItem>
                  <MenuItem value='princess'>Princess</MenuItem>
                  <MenuItem value='turn zero'>Turn Zero</MenuItem>
                </Select>
              </Flex>
            </Grid>
            <Grid item xs={6}>
              <Flex>
                <Text p={2} fontWeight='bold'>Format</Text>
                <Select
                  value={this.state.format}
                  error={this.state.ranked && this.state.format === 'untimed'}
                  onChange={(e) => { 
                    this.setState({format: e.target.value});
                  }}
                >
                  <MenuItem value='untimed'>Untimed</MenuItem>
                  <MenuItem value='bullet'>Bullet (5:0)</MenuItem>
                  <MenuItem value='blitz'>Blitz (10:0;inct5;)</MenuItem>
                  <MenuItem value='rapid'>Rapid (20:0;inct10;)</MenuItem>
                  <MenuItem value='standard'>Standard (40:0;inct20)</MenuItem>
                  <MenuItem value='tournament'>Tournament (80:0;inct40)</MenuItem>
                </Select>
              </Flex>
            </Grid>
            <Grid item xs={6}>
              <Flex>
                <Text p={2} fontWeight='bold'>Ranked</Text>
                <Checkbox color='primary' checked={this.state.ranked} onChange={(e) => { this.setState({ranked: e.target.checked}); }} />
              </Flex>
            </Grid>
            <Grid item xs={12}>
              <Flex>
                <Box mx='auto' />
                <Button
                  m={1}
                  onClick={() => {
                    this.create();
                  }}
                >
                  Create
                </Button>
              </Flex>
            </Grid>
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

export default withSnackbar(NewSessionCard);