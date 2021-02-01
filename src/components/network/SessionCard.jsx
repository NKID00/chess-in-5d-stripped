import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';
import LinkButton from 'components/LinkButton';
import Options from 'Options';

const countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const axios = require('axios');
const moment = require('moment');

export default class SessionCard extends React.Component {
  state = {
    showDetails: false
  }
  componentWillUnmount() {
    if(typeof this.props.showDetails === 'boolean') {
      this.setState({showDetails: this.props.showDetails});
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.showDetails !== this.props.showDetails) {
      if(typeof this.props.showDetails === 'boolean') {
        this.setState({showDetails: this.props.showDetails});
      }
    }
  }
  render() {
    return (
      <Accordion
        expanded={this.state.showDetails}
        onChange={(e, ex) => { this.setState({showDetails: ex}); }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
        >
          <Typography
            style={{
              flexGrow: 1
            }}
          >
            {this.props.session.white === this.props.session.black ?
              this.props.session.white + ' hosting spectating session'
            :
              <span>
                {this.props.session.white !== null ?
                  <b>{this.props.session.white}</b>
                :
                  <i>&lt;Empty Player Slot&gt;</i>
                }
                {' vs '}
                {this.props.session.black !== null ?
                  <b>{this.props.session.black}</b>
                :
                  <i>&lt;Empty Player Slot&gt;</i>
                }
              </span>
            }
            {' - ' + this.props.session.variant + ' (' + this.props.session.format + ') '}
            {this.props.session.ranked ?
              <i>[Ranked]</i>
            :
            <i>[Unranked]</i>
            }
          </Typography>
          <Typography variant='body2'>
            {this.props.session.ended ?
              'Session ended ' + moment(this.props.session.endDate).fromNow()
            : this.props.session.started ?
              'Session started ' + moment(this.props.session.startDate).fromNow()
            :
              'Session created'
            }
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {this.props.session.variant !== '' ?
                <Typography>
                  <b>Variant:</b> {this.props.session.variant}
                </Typography>
              :
                <></>
              }
            </Grid>
            <Grid item xs={6}>
              {this.props.session.format !== '' ?
                <Typography>
                  <b>Time Format:</b> {this.props.session.format}
                </Typography>
              :
                <></>
              }
            </Grid>
            <Grid item xs={6}>
              {this.props.session.white !== '' ?
                <Typography>
                  <b>White Player:</b> {this.props.session.white !== null ?
                    this.props.session.white
                  :
                    <i>&lt;Player Slot&gt;</i>
                  }
                </Typography>
              :
                <></>
              }
            </Grid>
            <Grid item xs={6}>
              {this.props.session.black !== '' ?
                <Typography>
                  <b>Black Player:</b> {this.props.session.black !== null ?
                    this.props.session.black
                  :
                    <i>&lt;Player Slot&gt;</i>
                  }
                </Typography>
              :
                <></>
              }
            </Grid>
            {this.props.showButton ?
              <Grid item xs={12}>
                {this.props.isHost ?
                  <Flex>
                    <Box mx='auto' />
                    <Button
                      m={1}
                      variant='outline'
                      color='red'
                      onClick={() => {
                        var token = Options.get('name').token;
                        axios.post(Options.get('server').url + '/sessions/' + this.props.session.id + '/remove', {}, {
                          headers: {
                            'Authorization': token
                          }
                        });
                      }}
                    >
                      Remove
                    </Button>
                    <LinkButton
                      m={1}
                      to={'/network/server/join/' + this.props.session.id}
                    >
                      Enter Game
                    </LinkButton>
                  </Flex>
                :
                  <Flex>
                    <Box mx='auto' />
                    <LinkButton
                      m={1}
                      variant='outline'
                      to={'/network/server/spectate/' + this.props.session.id}
                    >
                      Spectate
                    </LinkButton>
                    {this.props.session.white === null || this.props.session.black === null ?
                      <LinkButton
                        m={1}
                        to={'/network/server/join/' + this.props.session.id}
                      >
                        Join
                      </LinkButton>
                    :
                      <></>
                    }
                  </Flex>
                }
              </Grid>
            :
              <></>
            }
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}