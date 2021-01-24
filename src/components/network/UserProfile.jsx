import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import { CountryDropdown } from 'react-country-region-selector';
import TextField from '@material-ui/core/TextField';
import Options from 'Options';
import { withSnackbar } from 'notistack';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const axios = require('axios');

class UserProfile extends React.Component {
  state = {
    retrieved: false,
    username: '',
    bio: '',
    fullname: ''
  };
  async getUser() {
    try {
      var token = Options.get('name').token;
      var user = (await axios.get(Options.get('server').url + '/users/' + Options.get('name').username, {
        headers: {
          'Authorization': token
        }
      })).data;
      this.setState({
        username: user.username,
        fullname: user.fullname,
        bio: user.bio,
        country: user.country,
        retrieved: true
      });
    }
    catch(err) {
      this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
      console.error(err);
      window.setTimeout(this.getUsers.bind(this), 5000);
    }
  }
  async saveUser() {
    try {
      var token = Options.get('name').token;
      var user = (await axios.post(Options.get('server').url + '/users/' + Options.get('name').username + '/update', 
      {
        fullname: this.state.fullname,
        bio: this.state.bio,
        country: this.state.country
      },
      {
        headers: {
          'Authorization': token
        }
      })).data;
      this.setState({
        username: user.username,
        fullname: user.fullname,
        bio: user.bio,
        country: user.country,
        retrieved: true
      });
      this.props.enqueueSnackbar('Profile updated!', {variant: 'success'});
    }
    catch(err) {
      this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
      console.error(err);
    }
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <Box p={2}>
        <Text p={2} fontWeight='bold'>Username: {this.state.username}</Text>
        <Text p={2} fontWeight='bold'>Full Name</Text>
        <Box p={2}>
          <TextField
            fullWidth
            value={this.state.fullname}
            onChange={(e) => {
              this.setState({ fullname: e.target.value });
            }}
            helperText='Optional'
          />
        </Box>
        <Text p={2} fontWeight='bold'>Country</Text>
        <Flex p={2}>
          <CountryDropdown
            value={countries.alpha3ToAlpha2(this.state.country, 'en')}
            valueType='short'
            onChange={(e) => {
              this.setState({ country: countries.alpha2ToAlpha3(e, 'en') });
            }}
          />
          <Text p={2} fontStyle='italic'>Optional</Text>
        </Flex>
        <Text p={2} fontWeight='bold'>Bio</Text>
        <Box p={2}>
          <TextField
            fullWidth
            multiline
            rows={4}
            rowsMax={8}
            value={this.state.bio}
            onChange={(e) => {
              this.setState({ bio: e.target.value });
            }}
            helperText='Optional'
          />
        </Box>
        <Flex>
          <Box mx='auto' />
          <Button
            m={1}
            variant='outline'
            onClick={() => {
              Options.logout();
              window.location.reload();
            }}
          >
            Logout
          </Button>
          <Button
            m={1}
            onClick={this.saveUser.bind(this)}
          >
            Save
          </Button>
        </Flex>
      </Box>
    );
  }
}

export default withSnackbar(UserProfile);