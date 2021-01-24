import React from 'react';

import Options from 'Options';
import SessionCard from 'components/network/SessionCard';
import NewSessionCard from 'components/network/NewSessionCard';
import { withSnackbar } from 'notistack';

const axios = require('axios');

class SessionMenu extends React.Component {
  state = {
    sessions: []
  };
  async getSessions() {
    try{
      var token = Options.get('name').token;
      this.setState({
        sessions: (await axios.get(Options.get('server').url + '/sessions', {
          headers: {
            'Authorization': token
          }
        })).data
      });
    }
    catch(err) {
      this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
      console.error(err);
    }
    window.setTimeout(this.getSessions.bind(this), 2000);
  }
  componentDidMount() {
    this.getSessions();
  }
  render() {
    return (
      <>
        <NewSessionCard />
        {this.state.sessions.sort((session1, session2) => {
          if(session1.started && !session2.started) {
            return 1;
          }
          else if(!session1.started && session2.started) {
            return -1;
          }
          else if(session1.ended && !session2.ended) {
            return 1;
          }
          else if(!session1.ended && session2.ended) {
            return -1;
          }
        }).map((session, i) => {
          return (
            <SessionCard session={session} key={i} showButton />
          );
        })}
      </>
    );
  }
}

export default withSnackbar(SessionMenu);