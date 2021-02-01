import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text } from 'rebass';
import LinkButton from 'components/LinkButton';
import MenuBar from 'components/MenuBar';

import ReactMarkdown from 'react-markdown';
import RulesText from 'components/RulesText.md';

const assets = {
  '1b1e7e6.gif': require('assets/rules/1b1e7e6.gif'),
  '1w1e2e3_submit.gif': require('assets/rules/1w1e2e3_submit.gif'),
  '1w1e2e3.gif': require('assets/rules/1w1e2e3.gif'),
  '2w2Nb1+1+1b3.gif': require('assets/rules/2w2Nb1+1+1b3.gif'),
  '3b2a7a6.gif': require('assets/rules/3b2a7a6.gif'),
  '3w2+1e2e3.gif': require('assets/rules/3w2+1e2e3.gif'),
  '4w3+1Nb3+0b5.gif': require('assets/rules/4w3+1Nb3+0b5.gif'),
  'analyze_feature.gif': require('assets/rules/analyze_feature.gif'),
  'bishop_move.png': require('assets/rules/bishop_move.png'),
  'bot_feature.gif': require('assets/rules/bot_feature.gif'),
  'castling.png': require('assets/rules/castling.png'),
  'import_feature.gif': require('assets/rules/import_feature.gif'),
  'king_move.png': require('assets/rules/king_move.png'),
  'knight_move.png': require('assets/rules/knight_move.png'),
  'pawn_capture.png': require('assets/rules/pawn_capture.png'),
  'pawn_en_passant.png': require('assets/rules/pawn_en_passant.png'),
  'pawn_promote.gif': require('assets/rules/pawn_promote.gif'),
  'queen_move.png': require('assets/rules/queen_move.png'),
  'rook_move.png': require('assets/rules/rook_move.png'),
  'start.gif': require('assets/rules/start.gif')
};

export default class RulesPopup extends React.Component {
  state = {
    text: '### Loading...'
  };
  componentDidMount() {
    fetch(RulesText)
    .then((res) => { return res.text(); })
    .then((text) => { this.setState({text: text}); });
  }
  render() {
    return (
      <>
        <MenuBar />
        <Modal
          isOpen={true}
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
            <Text p={2} fontWeight='bold'>Rules</Text>
            <Box mx='auto' />
          </Flex>
          <Box id='markdown-container' width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <ReactMarkdown
              linkTarget='_blank'
              source={this.state.text}
              transformImageUri={(uri) => {
                return assets[uri];
              }}
            />
            <Box my={3} />
          </Box>
          <Flex
            p={2}
            alignItems='center'
            bg='white'
            width={1}
            sx={{position: 'absolute', bottom: 0}}
          >
            <Box mx='auto' />
            <LinkButton
              to='/tutorial'
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
