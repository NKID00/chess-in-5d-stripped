import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button, Link } from 'rebass';
import copy from 'copy-to-clipboard';
import { compressLink } from 'components/LinkCompression';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/addon/mode/simple');
require('components/NotationMode');

const fileDownload = require('js-file-download');

export default class ExportModal extends React.Component {
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
          <Text p={2} fontWeight='bold'>Export</Text>
          <Box mx='auto' />
        </Flex>
        <Box width={1} px={2} py={5} sx={{height: '100%', overflow: 'auto'}}>
          <Text p={2} fontWeight='bold'>Link</Text>
          <Box px={4}>
            <Link href={compressLink(this.props.notation)} target='_blank' rel='noopener noreferrer' sx={{ wordWrap: 'break-word' }}>
              {compressLink(this.props.notation)}
            </Link>
          </Box>
          <Box py={2} />
          <Text p={2} fontWeight='bold'>Text</Text>
          <Box width={1} p={2} height='100%'>
            <Box my={2} width={1} sx={{
              borderWidth: '1px',
              borderColor: '#4f4f4f',
              borderStyle: 'solid',
              fontSize: '14pt',
              height: '80%'
            }}>
              <CodeMirror
                value={this.props.notation}
                options={{
                  mode: 'notation',
                  theme: 'mdn-like'
                }}
              />
            </Box>
          </Box>
        </Box>
        <Flex
          p={2}
          alignItems='center'
          width={1}
          bg='white'
          sx={{position: 'absolute', bottom: 0, zIndices: 100}}
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
          <Button m={1} variant='secondary'
            onClick={() => {
              copy(compressLink(this.props.notation));
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
          <Button m={1} variant='primary'
            onClick={() => {
              fileDownload(this.props.notation, 'chessin5d-' + (Date.now()) + '.5dpgn');
            }}
          >
            Export
          </Button>
        </Flex>
      </Modal>
    );
  }
}
