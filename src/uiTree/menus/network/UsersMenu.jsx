import React from 'react';

import UserCard from 'components/network/UserCard';
import { withSnackbar } from 'notistack';
import { getUsers } from 'db/Users';

class UserMenu extends React.Component {
  state = {
    users: []
  };
  mounted = true;
  async getUsers() {
    if(this.mounted) {
      this.setState({
        users: (await getUsers())
      });
      window.setTimeout(this.getUsers.bind(this), 500);
    }
  }
  componentDidMount() {
    this.getUsers();
  }
  componentWillUnmount() {
    this.mounted = false;
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
        return user1.username.localeCompare(user2.username);
      }).map((user) => {
        return (
          <UserCard user={user} key={user.username} />
        );
      })
    );
  }
}

export default withSnackbar(UserMenu);