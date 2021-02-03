import React from 'react';

import Modal from 'react-modal';
import { Box, Flex, Text, Button } from 'rebass';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import ClockDisplay from 'components/ClockDisplay';
import LinkButton from 'components/LinkButton';
import GamePlayer from 'components/GamePlayer';

export default class TimedGamePlayer extends React.Component {
  gameRef = React.createRef();
  state = {
    start: false,
    ended: false,
    timed: true,
    startingDuration: 10*60,
    perActionFlatIncrement: 0,
    perActionTimelineIncrement: 5,
    whiteDurationLeft: 0,
    blackDurationLeft: 0,
    winner: '',
    variant: 'standard',
    variantLoaded: false
  };
  lastUpdate = Date.now();
  update() {
    if(this.state.start && this.gameRef.current && this.state.timed) {
      if(!this.gameRef.current.state.loading) {
        if((this.gameRef.current.chess.player) === 'white') {
          this.setState({
            whiteDurationLeft: this.state.whiteDurationLeft - (Date.now() - this.lastUpdate)/1000
          });
        }
        else {
          this.setState({
            blackDurationLeft: this.state.blackDurationLeft - (Date.now() - this.lastUpdate)/1000
          });
        }
      }
      this.lastUpdate = Date.now();
      window.setTimeout(this.update.bind(this), 1000);
    }
  }
  componentDidMount() {
    if(typeof this.props.start === 'boolean' && this.state.start !== this.props.start) {
      this.setState({ start: this.props.start });
    }
    if(typeof this.props.ended === 'boolean' && this.state.ended !== this.props.ended) {
      this.setState({ ended: this.props.ended });
    }
    if(typeof this.props.timed === 'boolean' && this.state.timed !== this.props.timed) {
      this.setState({ timed: this.props.timed });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(!prevState.start && this.state.start) {
      this.lastUpdate = Date.now();
      this.update();
    }
    if(this.state.start && this.state.timed) {
      if(this.state.whiteDurationLeft <= 0) {
        this.setState({
          start: false,
          ended: true,
          winner: 'black',
          whiteDurationLeft: 0
        });
      }
      if(this.state.blackDurationLeft <= 0) {
        this.setState({
          start: false,
          ended: true,
          winner: 'white',
          blackDurationLeft: 0
        });
      }
    }
    if(prevProps.timed !== this.props.timed) {
      this.setState({ timed: this.props.timed });
    }
    if(prevProps.startingDuration !== this.props.startingDuration) {
      this.setState({ startingDuration: this.props.startingDuration });
    }
    if(prevProps.perActionFlatIncrement !== this.props.perActionFlatIncrement) {
      this.setState({ perActionFlatIncrement: this.props.perActionFlatIncrement });
    }
    if(prevProps.perActionTimelineIncrement !== this.props.perActionTimelineIncrement) {
      this.setState({ perActionTimelineIncrement: this.props.perActionTimelineIncrement });
    }
    if(prevProps.whiteDurationLeft !== this.props.whiteDurationLeft) {
      this.setState({ whiteDurationLeft: this.props.whiteDurationLeft });
    }
    if(prevProps.blackDurationLeft !== this.props.blackDurationLeft) {
      this.setState({ blackDurationLeft: this.props.blackDurationLeft });
    }
    if(prevProps.blackDurationLeft !== this.props.blackDurationLeft) {
      this.setState({ blackDurationLeft: this.props.blackDurationLeft });
    }
    if(prevProps.start !== this.props.start && typeof this.props.start === 'boolean') {
      this.setState({ start: this.props.start });
    }
    if(prevProps.ended !== this.props.ended && typeof this.props.ended === 'boolean') {
      this.setState({ ended: this.props.ended });
    }
  }
  render() {
    return (
      <>
        <Modal
          isOpen={!this.state.start && !this.state.ended}
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
          <Box width={1} px={2} py={5} sx={{overflow: 'auto', height: '100%'}}>
            {this.props.modalChildren}
            {!this.props.hideAll ?
              <>
                <Flex>
                  <Text p={2} fontWeight='bold'>Variant</Text>
                  <Select
                    value={this.props.variant ? this.props.variant : this.state.variant}
                    disabled={this.props.disableVariant}
                    onChange={(e) => { this.setState({variant: e.target.value, variantLoaded: false }); }}
                  >
                    <MenuItem value='standard'>Standard</MenuItem>
                    <MenuItem value='defended pawn'>Defended Pawn</MenuItem>
                    <MenuItem value='half reflected'>Half Reflected</MenuItem>
                    <MenuItem value='princess'>Princess</MenuItem>
                    <MenuItem value='turn zero'>Turn Zero</MenuItem>
                  </Select>
                </Flex>
                <Flex>
                  <Text p={2} fontWeight='bold'>Timed Game</Text>
                  <Checkbox color='primary'
                    checked={this.state.timed}
                    disabled={this.props.disableTimed}
                    onChange={(e) => { this.setState({timed: e.target.checked}); }}
                  />
                </Flex>
                {this.state.timed ?
                  <>
                    <Text p={2} fontWeight='bold'>Initial Duration</Text>
                    <Flex>
                      <Box width={[1/2, 1/3, 1/4]} p={2}>
                        <TextField
                          fullWidth
                          label='Minutes'
                          type='number'
                          disabled={this.props.disableTimed}
                          value={Math.floor(this.state.startingDuration/60)}
                          onChange={(e) => {
                            this.setState({ startingDuration: Number(e.target.value) * 60 + (this.state.startingDuration % 60) });
                          }}
                        />
                      </Box>
                      <Box width={[1/2, 1/3, 1/4]} p={2}>
                        <TextField
                          fullWidth
                          label='Seconds'
                          type='number'
                          disabled={this.props.disableTimed}
                          value={this.state.startingDuration % 60}
                          onChange={(e) => {
                            this.setState({ startingDuration: Number(e.target.value) + Math.floor(this.state.startingDuration/60) * 60 });
                          }}
                        />
                      </Box>
                    </Flex>
                    <Text p={2} fontWeight='bold'>Per Action Increment (Flat)</Text>
                    <Flex>
                      <Box width={[1/2, 1/3, 1/4]} p={2}>
                        <TextField
                          fullWidth
                          label='Minutes'
                          type='number'
                          disabled={this.props.disableTimed}
                          value={Math.floor(this.state.perActionFlatIncrement/60)}
                          onChange={(e) => {
                            this.setState({ perActionFlatIncrement: Number(e.target.value) * 60 + (this.state.perActionFlatIncrement % 60) });
                          }}
                        />
                      </Box>
                      <Box width={[1/2, 1/3, 1/4]} p={2}>
                        <TextField
                          fullWidth
                          label='Seconds'
                          type='number'
                          disabled={this.props.disableTimed}
                          value={this.state.perActionFlatIncrement % 60}
                          onChange={(e) => {
                            this.setState({ perActionFlatIncrement: Number(e.target.value) + Math.floor(this.state.perActionFlatIncrement/60) * 60 });
                          }}
                        />
                      </Box>
                    </Flex>
                    <Text p={2} fontWeight='bold'>Per Action Increment (Per Present Timeline)</Text>
                    <Flex>
                      <Box width={[1/2, 1/3, 1/4]} p={2}>
                        <TextField
                          fullWidth
                          label='Minutes'
                          type='number'
                          disabled={this.props.disableTimed}
                          value={Math.floor(this.state.perActionTimelineIncrement/60)}
                          onChange={(e) => {
                            this.setState({ perActionTimelineIncrement: Number(e.target.value) * 60 + (this.state.perActionTimelineIncrement % 60) });
                          }}
                        />
                      </Box>
                      <Box width={[1/2, 1/3, 1/4]} p={2}>
                        <TextField
                          fullWidth
                          label='Seconds'
                          type='number'
                          disabled={this.props.disableTimed}
                          value={this.state.perActionTimelineIncrement % 60}
                          onChange={(e) => {
                            this.setState({ perActionTimelineIncrement: Number(e.target.value) + Math.floor(this.state.perActionTimelineIncrement/60) * 60 });
                          }}
                        />
                      </Box>
                    </Flex>
                  </>
                :
                <></>
                }
              </>
            :
              <></>
            }
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
              to={this.props.backLink ? this.props.backLink : '/'}
              variant='secondary'
              m={1}
              onClick={() => {
                if(typeof this.props.onBack === 'function') {
                  this.props.onBack();
                }
              }}
            >
              Back
            </LinkButton>
            {this.props.modalBarChildren}
            <Button m={1}
              disabled={this.props.disableStart && this.state.variantLoaded}
              bg={(this.props.disableStart && this.state.variantLoaded) ? 'grey' : 'blue'}
              onClick={() => {
                if(typeof this.props.onStart === 'function') {
                  this.props.onStart();
                }
                if(!this.props.overrideStart) {
                  this.setState({
                    start: true,
                    whiteDurationLeft: this.state.startingDuration + this.state.perActionFlatIncrement + this.state.perActionTimelineIncrement,
                    blackDurationLeft: this.state.startingDuration
                  });
                }
              }}
            >
              {this.props.startTitle ? this.props.startTitle : 'Start'}
            </Button>
          </Flex>
        </Modal>
        <GamePlayer
          ref={this.gameRef}
          canImport={this.props.canImport}
          canControlWhite={typeof this.props.canControlWhite === 'boolean' ? this.props.canControlWhite : !this.state.ended}
          canControlBlack={typeof this.props.canControlBlack === 'boolean' ? this.props.canControlBlack : !this.state.ended}
          whiteName={this.props.whiteName}
          blackName={this.props.blackName}
          disableLocal={this.props.disableLocal}
          winner={this.props.winner ? this.props.winner : this.state.winner}
          variant={this.props.variant ? this.props.variant : this.state.variant}
          flip={this.props.flip}
          onVariantLoad={() => { this.setState({ variantLoaded: true }) }}
          onEnd={(win) => {
            if(typeof this.props.onEnd === 'function') {
              this.props.onEnd(win);
            }
            if(!this.props.overrideEnd) {
              this.setState({ start: false, ended: true, winner: win.player === 'white' ? 'black' : 'white' });
            }
          }}
          onFogEnd={(player) => {
            if(typeof this.props.onFogEnd === 'function') {
              this.props.onFogEnd(player);
            }
            if(!this.props.overrideEnd) {
              this.setState({ start: false, ended: true, winner: player === 'white' ? 'white' : 'black' });
            }
          }}
          onMove={(moveObj) => {
            if(typeof this.props.onMove === 'function') {
              this.props.onMove(moveObj);
            }
          }}
          onUndo={() => {
            if(typeof this.props.onUndo === 'function') {
              this.props.onUndo();
            }
          }}
          onSubmit={() => {
            if(typeof this.props.onSubmit === 'function') {
              this.props.onSubmit();
            }
            if(!this.props.overrideSubmit) {
              if(this.gameRef.current.chess.player === 'white') {
                this.setState({
                  whiteDurationLeft: this.state.whiteDurationLeft +
                  this.state.perActionFlatIncrement +
                  this.state.perActionTimelineIncrement * this.gameRef.current.chess.board.timelines.filter((e) => { return e.present; }).length
                });
              }
              else {
                this.setState({
                  blackDurationLeft: this.state.blackDurationLeft +
                  this.state.perActionFlatIncrement +
                  this.state.perActionTimelineIncrement * this.gameRef.current.chess.board.timelines.filter((e) => { return e.present; }).length
                });
              }
            }
          }}
          onImport={(input) => {
            if(typeof this.props.onImport === 'function') {
              this.props.onImport(input);
            }
          }}
          fog={this.props.fog}
        >
          {this.state.timed ?
            <ClockDisplay
              whiteDurationLeft={this.state.whiteDurationLeft}
              blackDurationLeft={this.state.blackDurationLeft}
            />
          :
            <></>
          }
          {this.props.children}
        </GamePlayer>
      </>
    );
  }
}
