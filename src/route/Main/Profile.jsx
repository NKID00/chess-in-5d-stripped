import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Flags from 'country-flag-icons/react/3x2';
import { CountryRegionData } from 'react-country-region-selector';
import { FilePond } from 'react-filepond';
import Jimp from 'jimp';

import UserAvatar from 'components/UserAvatar';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';
import * as users from 'network/users';

import 'filepond/dist/filepond.min.css';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

class Profile extends React.Component {
  static contextType = EmitterContext;
  state = {
    username: '',
    fullname: '',
    avatar: null,
    bio: '',
    country: '',
    email: '',
    showEmail: false,
  }
  async getSelf() {
    if(!authStore.isLoggedIn()) {
      this.props.history.replace('/login');
    }
    let auth = authStore.get();
    if(typeof auth.username === 'string') {
      let user = (await users.getOne(auth.username));
      if(user !== null) {
        this.setState({
          username: user.username,
          fullname: user.fullname,
          bio: user.bio,
          country: user.country,
          email: user.email,
          showEmail: user.showEmail,
        });
      }
    }
  }
  //TODO selfUpdate event?
  async updateSelf() {
    let data = {};
    if(typeof this.state.fullname === 'string' && this.state.fullname.length > 0) {
      data.fullname = this.state.fullname;
    }
    if(typeof this.state.avatar === 'string' && this.state.avatar.length > 0) {
      data.avatar = this.state.avatar;
    }
    if(typeof this.state.bio === 'string' && this.state.bio.length > 0) {
      data.bio = this.state.bio;
    }
    if(typeof this.state.country === 'string' && this.state.country.length > 0) {
      data.country = this.state.country;
    }
    if(typeof this.state.email === 'string' && this.state.email.length > 0) {
      data.email = this.state.email;
    }
    if(typeof this.state.showEmail === 'boolean') {
      data.showEmail = this.state.showEmail;
    }
    await users.update(data);
    await this.getSelf();
    window.location.reload();
  }
  componentDidMount() {
    this.getSelf();
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.getSelf();
    });
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    return (
      <Container maxWidth='sm'>
        <Box mt={2}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h6'>
                    <Trans>Avatar</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    <Trans>Small image or icon used for a user's avatar.</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box m={1}>
                    {this.state.avatar === null ?
                      <UserAvatar
                        width={70}
                        height={70}
                        username={this.state.username}
                      />
                    :
                      <Tooltip arrow title={this.state.username}>
                        <Avatar
                          style={{
                            backgroundColor: 'white',
                            width: 70,
                            height: 70,
                          }}
                          src={this.state.avatar}
                        />
                      </Tooltip>
                    }
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Box mx={1} mt={1}>
                    <FilePond
                      allowProcess={false}
                      onaddfile={async (error, file) => {
                        if(!error) {
                          let image = await Jimp.read(await (file.file.arrayBuffer()));
                          image.cover(128, 128, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
                          image.rgba(false);
                          image.background(0xffffffff);
                          image.rgba(true);
                          image.filterType(Jimp.PNG_FILTER_AUTO);
                          image.deflateLevel(9);
                          let dataUrl = (await image.getBase64Async(Jimp.MIME_PNG));
                          this.setState({ avatar: dataUrl });
                        }
                      }}
                      onupdatefiles={(files) => {
                        if(files.length <= 0) {
                          this.setState({ avatar: null });
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>
                    <Trans>Name</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    <Trans>Display name, people will see this name. <i>Limited to 100 characters</i></Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      variant='outlined'
                      value={this.state.fullname}
                      onChange={(event) => {
                        this.setState({ fullname: event.target.value.substr(0,100) });
                      }}
                      label={<Trans>Full Name</Trans>}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>
                    <Trans>Country</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    <Trans>ISO 3166-1 Alpha-3 compliant string to indicate user's country of origin.</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {this.state.country.length > 0 ?
                      <Grid item xs={2}>
                        {React.createElement(
                          Flags[countries.alpha3ToAlpha2(this.state.country, 'en')],
                          {
                            title: this.state.country
                          },
                          null
                        )}
                      </Grid>
                    :
                      <></>
                    }
                    <Grid item xs>
                      <FormControl fullWidth variant='outlined'>
                        <InputLabel><Trans>Country</Trans></InputLabel>
                        <Select
                          value={this.state.country.length > 0 ? countries.alpha3ToAlpha2(this.state.country, 'en') : this.state.country}
                          onChange={(event) => {
                            if(event.target.value.length > 0) {
                              this.setState({ country: countries.alpha2ToAlpha3(event.target.value, 'en') });
                            }
                            else {
                              this.setState({ country: '' });
                            }
                          }}
                          label={<Trans>Country</Trans>}
                        >
                          <MenuItem value=''>
                            <Trans>Select Country</Trans>
                          </MenuItem>
                          {CountryRegionData.map((option) => (
                            <MenuItem key={option[0]} value={option[1]}>
                              {option[0]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>
                    <Trans>Email</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    <Trans>Email address of the user, used primarily for password recovery.</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      variant='outlined'
                      value={this.state.email}
                      onChange={(event) => {
                        this.setState({ email: event.target.value });
                      }}
                      label={<Trans>Email</Trans>}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    label={<Trans>Show Email Publically</Trans>}
                    control={
                      <Checkbox
                        color='primary'
                        checked={this.state.showEmail}
                        onChange={(event) => { 
                          this.setState({ showEmail: event.target.checked });
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>
                    <Trans>Biography</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    <Trans>User information available for everyone to see. <i>Limited to 500 characters</i></Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      maxRows={10}
                      variant='outlined'
                      value={this.state.bio}
                      onChange={(event) => {
                        this.setState({ bio: event.target.value.substr(0, 500) });
                      }}
                      label={<Trans>Bio</Trans>}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                color='primary'
                onClick={() => {
                  this.updateSelf();
                }}
              >
                <Trans>Save</Trans>
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push('/');
                }}
              >
                <Trans>Cancel</Trans>
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    );
  }
}

export default withRouter(Profile);