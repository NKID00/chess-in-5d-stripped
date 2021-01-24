import React from 'react';
import { withRouter } from 'react-router';

import { Box, Flex, Text, Button } from 'rebass';
import TimedGamePlayer from 'components/TimedGamePlayer';
import { withSnackbar } from 'notistack';
import Options from 'Options';
import SessionCard from 'components/network/SessionCard';

const axios = require('axios');

class NetworkSpectateClient extends React.Component {
  timedGameRef = React.createRef();
  state = {
    session: {}
  };
  refresh = false;
  async getSession() {
    try{
      var token = Options.get('name').token;
      if(this.props.location.pathname.length > 25) {
        var sessionId = this.props.location.pathname.substring('25');
        var session = (await axios.get(Options.get('server').url + '/sessions/' + sessionId, {
          headers: {
            'Authorization': token
          }
        })).data;
        this.setState({
          session: session
        });
      }
      if(this.refresh) {
        window.setTimeout(this.getSession.bind(this), 500);
      }
    }
    catch(err) {
      this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
      console.error(err);
      if(this.refresh) {
        window.setTimeout(this.getSession.bind(this), 5000);
      }
    }
  }
  componentDidMount() {
    this.getSession();
    this.refresh = true;
  }
  componentWillUnmount() {
    this.refresh = false;
  }
  render() {
    return (
      <TimedGamePlayer
        start={this.state.session.started}
        ended={this.state.session.ended}
        disableTimed
        disableVariant
        disableStart
        overrideStart
        timed={this.state.session.timed !== null && typeof this.state.session.timed !== 'undefined'}
        whiteDurationLeft={this.state.session.timed ? this.state.session.timed.whiteDurationLeft : 0 }
        blackDurationLeft={this.state.session.timed ? this.state.session.timed.blackDurationLeft : 0 }
        startingDuration={this.state.session.timed ? this.state.session.timed.startingDuration : 0 }
        perActionFlatIncrement={this.state.session.timed ? this.state.session.timed.perActionFlatIncrement : 0 }
        perActionTimelineIncrement={this.state.session.timed ? this.state.session.timed.perActionTimelineIncrement : 0 }
        modalChildren={
          <>
            <Text p={2} fontWeight='bold'>Waiting for session to start...</Text>
            <SessionCard
              session={this.state.session}
            />
          </>
        }
        backLink='/network/server'
      />
    );
  }
}

export default withRouter(withSnackbar(NetworkSpectateClient));
