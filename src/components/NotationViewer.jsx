import React from 'react';

import { AiOutlineOrderedList } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import { Box, Flex, Text, Button } from 'rebass';
import ImportModal from 'components/ImportModal';
import ExportModal from 'components/ExportModal';

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
        this.boxRef.current.style.left = (window.innerWidth > window.screen.width ? window.screen.width : window.innerWidth) - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
  }
  render() {
    return (
      <>
        <ImportModal
          open={this.state.openModal && this.state.modalMode === 'import'}
          onImport={(v) => {
            if(typeof this.props.onImport === 'function') {
              this.props.onImport(v);
            }
            this.setState({ openModal: false });
          }}
          onClose={() => {
            this.setState({ openModal: false });
          }}
        />
        <ExportModal
          open={this.state.openModal && this.state.modalMode === 'export'}
          notation={this.props.notation}
          onClose={() => {
            this.setState({ openModal: false });
          }}
        />
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
