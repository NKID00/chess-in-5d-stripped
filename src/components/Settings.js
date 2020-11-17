import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { BsGear } from 'react-icons/bs';

const deepcompare = require('deep-equal');

export default class Settings extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: false,
    boardShow: 'both',
    allowRecenter: true,
    moveShow: 'timeline',
    flip: false,
    timelineLabel: true,
    turnLabel: true,
    boardLabel: false,
    showCheckGhost: true
  };
  componentDidMount() {
    if(typeof this.props.value === 'object') {
      this.setState(this.props.value);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = (window.innerWidth > window.screen.width ? window.screen.width : window.innerWidth) - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
    if(
      prevState.boardShow !== this.state.boardShow ||
      prevState.allowRecenter !== this.state.allowRecenter ||
      prevState.moveShow !== this.state.moveShow ||
      prevState.flip !== this.state.flip ||
      prevState.timelineLabel !== this.state.timelineLabel ||
      prevState.turnLabel !== this.state.turnLabel ||
      prevState.boardLabel !== this.state.boardLabel ||
      prevState.showCheckGhost !== this.state.showCheckGhost
    ) {
      if(typeof this.props.onChange === 'function') {
        this.props.onChange({
          boardShow: this.state.boardShow,
          allowRecenter: this.state.allowRecenter,
          moveShow: this.state.moveShow,
          flip: this.state.flip,
          timelineLabel: this.state.timelineLabel,
          turnLabel: this.state.turnLabel,
          boardLabel: this.state.boardLabel,
          showCheckGhost: this.state.showCheckGhost
        });
      }
    }
    if(!deepcompare(prevProps.value, this.props.value)) {
      this.setState(this.props.value);
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
            <Checkbox
              color='primary'
              checked={this.state.allowRecenter}
              onChange={(e) => { this.setState({allowRecenter: e.target.checked}); }}
            />
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Show Move</Text>
            <Select
              value={this.state.moveShow}
              onChange={(e) => { this.setState({moveShow: e.target.value}); }}
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='timeline'>Timeline Only</MenuItem>
              <MenuItem value='none'>None</MenuItem>
            </Select>
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Flip Board</Text>
            <Checkbox
              color='primary'
              checked={this.state.flip}
              onChange={(e) => { this.setState({flip: e.target.checked}); }}
            />
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Show Check Boards</Text>
            <Checkbox
              color='primary'
              checked={this.state.showCheckGhost}
              onChange={(e) => { this.setState({showCheckGhost: e.target.checked}); }}
            />
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Timeline Labels</Text>
            <Checkbox
              color='primary'
              checked={this.state.timelineLabel}
              onChange={(e) => { this.setState({timelineLabel: e.target.checked}); }}
            />
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Turn Labels</Text>
            <Checkbox
              color='primary'
              checked={this.state.turnLabel}
              onChange={(e) => { this.setState({turnLabel: e.target.checked}); }}
            />
          </Flex>
          <Flex>
            <Text p={2} fontWeight='bold'>Board Labels</Text>
            <Checkbox
              color='primary'
              checked={this.state.boardLabel}
              onChange={(e) => { this.setState({boardLabel: e.target.checked}); }}
            />
          </Flex>
        </Box>
      </>
    );
  }
}
