import React from 'react';

import { Box, Flex, Text } from 'rebass';
import MenuBar from 'components/MenuBar';
import Options from 'Options';

const axios = require('axios');

export default class ServerMenu extends React.Component {
  state = {
    sessions: []
  }
  rescanInterval = null;
  componentDidMount() {
    this.rescanInterval = window.setInterval(async () => {
      var data = (await axios.get(Options.get('server').url + '/sessions')).data;
      this.setState({ sessions: data });
    }, 2500);
  }
  componentWillUnmount() {
    window.clearInterval(this.rescanInterval);
  }
  render() {
    return (
      <>
        <MenuBar />
      </>
    );
  }
}