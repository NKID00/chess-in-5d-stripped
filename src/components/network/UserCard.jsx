import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';
import Flags from 'country-flag-icons/react/3x2';
import Options from 'Options';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const moment = require('moment');

export default class UserCard extends React.Component {
  render() {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
        >
          <Typography
            style={{
              flexGrow: 1
            }}
          >
            {this.props.user.bot ?
              this.props.user.username + ' ' + String.fromCodePoint(0x1F916) + ' '
            :
              this.props.user.username + ' '
            }
            {Options.get('name').username === this.props.user.username ?
              <b>(Me)</b>
            :
              ''
            }
          </Typography>
          <Typography variant='body2'>
            {this.props.user.lastAuth + 10000 < Date.now() ?
              <i>
                {this.props.user.lastAuth === 0 ?
                  'Offline'
                :
                  'Offline - Last online ' + moment(this.props.user.lastAuth).fromNow()}
              </i>
            :
              <b>Online</b>
            }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {this.props.user.fullname !== '' ?
                <Typography>
                  Full Name: {this.props.user.fullname}
                </Typography>
              :
                <></>
              }
            </Grid>
            <Grid item xs={6}>
              {this.props.user.country !== '' ?
                <>
                  <Typography>
                    Country: {this.props.user.country}
                    <span
                      style={{
                        width: '1.8vw',
                        marginLeft: '0.6vw',
                        display: 'inline-block'
                      }}
                    >
                      {React.createElement(
                        Flags[countries.alpha3ToAlpha2(this.props.user.country)],
                        {
                          title: this.props.user.country
                        },
                        null
                      )}
                    </span>
                  </Typography>
                </>
              :
                <></>
              }
            </Grid>
            <Grid item xs={6}>
              {this.props.user.joinDate !== 0 ?
                <Typography>
                  Joined: {moment(this.props.user.joinDate).fromNow()}
                </Typography>
              :
                <></>
              }
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2'>
                {this.props.user.bio}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {this.props.children}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}