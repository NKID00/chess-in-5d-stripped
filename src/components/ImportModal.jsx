import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import ImportBox from 'components/ImportBox';

export default class ImportModal extends React.Component {
  state = {
    import: ''
  }
  render() {
    return (
      <Modal
        isOpen={this.props.open}
        style={{
          overlay: {backgroundColor: 'rgba(0,0,0,0)'},
          content: {padding: '0px'}
        }}
      >
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
          sx={{position: 'absolute', top: 0}}
        >
          <Text p={2} fontWeight='bold'>Import</Text>
          <Box mx='auto' />
        </Flex>
        <Box width={1} px={2} py={5} sx={{height: '100%', overflow: 'auto'}}>
          <Flex width={1} sx={{height: '100%'}}>
            <ImportBox value={this.state.import} onChange={(v) => { this.setState({ import: v }); }} />
          </Flex>
        </Box>
        <Flex
          p={2}
          alignItems='center'
          width={1}
          sx={{position: 'absolute', bottom: 0}}
          style={{zIndex: 100}}
        >
          <Box mx='auto' />
          <Button m={1} variant='secondary' 
            onClick={() => { 
              if(typeof this.props.onClose === 'function') {
                this.props.onClose();
              }
            }}
          >
            Close
          </Button>
          <Button m={1} variant='primary'
            onClick={() => {
              if(typeof this.props.onImport === 'function') {
                this.props.onImport(this.state.import);
              }
            }}
          >
            Import
          </Button>
        </Flex>
      </Modal>
    );
  }
}
