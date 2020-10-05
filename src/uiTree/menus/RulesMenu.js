import React, {lazy, Suspense} from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';

import { importMDX } from 'mdx.macro';
const RulesText = lazy(() => importMDX('../../components/RulesText.mdx'));

export default class RulesMenu extends React.Component {
  render() {
    return (
      <>
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
        >
          <img src={LogoIcon} alt='Logo' />
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
        </Flex>
        <Modal
          isOpen={true}
          style={{content: {padding: '0px'}}}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            width={1}
            sx={{position: 'absolute', top: 0}}
          >
            <Text p={2} fontWeight='bold'>Rules</Text>
            <Box mx='auto' />
          </Flex>
          <Flex width={1} px={2} py={5} sx={{height: '100%'}}>
            <Suspense fallback={<div>Loading...</div>}>
              <RulesText />
            </Suspense>
          </Flex>
          <Flex
            p={2}
            alignItems='center'
            sx={{position: 'absolute', bottom: 0, width: '100%'}}
          >
            <Box mx='auto' />
            <LinkButton
              to='/'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
          </Flex>
        </Modal>
      </>
    );
  }
}
