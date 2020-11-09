import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import BlackBishop from 'assets/bB.svg';
import BlackKnight from 'assets/bN.svg';
import BlackRook from 'assets/bR.svg';
import BlackQueen from 'assets/bQ.svg';
import WhiteBishop from 'assets/wB.svg';
import WhiteKnight from 'assets/wN.svg';
import WhiteRook from 'assets/wR.svg';
import WhiteQueen from 'assets/wQ.svg';

export default class Promotion extends React.Component {
  render() {
    return (
      <>
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
            <Text p={2} fontWeight='bold'>
              Promotion
            </Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{height: '100%'}}>
              {typeof this.props.moveObj !== 'undefined' && this.props.moveObj.player === 'white' ?
                <>
                  <img src={WhiteQueen} alt='White Queen' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      if(this.props.moveObj.promotion === 'Q') {
                        this.props.onPromote('Q');
                      }
                      else {
                        this.props.onPromote('P');
                      }
                    }
                  }}/>
                  <img src={WhiteRook} alt='White Rook' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      this.props.onPromote('R');
                    }
                  }}/>
                  <img src={WhiteBishop} alt='White Bishop' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      this.props.onPromote('B');
                    }
                  }}/>
                  <img src={WhiteKnight} alt='White Knight' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      this.props.onPromote('N');
                    }
                  }}/>
                </>
              :
                <>
                  <img src={BlackQueen} alt='Black Queen' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      if(this.props.moveObj.promotion === 'Q') {
                        this.props.onPromote('Q');
                      }
                      else {
                        this.props.onPromote('P');
                      }
                    }
                  }}/>
                  <img src={BlackRook} alt='Black Rook' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      this.props.onPromote('R');
                    }
                  }}/>
                  <img src={BlackBishop} alt='Black Bishop' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      this.props.onPromote('B');
                    }
                  }}/>
                  <img src={BlackKnight} alt='Black Knight' width='25%' onClick={() => {
                    if(typeof this.props.onPromote === 'function') {
                      this.props.onPromote('N');
                    }
                  }}/>
                </>
              }
          </Box>
          <Flex
            p={2}
            alignItems='center'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <Button m={1} variant='secondary'
              onClick={() => {
                if(typeof this.props.onClose === 'function') {
                  this.props.onClose();
                }
              }}
            >
              Back
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
}
