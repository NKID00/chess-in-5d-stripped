import React from 'react';

import Options from 'Options';
import UserCard from 'components/network/UserCard';
import { withSnackbar } from 'notistack';

const axios = require('axios');

class UserMenu extends React.Component {
  state = {
    users: []
  };
  async getUsers() {
    try{
      var token = Options.get('name').token;
      this.setState({
        users: (await axios.get(Options.get('server').url + '/users', {
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
    window.setTimeout(this.getUsers.bind(this), 5000);
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      this.state.users.sort((user1, user2) => {
        if(user1.lastAuth + 10000 < Date.now()) {
          if(user2.lastAuth + 10000 >= Date.now()) {
            return 1;
          }
        }
        else {
          if(user2.lastAuth + 10000 < Date.now()) {
            return -1;
          }
        }
        return user1.username - user2.username;
      }).map((user, i) => {
        return (
          <UserCard user={user} key={i} />
        );
      })
    );
  }
}

export default withSnackbar(UserMenu);