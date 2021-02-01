import React from 'react';
import { Redirect } from 'react-router';

import Modal from 'react-modal';
import { Box, Flex, Text, Button, Link } from 'rebass';
import { withSnackbar } from 'notistack';
import { CountryDropdown } from 'react-country-region-selector';
import TextField from '@material-ui/core/TextField';
import LinkButton from 'components/LinkButton';
import Options from 'Options';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const axios = require('axios');

class LoginMenu extends React.Component {
  state = {
    registerMode: false,
    username: Options.get('name').username.toLocaleLowerCase().replace(/\s+/g,'_'),
    password: '',
    bio: '',
    fullname: '',
    token: Options.get('name').token,
    invalidUsername: false,
    invalidPassword: false,
    redirect: false
  };
  login() {
    axios.get(Options.get('server').url + '/users/' + this.state.username).then((res) => {
      axios.post(Options.get('server').url + '/login', {
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
        Options.set('name', { token: res.data });
        this.setState({ redirect: true });
        if(typeof this.props.onLogin === 'function') {
          this.props.onLogin();
        }
      }).catch((err) => {
        if(err.response.status !== 500 && err.response.status !== 401) {
          this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
          console.error(err);
        }
        else {
          this.setState({ invalidPassword: true });
        }
      });
    }).catch((err) => {
      if(err.response.status !== 500) {
        this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
        console.error(err);
      }
      else {
        this.setState({ invalidUsername: true });
      }
    });
  }
  register() {
    axios.get(Options.get('server').url + '/users/' + this.state.username).then(() => {
      this.setState({ invalidUsername: true });
    }).catch((err) => {
      if(err.response.status !== 500) {
        this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
        console.error(err);
      }
      else {
        axios.post(Options.get('server').url + '/register', {
          username: this.state.username,
          password: this.state.password,
          fullname: this.state.fullname,
          bio: this.state.bio,
          country: countries.getAlpha3Code(this.state.country, 'en'),
          token: Options.get('server').key
        }).then((res) => {
          Options.set('name', { username: this.state.username, token: res.data });
          this.setState({ redirect: true });
          if(typeof this.props.onLogin === 'function') {
            this.props.onLogin();
          }
        }).catch((err) => {
          if(err.response.status !== 500) {
            this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
            console.error(err);
          }
          else {
            this.setState({ invalidPassword: true });
          }
        });
      }
    });
  }
  render() {
    return (
      <>
        {this.state.redirect && this.props.to ?
          <Redirect push to={this.props.to} />
        :
          <></>
        }
        <Modal
          isOpen={this.props.open}
          style={{
            overlay: {backgroundColor: 'rgba(0,0,0,0)'},
            content: {padding: '0px'}
          }}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            width={1}
            sx={{position: 'absolute', top: 0}}
          >
            <Text p={2} fontWeight='bold'>{this.state.registerMode ? 'Register' : 'Login'}</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            {this.state.registerMode ?
              <>
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
              </>
            :
              <></>
            }
            <Text p={2} fontWeight='bold'>Username</Text>
            <Box p={2}>
              <TextField
                fullWidth
                error={this.state.invalidUsername}
                value={this.state.username}
                onChange={(e) => {
                  Options.set('name', {username: e.target.value.toLocaleLowerCase().replace(/\s+/g,'_')});
                  this.setState({ username: e.target.value.toLocaleLowerCase().replace(/\s+/g,'_') });
                }}
                helperText={this.state.invalidUsername ?
                  this.state.registerMode ? 'Username already taken!' : 'User does not exist!'
                :
                  ''
                }
              />
            </Box>
            <Text p={2} fontWeight='bold'>Password</Text>
            <Box p={2}>
              <TextField
                fullWidth
                type='password'
                error={this.state.invalidPassword}
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                helperText={this.state.invalidPassword ?
                  'Password Incorrect!'
                :
                  ''
                }
              />
            </Box>
            {this.state.registerMode ?
              <>
                <Text p={2} fontWeight='bold'>Country</Text>
                <Flex p={2}>
                  <CountryDropdown
                    value={this.state.country}
                    onChange={(e) => {
                      this.setState({ country: e });
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
              </>
            :
              <></>
            }
            <Box my={2} />
            <Link p={2}
              onClick={(e) => {
                this.setState({
                  registerMode: !this.state.registerMode
                });
                e.preventDefault();
              }}
              href='#'
            >
              {this.state.registerMode ?
                'Already have an account?'
              :
                'Don\'t have an account?'
              }
            </Link>
          </Box>
          <Flex
            p={2}
            alignItems='center'
            bg='white'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <LinkButton
              to={this.props.backLink ? this.props.backLink : '/network'}
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary'
              onClick={() => {
                if(this.state.registerMode) {
                  this.register();
                }
                else {
                  this.login();
                }
              }}
            >
              {this.state.registerMode ? 'Register' : 'Login'}
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
}

export default withSnackbar(LoginMenu);