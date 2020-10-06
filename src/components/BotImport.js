import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { Textarea } from '@rebass/forms';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css'

export default class BotImport extends React.Component {
  state = {
    open: true
  };
  render() {
    return (
      <>
        <Modal
          isOpen={this.state.open}
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
            <Text p={2} fontWeight='bold'>Import Bot</Text>
            <Box mx='auto' />
          </Flex>
          <Flex width={1} px={2} py={5} sx={{height: '100%'}}>
              <Flex width={1} sx={{height: '100%'}}>
                <Box width={1/2} px={2} sx={{height: '100%'}}>
                  <Textarea
                    id='importBox'
                    width={1}
                    sx={{height: '100%'}}
                    fontSize={[ 1, 2, 3 ]}
                    defaultValue={this.props.value}
                  />
                </Box>
                <Box width={1/2} sx={{height: '100%'}} px={2}>
                  <FilePond
                    onupdatefiles={(files) => {
                      if(files.length > 0) {
                        files[0].file.text().then((input) => {
                          if(typeof this.props.onImport === 'function') { this.props.onImport(input); }
                          this.setState({open: false});
                        });
                      }
                    }}
                    maxFiles={1}
                  />
                </Box>
              </Flex>
          </Flex>
          <Flex
            p={2}
            alignItems='center'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <Button m={1} variant='primary'
              onClick={() => {
                var input = document.getElementById('importBox').value;
                if(typeof this.props.onImport === 'function') { this.props.onImport(input); }
                this.setState({open: false});
              }}
            >
              Import
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
}
