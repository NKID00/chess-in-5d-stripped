import React from 'react';
import { withRouter } from 'react-router';

import MenuBar from 'components/MenuBar';
import LoginRedirect from 'components/network/LoginRedirect';

class SessionRedirect extends React.Component {
  render() {
    return (
      <>
        <MenuBar />
        <LoginRedirect 
          to={'/network/server/play/' + this.props.location.pathname.substring('21')}
          backLink='/network/server'
        />
      </>
    );
  }
}

export default withRouter(SessionRedirect);