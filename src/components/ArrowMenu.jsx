import React from 'react';

import { Box, Flex, Text, Button } from 'rebass';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { BsPen, BsTrash } from 'react-icons/bs';
import Options from 'Options';
import { BiBorderAll } from 'react-icons/bi';

const deepcompare = require('deep-equal');

export default class Settings extends React.Component {
  buttonRef = React.createRef();
  boxRef = React.createRef();
  state = {
    open: false,
    active: false,
    selected: '1'
  };
  shortcutsDown(e) {

  }
  shortcutsUp(e) {

  }
  componentDidMount() {
    this.shortcuts = this.shortcuts.bind(this);
    window.addEventListener('keydown', this.shortcuts);
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.open !== this.state.open) {
      if(this.boxRef.current !== null && this.buttonRef.current !== null) {
        this.boxRef.current.style.position = 'absolute';
        this.boxRef.current.style.left = (window.innerWidth > window.screen.width ? window.screen.width : window.innerWidth) - 13 - this.boxRef.current.getBoundingClientRect().width + 'px';
        this.boxRef.current.style.top = this.buttonRef.current.getBoundingClientRect().bottom + 13 + 'px';
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.shortcuts);
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
          <BsPen size={20} />
        </Button>
        <Box
          ref={this.boxRef}
          p={2}
          width={[1/2,1/3,1/4]}
          bg='white'
          color='black'
          sx={{display: this.state.open ? 'block' : 'none'}}
        >
          <Flex>
            <Box width={1/5} p={1}>
              <Button
                width={1}
                sx={{
                  height: '5vh',
                  backgroundColor: '#' + (Options.get('palette').drawArrow1+0x1000000).toString(16).substr(1).toUpperCase(),
                  border: this.state.active && this.state.selected === '1' ? 'black 0.5vh solid' : 'none'
                }}
                onClick={() => {
                  if(this.state.active) {
                    if(this.state.selected === '1') {
                      this.setState({ active: false });
                      if(typeof this.props.onArrowOff === 'function') {
                        this.props.onArrowOff();
                      }
                    }
                    else {
                      this.setState({ selected: '1' });
                      if(typeof this.props.onArrowOn === 'function') {
                        this.props.onArrowOn('1');
                      }
                    }
                  }
                  else {
                    this.setState({ active: true, selected: '1' });
                    if(typeof this.props.onArrowOn === 'function') {
                      this.props.onArrowOn('1');
                    }
                  }
                }}
              />
            </Box>
            <Box width={1/5} p={1}>
              <Button
                width={1}
                sx={{
                  height: '5vh',
                  backgroundColor: '#' + (Options.get('palette').drawArrow2+0x1000000).toString(16).substr(1).toUpperCase(),
                  border: this.state.active && this.state.selected === '2' ? 'black 0.5vh solid' : 'none'
                }}
                onClick={() => {
                  if(this.state.active) {
                    if(this.state.selected === '2') {
                      this.setState({ active: false });
                      if(typeof this.props.onArrowOff === 'function') {
                        this.props.onArrowOff();
                      }
                    }
                    else {
                      this.setState({ selected: '2' });
                      if(typeof this.props.onArrowOn === 'function') {
                        this.props.onArrowOn('2');
                      }
                    }
                  }
                  else {
                    this.setState({ active: true, selected: '2' });
                    if(typeof this.props.onArrowOn === 'function') {
                      this.props.onArrowOn('2');
                    }
                  }
                }}
              />
            </Box>
            <Box width={1/5} p={1}>
              <Button
                width={1}
                sx={{
                  height: '5vh',
                  backgroundColor: '#' + (Options.get('palette').drawArrow3+0x1000000).toString(16).substr(1).toUpperCase(),
                  border: this.state.active && this.state.selected === '3' ? 'black 0.5vh solid' : 'none'
                }}
                onClick={() => {
                  if(this.state.active) {
                    if(this.state.selected === '3') {
                      this.setState({ active: false });
                      if(typeof this.props.onArrowOff === 'function') {
                        this.props.onArrowOff();
                      }
                    }
                    else {
                      this.setState({ selected: '3' });
                      if(typeof this.props.onArrowOn === 'function') {
                        this.props.onArrowOn('3');
                      }
                    }
                  }
                  else {
                    this.setState({ active: true, selected: '3' });
                    if(typeof this.props.onArrowOn === 'function') {
                      this.props.onArrowOn('3');
                    }
                  }
                }}
              />
            </Box>
            <Box width={1/5} p={1}>
              <Button
                width={1}
                sx={{
                  height: '5vh',
                  backgroundColor: '#' + (Options.get('palette').drawArrow4+0x1000000).toString(16).substr(1).toUpperCase(),
                  border: this.state.active && this.state.selected === '4' ? 'black 0.5vh solid' : 'none'
                }}
                onClick={() => {
                  if(this.state.active) {
                    if(this.state.selected === '4') {
                      this.setState({ active: false });
                      if(typeof this.props.onArrowOff === 'function') {
                        this.props.onArrowOff();
                      }
                    }
                    else {
                      this.setState({ selected: '4' });
                      if(typeof this.props.onArrowOn === 'function') {
                        this.props.onArrowOn('4');
                      }
                    }
                  }
                  else {
                    this.setState({ active: true, selected: '4' });
                    if(typeof this.props.onArrowOn === 'function') {
                      this.props.onArrowOn('4');
                    }
                  }
                }}
              />
            </Box>
            <Box width={1/5} p={1}>
              <Button
                width={1}
                variant='primary'
                sx={{
                  height: '5vh',
                }}
                onClick={() => {
                  if(typeof this.props.onArrowClear === 'function') {
                    this.props.onArrowClear();
                  }
                }}
                px={2}
                justifyContent='center'
                alignItems='center'
              >
                <BsTrash size={20} />
              </Button>
            </Box>
          </Flex>
        </Box>
      </>
    );
  }
}
