import React from 'react';

import Options from 'Options';
import SessionCard from 'components/network/SessionCard';
import NewSessionCard from 'components/network/NewSessionCard';
import { withSnackbar } from 'notistack';
import { getSessions } from 'db/Sessions';

class SessionMenu extends React.Component {
  state = {
    sessions: []
  };
  mounted = true;
  async getSessions() {
    if(this.mounted) {
      try{
        this.setState({
          sessions: (await getSessions())
        });
      }
      catch(err) {
        this.props.enqueueSnackbar('Network error occurred, open console for more details!', {variant: 'error'});
        console.error(err);
      }
      window.setTimeout(this.getSessions.bind(this), 500);
    }
  }
  componentDidMount() {
    this.getSessions();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return (
      <>
        <NewSessionCard />
        {this.state.sessions.sort((session1, session2) => {
          var user = Options.get('name').username;
          if(session1.host === user && !session2.host === user) {
            return 1;
          }
          else if(!session1.host === user && session2.host === user) {
            return -1;
          }
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
          return session1.id.localeCompare(session2.id);
        }).map((session, i) => {
          return (
            <SessionCard session={session} username={Options.get('name').username} key={i} showButton />
          );
        })}
      </>
    );
  }
}

export default withSnackbar(SessionMenu);