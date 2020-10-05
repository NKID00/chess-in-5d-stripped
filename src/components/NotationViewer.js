import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import { Textarea } from '@rebass/forms';
import copy from 'copy-to-clipboard';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css'

const fileDownload = require('js-file-download');

export default class NotationViewer extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state={
    open: false,
    openModal: false,
    modalMode: 'import'
  };
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = this.buttonRef.current.getBoundingClientRect().right - this.boxRef.current.getBoundingClientRect().width + 'px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
  }
  render() {
    return (
      <>
        <Modal
          isOpen={this.state.openModal}
          style={{content: {padding: '0px'}}}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            sx={{position: 'absolute', top: 0, width: '100%'}}
          >
            <Text p={2} fontWeight='bold'>{this.state.modalMode.substr(0,1).toUpperCase() + this.state.modalMode.substr(1)}</Text>
            <Box mx='auto' />
          </Flex>
          <Flex width={1} px={2} py={5} sx={{height: '100%'}}>
            {this.state.modalMode === 'import' ?
              <Flex width={1} sx={{height: '100%'}}>
                <Box width={1/2} px={2} sx={{height: '100%'}}>
                  <Textarea
                    id='importBox'
                    width={1}
                    sx={{height: '100%'}}
                    fontSize={[ 1, 2, 3 ]}
                  >
                  </Textarea>
                </Box>
                <Box width={1/2} height={1} px={2}>
                  <FilePond
                    onupdatefiles={(files) => {
                      if(files.length > 0) {
                        files[0].file.text().then((input) => {
                          if(typeof this.props.onImport === 'function') { this.props.onImport(input); }
                          this.setState({openModal: false});
                        });
                      }
                    }}
                    maxFiles={1}
                  />
                </Box>
              </Flex>
            :
              <Text as='pre' fontSize={[ 1, 2, 3 ]}>
                {this.props.notation}
              </Text>
            }
          </Flex>
          <Flex
            p={2}
            alignItems='center'
            sx={{position: 'absolute', bottom: 0, width: '100%'}}
          >
            <Box mx='auto' />
            <Button m={1} variant='primary' onClick={() => { this.setState({openModal: false}); }}>Close</Button>
            {this.state.modalMode === 'export' ?
              <Button m={1} variant='primary'
                onClick={() => {
                  copy(this.props.notation);
                  this.setState({openModal: false});
                }}
              >
                Copy to clipboard
              </Button>
            :
              <></>
            }
            <Button m={1} variant='primary'
              onClick={() => {
                if(this.state.modalMode === 'import') {
                  var input = document.getElementById('importBox').value;
                  if(typeof this.props.onImport === 'function') { this.props.onImport(input); }
                }
                else {
                  fileDownload(this.props.notation, '5d-chess-' + (Date.now()) + '.txt');
                }
                this.setState({openModal: false});
              }}
            >
              {this.state.modalMode.substr(0,1).toUpperCase() + this.state.modalMode.substr(1)}
            </Button>
          </Flex>
        </Modal>
        <Button
          ref={this.buttonRef}
          variant='primary'
          onClick={() => {
            this.setState({open: !this.state.open});
          }}
        >
          View Notation
        </Button>
        {typeof this.props.notation === 'string' && this.state.open ?
          <Box
            ref={this.boxRef}
            p={2}
            width={[1/2,1/3,1/4,1/5]}
            bg='grey'
          >
            <Box sx={{maxHeight: '65vh'}}>
              {this.props.notation.replace(/\r\n/g, '\n').split('\n').map((e) => {
                return (e.length > 0 ?
                  <Box
                    p={2}
                    m={2}
                    color={e.includes('w.') ? 'black' : 'white'}
                    bg={e.includes('w.') ? 'white' : 'black'}
                    key={e}
                  >
                    <Text p={1} fontWeight='bold'>{e}</Text>
                  </Box>
                :
                  null
                );
              })}
            </Box>
            <Flex>
              <Box mx='auto' />
              {this.props.canImport ?
                <Button
                  variant='primary'
                  m={1}
                  onClick={() => { this.setState({openModal: true, modalMode: 'import'}); }}
                >
                  Import
                </Button>
              :
                <></>
              }
              <Button
                variant='primary'
                m={1}
                onClick={() => { this.setState({openModal: true, modalMode: 'export'}); }}
              >
                Export
              </Button>
            </Flex>
          </Box>
        :
          <></>
        }
      </>
    );
  }
}
