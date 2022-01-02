import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Jdenticon from 'react-jdenticon';

import * as users from 'network/users';

export default class UserAvatar extends React.Component {
  state = {
    avatar: null
  };
  async getAvatar() {
    if(typeof this.props.username === 'string') {
      let user = await users.getOne(this.props.username);
      if(user !== null && typeof user.avatar === 'string') {
        this.setState({
          avatar: user.avatar
        });
      }
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
        <Tooltip arrow title={this.props.username}>
          <Avatar
            src={this.state.avatar}
            style={{
              backgroundColor: 'white',
              width: this.props.width,
              height: this.props.height,
            }}
          />
        </Tooltip>
      );
    }
    return (
      <Tooltip arrow title={this.props.username}>
        <Avatar
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
        >
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