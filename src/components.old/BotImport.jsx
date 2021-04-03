import React from 'react';

import {Controlled as CodeMirror} from 'react-codemirror2';
import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/mode/javascript/javascript');

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
            <Text p={2} fontWeight='bold'>{this.props.title ?
              this.props.title
            :
              'Import Bot'
            }</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{height: '100%'}}>       
            <Box width={1} p={2} height='100%'>
              <Box my={2} width={1} sx={{
                borderWidth: '1px',
                borderColor: '#4f4f4f',
                borderStyle: 'solid',
                fontSize: '12pt',
                height: '80%'
              }}>
                <CodeMirror
                  value={this.props.value}
                  onBeforeChange={(e, d, v) => {
                    if(typeof this.props.onChange === 'function') {
                      this.props.onChange(v);
                    }
                  }}
                  options={{
                    mode: 'javascript',
                    theme: 'mdn-like'
                  }}
                />
              </Box>
              <Box my={2} width={1} height='20%'>
                <FilePond
                  maxFiles={1}
                  onupdatefiles={(files) => {
                    if(files.length > 0) {
                      files[0].file.text().then((input) => {    
                        if(typeof this.props.onChange === 'function') {
                          this.props.onChange(input);
                        }
                      });
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Flex
            p={2}
            alignItems='center'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <Button m={1} variant='primary'
              onClick={() => {
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
