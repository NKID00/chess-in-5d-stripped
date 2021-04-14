import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Jdenticon from 'react-jdenticon';

import * as users from 'network/users';

export default class UserAvatar extends React.Component {
  state = {
    avatar: null
  };
  getAvatar() {
    if(typeof this.props.username === 'string') {
      users.getOne(this.props.username).then((user) => {
        if(user !== null && typeof user.avatar === 'string') {
          this.setState({
            avatar: user.avatar
          });
        }
      });
    }
  }
  componentDidMount() {
    this.getAvatar();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.username !== this.props.username) {
      this.getAvatar();
    }
  }
  render() {
    if(typeof this.state.avatar === 'string') {
      return (
        <Tooltip title={this.props.username}>
          <Avatar src={this.state.avatar} style={{ backgroundColor: 'white' }} />
        </Tooltip>
      );
    }
    return (
      <Tooltip title={this.props.username}>
        <Avatar>
          <div
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              left: 0,
              top: 0
            }}
          >
            <Jdenticon value={this.props.username} />
          </div>
        </Avatar>
      </Tooltip>
    );
  }
}