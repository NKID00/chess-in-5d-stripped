import React from 'react';

import Modal from 'react-modal';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import { Box, Flex, Text, Button } from 'rebass';
import { Textarea } from '@rebass/forms';
import copy from 'copy-to-clipboard';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const fileDownload = require('js-file-download');

export default class NotationViewer extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: false,
    openModal: false,
    modalMode: 'import'
  };
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = window.innerWidth - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
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
            width={1}
            sx={{position: 'absolute', top: 0}}
          >
            <Text p={2} fontWeight='bold'>{this.state.modalMode.substr(0,1).toUpperCase() + this.state.modalMode.substr(1)}</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{height: '100%'}}>
            {this.state.modalMode === 'import' ?
              <Flex width={1} sx={{height: '100%'}}>
                <Box width={1/2} px={2} sx={{height: '100%'}}>
                  <Textarea
                    id='importBox'
                    width={1}
                    sx={{height: '100%'}}
                    fontSize={[ 1, 2, 3 ]}
                  />
                </Box>
                <Box width={1/2} sx={{height: '100%'}} px={2}>
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
              <Box sx={{height: '100%'}}>
                {typeof this.props.notation === 'string' && this.props.notation.length > 0 ?
                  <>
                    <Text p={2} fontWeight='bold'>Link</Text>
                    <a href={window.location.origin + '/#/local/game/analyze?import=' + this.props.notation.replace(/\n/g, ';').replace(/\s/g, '%20')} target='_blank' rel='noopener noreferrer'>
                      {window.location.origin + '/#/local/game/analyze?import=' + this.props.notation.replace(/\n/g, ';').replace(/\s/g, '%20')}
                    </a>
                    <Box my={1} />
                  </>
                :
                  <></>
                }
                <Text
                  as='pre'
                  fontSize={[ 1, 2, 3 ]}
                  sx={{
                    WebkitTouchCallout: 'text',
                    WebkitUserSelect: 'text',
                    KhtmlUserSelect: 'text',
                    MozUserSelect: 'text',
                    MsUserSelect: 'text',
                    userSelect: 'text',
                    overflowY: 'auto',
                    width: '100%'
                  }}
                >
                  {this.props.notation}
                </Text>
              </Box>
            }
          </Box>
          <Flex
            p={2}
            alignItems='center'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <Button m={1} variant='secondary' onClick={() => { this.setState({openModal: false}); }}>Close</Button>
            {this.state.modalMode === 'export' ?
              <>
                <Button m={1} variant='secondary'
                  onClick={() => {
                    copy(window.location.origin + '/#/local/game/analyze?import=' + this.props.notation.replace(/\n/g, ';').replace(/\s/g, '%20'));
                    this.setState({openModal: false});
                  }}
                >
                  Copy link to clipboard
                </Button>
                <Button m={1} variant='primary'
                  onClick={() => {
                    copy(this.props.notation);
                    this.setState({openModal: false});
                  }}
                >
                  Copy to clipboard
                </Button>
              </>
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
                  fileDownload(this.props.notation, 'chessin5d-' + (Date.now()) + '.c5d');
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
          ml={2}
          px={2}
        >
          <AiOutlineOrderedList size={20} />
        </Button>
        <Box
          ref={this.boxRef}
          p={2}
          width={[1/2,1/3,1/4]}
          bg='grey'
          sx={{display: this.state.open ? 'block' : 'none', maxHeight: '75vh', overflowY: 'auto'}}
        >
          <Box
            sx={{
              maxHeight: '65vh',
              overflowY: 'auto',
              WebkitTouchCallout: 'text',
              WebkitUserSelect: 'text',
              KhtmlUserSelect: 'text',
              MozUserSelect: 'text',
              MsUserSelect: 'text',
              userSelect: 'text'
            }}
          >
            {this.props.notation.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '').map((e) => {
              return (e.length > 0 ?
                <Flex
                  p={2}
                  m={2}
                  color={e.includes('w.') ? 'black' : 'white'}
                  bg={e.includes('w.') ? 'white' : 'black'}
                  key={e}
                  onClick={() => {
                    var str = '';
                    var notation = this.props.notation.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n');
                    for(var i = 0;i < notation.length;i++) {
                      str += notation[i] + '\n';
                      if(e === notation[i] && typeof this.props.onNotationClick === 'function') {
                        this.props.onNotationClick(str);
                      }
                    }
                  }}
                  alignItems='center'
                >
                  <Text p={1} fontWeight='bold'>{e}</Text>
                  <Box mx='auto' />
                  {(() => {
                    if(typeof this.props.currentNotation === 'string'){
                      var currentNotation = this.props.currentNotation.replace(/\r\n/g, '\n').replace(/\s*;\s*/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
                      if(currentNotation.length > 0) {
                        if(currentNotation[currentNotation.length - 1] === e) {
                          return true;
                        }
                      }
                    }
                    return false;
                  })() ?
                    <FaArrowLeft style={{
                      color: (e.includes('w.') ? 'black' : 'white')
                    }} />
                  :
                    <></>
                  }
                </Flex>
              :
                <></>
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
      </>
    );
  }
}
