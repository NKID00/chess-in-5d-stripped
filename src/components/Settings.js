import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { BsGear } from 'react-icons/bs';

const defaultPalette = {
  background: 0x000000,
  whiteSquare: 0xaaaaaa,
  blackSquare: 0x555555,
  selectedPiece: 0x0000ff,
  moveHighlight: 0x00ff00,
  captureHighlight: 0xff0000,
  checkSourceHighlight: 0xff0000,
  checkDestinationHighlight: 0xff0000,
  whiteBoardOutline: 0xdddddd,
  blackBoardOutline: 0x222222,
  checkBoardOutline: 0xff0000,
  inactiveBoardOutline: 0x777777
};

export default class Settings extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: false,
    boardShow: 'both',
    allowRecenter: true
  };
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = window.innerWidth - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
    if(prevState.boardShow !== this.state.boardShow) {
      if(typeof this.props.onChange === 'function') {
        this.props.onChange({
          boardShow: this.state.boardShow,
          palette: Object.assign(Object.assign({}, defaultPalette), {

          }),
          allowRecenter: this.state.allowRecenter
        });
      }
    }
  }
  render() {
    return (
      <>
        <Button
          ref={this.buttonRef}
          variant='primary'
          onClick={() => {
            this.setState({open: !this.state.open});
          }}
          justifyContent='center'
          alignItems='center'
          px={2}
          ml={2}
        >
          <BsGear size={20} />
        </Button>
        <Box
          ref={this.boxRef}
          p={2}
          width={[1/2,1/3,1/4]}
          bg='white'
          color='black'
          sx={{display: this.state.open ? 'block' : 'none', maxHeight: '65vh', overflowY: 'auto'}}
        >
          <Flex>
            <Text p={2} fontWeight='bold'>Show Board</Text>
            <Select
              value={this.state.boardShow}
              onChange={(e) => {
                if(e.target.value !== 'both') {
                  this.setState({allowRecenter: false});
                }
                this.setState({boardShow: e.target.value});
              }}
            >
              <MenuItem value='white'>White</MenuItem>
              <MenuItem value='black'>Black</MenuItem>
              <MenuItem value='both'>Both</MenuItem>
            </Select>
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Automatic Recenter</Text>
            <Checkbox color='primary' checked={this.state.allowRecenter} onChange={(e) => { this.setState({allowRecenter: e.target.checked}); }} />
          </Flex>
        </Box>
      </>
    );
  }
}
