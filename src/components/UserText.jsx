import React from 'react';

import * as users from 'network/users';

export default class UserAvatar extends React.Component {
  state = {
    displayName: this.props.username
  };
  async getName() {
    if(typeof this.props.username === 'string') {
      try {
        let user = await users.getOne(this.props.username);
        if(user !== null && typeof user.fullname === 'string' && user.fullname.length > 0) {
          this.setState({
            displayName: user.fullname
          });
        }
      }
      catch(err) {}
    }
  }
  componentDidMount() {
    this.getName();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.username !== this.props.username) {
      this.getName();
    }
  }
  render() {
    return this.state.displayName;
  }
}