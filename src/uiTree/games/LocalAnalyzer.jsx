import React from 'react';
import { withRouter } from 'react-router';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import GamePlayer from 'components/GamePlayer';
import LinkButton from 'components/LinkButton';
import ImportBox from 'components/ImportBox';
import { decompressLink } from 'components/LinkCompression';

class LocalAnalyzer extends React.Component {
  state = {
    tmpImport: '',
    import: '',
    variant: 'standard',
    open: true
  };
  componentDidMount() {
    this.setState({import: decompressLink(window.location.href) });
  }
  render() {
    return (
      <>
        <Modal
          isOpen={this.state.open && ((typeof this.state.import === 'string' && this.state.import.length <= 0) || typeof this.state.import !== 'string')}
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
            sx={{position: 'absolute', top: 0, zIndex: 100}}
          >
            <Text p={2} fontWeight='bold'>Settings</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={2} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <Flex>
              <Text p={2} fontWeight='bold'>Variant</Text>
              <Select
                value={this.state.variant}
                onChange={(e) => { this.setState({variant: e.target.value}); }}
              >
                <MenuItem value='standard'>Standard</MenuItem>
                <MenuItem value='defended pawn'>Defended Pawn</MenuItem>
                <MenuItem value='half reflected'>Half Reflected</MenuItem>
                <MenuItem value='princess'>Princess</MenuItem>
                <MenuItem value='turn zero'>Turn Zero</MenuItem>
              </Select>
            </Flex>
            <Text p={2} fontWeight='bold'>Import</Text>
            <ImportBox value={this.state.tmpImport} onChange={(v) => { this.setState({ tmpImport: v }); }} />
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
              to='/local'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
            <Button m={1} variant='primary' onClick={() => {
              this.setState({open: false});
              if(this.state.tmpImport.length > 0) {
                this.setState({ import: this.state.tmpImport });
              }
            }}>Start</Button>
          </Flex>
        </Modal>
        <GamePlayer
          canImport
          canAnalyze
          canControlWhite
          canControlBlack
          defaultImport={this.state.import}
          variant={this.state.variant}
        />
      </>
    );
  }
}

export default withRouter(LocalAnalyzer);
