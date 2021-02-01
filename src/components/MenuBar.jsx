import React from 'react';

import { Box, Flex, Text } from 'rebass';
import LogoIcon from 'assets/logo.svg';

export default class MenuBar extends React.Component {
  render() {
    return (
      <Flex
        p={2}
        color='white'
        bg='black'
        alignItems='center'
        width={1}
      >
        <img src={LogoIcon} alt='Logo' onClick={() => { window.location.href = window.location.origin; }} />
        <Text p={2} fontWeight='bold' onClick={() => { window.location.href = window.location.origin; }}>Chess in 5D</Text>
        <Box mx='auto' />
      </Flex>
    );
  }
}