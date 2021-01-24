import React from 'react';

import { AiOutlineOrderedList } from 'react-icons/ai';
//import { FaArrowLeft } from 'react-icons/fa';
import { Box, Flex, Text, Button } from 'rebass';
import ImportModal from 'components/ImportModal';
import ExportModal from 'components/ExportModal';

export default class NotationViewer extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: false,
    openModal: false,
    modalMode: 'import',
    internalMetadataArr: [],
    internalNotationArr: [],
    internalCurrentNotationArr: []
  };
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = (window.innerWidth > window.screen.width ? window.screen.width : window.innerWidth) - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
    if(prevProps.notation !== this.props.notation) {
      var arr = this.props.notation.replace(/\r\n/g, '\n').split('\n');
      this.setState({
        internalMetadataArr: arr.filter(e => e.includes('[') && e !== '').slice(),
        internalNotationArr: arr.filter(e => !e.includes('[') && e !== '').slice()
      });
    }
    if(prevProps.currentNotation !== this.props.currentNotation) {
      var arr = this.props.currentNotation.replace(/\r\n/g, '\n').split('\n'); // eslint-disable-line no-redeclare
      this.setState({
        internalCurrentNotationArr: arr.filter(e => !e.includes('[') && e !== '').slice()
      });
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
            {this.state.internalNotationArr.map((e) => {
              var actionNumber = Number(e.match(/^(\d+)./)[1]);
              var whiteMoves = [];
              var blackMoves = [];
              var arr = e.replace(/^\d+./,'').split('/');
              for(var i = 0;i < arr.length;i++) {
                var tmpStr = arr[i];
                tmpStr = tmpStr.replace(/\(~T-?\d*\)/g, '');
                tmpStr = tmpStr.replace(/\(>L-?\d*\)/g, '');
                tmpStr = tmpStr.replace(/\s+/g, ' ');
                tmpStr = tmpStr.trim();
                if(i % 2 === 0) {
                  whiteMoves = tmpStr.split(' ');
                }
                else {
                  blackMoves = tmpStr.split(' ');
                }
              }
              return (
                <Flex
                  m={2}
                  key={'n_' + actionNumber}
                  fontSize={1}
                >
                  <Box p={1} mx={1} h={1}>
                    <Text fontWeight='bold'>{actionNumber}.</Text>
                  </Box>
                  {whiteMoves.map((e2, i2) => {
                    return (
                      <Button
                        color={'black'}
                        bg={'white'}
                        p={1}
                        mx={1}
                        h={1}
                        key={'w' + actionNumber + '_' + i2}
                        onClick={() => {
                          var str = '';
                          for(var i = 0;i < this.state.internalMetadataArr.length;i++) {
                            str += this.state.internalMetadataArr[i] + '\n';
                          }
                          var prevNotation = this.state.internalNotationArr.filter((e, i) => i < actionNumber - 1);
                          for(var i = 0;i < prevNotation.length;i++) { // eslint-disable-line no-redeclare
                            str += prevNotation[i] + '\n';
                          }
                          str += actionNumber + '. ';
                          for(var i = 0;i <= i2;i++) { // eslint-disable-line no-redeclare
                            str += whiteMoves[i] + ' ';
                          }
                          if(typeof this.props.onNotationClick === 'function') {
                            this.props.onNotationClick(str);
                          }
                        }}
                      >
                        <span>{e2}</span>
                      </Button>
                    );
                  })}
                  {blackMoves.length > 0 ?
                    <Box p={1} mx={1/2} h={1}>
                      <Text fontWeight='bold'>/</Text>
                    </Box>
                  :
                    <></>
                  }
                  {blackMoves.map((e2, i2) => {
                    return (
                      <Button
                        color={'white'}
                        bg={'black'}
                        p={1}
                        mx={1}
                        h={1}
                        key={'b' + actionNumber + '_' + i2}
                        onClick={() => {
                          var str = '';
                          for(var i = 0;i < this.state.internalMetadataArr.length;i++) {
                            str += this.state.internalMetadataArr[i] + '\n';
                          }
                          var prevNotation = this.state.internalNotationArr.filter((e, i) => i < actionNumber - 1);
                          for(var i = 0;i < prevNotation.length;i++) { // eslint-disable-line no-redeclare
                            str += prevNotation[i] + '\n';
                          }
                          str += actionNumber + '. ';
                          for(var i = 0;i < whiteMoves.length;i++) { // eslint-disable-line no-redeclare
                            str += whiteMoves[i] + ' ';
                          }
                          str += '/ ';
                          for(var i = 0;i <= i2;i++) { // eslint-disable-line no-redeclare
                            str += blackMoves[i] + ' ';
                          }
                          if(typeof this.props.onNotationClick === 'function') {
                            this.props.onNotationClick(str);
                          }
                        }}
                      >
                        <span>{e2}</span>
                      </Button>
                    );
                  })}
                </Flex>
              );
              /*Old notation code
              return (e.length > 0 ?
                <Flex
                  p={2}
                  m={2}
                  color={e.includes('w.') ? 'black' : 'white'}
                  bg={e.includes('w.') ? 'white' : 'black'}
                  key={i}
                  onClick={() => {
                    var str = '';
                    var notation = this.props.notation.replace(/\r\n/g, '\n').replace(/\s*;\s*\s?/g, '\n').split('\n');
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
                      var currentNotation = this.props.currentNotation.replace(/\r\n/g, '\n').replace(/\s*;\s*\s?/g, '\n').split('\n').filter(e => !e.includes('[') && e !== '');
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
              */
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
