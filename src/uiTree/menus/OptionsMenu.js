import React from 'react';

import Modal from 'react-modal';
import { Button, Box, Flex, Text } from 'rebass';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import LinkButton from 'components/LinkButton';
import LogoIcon from 'assets/logo.svg';
import Options from 'Options';
import { SketchPicker } from 'react-color';
import * as PIXI from 'pixi.js';

const deepcompare = require('deep-compare');

export default class OptionsMenu extends React.Component {
  state = {
    peerjs: Options.get('peerjs'),
    peerjsTmp: JSON.stringify(Options.get('peerjs'), null, 2),
    palette: Options.get('palette'),
    paletteTmp: JSON.stringify(Options.get('palette'), null, 2),
    playerName: Options.get('name').username,
    musicVol: Options.get('sound').music,
    ambienceVol: Options.get('sound').ambience
  };
  sync() {
    this.setState({
      peerjs: Options.get('peerjs'),
      peerjsTmp: JSON.stringify(Options.get('peerjs'), null, 2),
      palette: Options.get('palette'),
      paletteTmp: JSON.stringify(Options.get('palette'), null, 2),
      playerName: Options.get('name').username,
      musicVol: Options.get('sound').music,
      ambienceVol: Options.get('sound').ambience,
    });
  }
  render() {
    return (
      <>
        <Flex
          p={2}
          color='white'
          bg='black'
          alignItems='center'
          width={1}
        >
          <img src={LogoIcon} alt='Logo' />
          <Text p={2} fontWeight='bold'>Chess in 5D</Text>
          <Box mx='auto' />
        </Flex>
        <Modal
          isOpen={true}
          style={{content: {padding: '0px'}}}
        >
          <Flex
            p={2}
            color='white'
            bg='black'
            alignItems='center'
            width={1}
            sx={{position: 'absolute', top: 0, zIndex: 100}}
          >
            <Text p={2} fontWeight='bold'>Options</Text>
            <Box mx='auto' />
          </Flex>
          <Box width={1} px={3} py={5} sx={{overflowY: 'auto', height: '100%'}}>
            <Text py={2} fontWeight='bold'>Player Name</Text>
            <TextField
              fullWidth
              value={this.state.playerName}
              onChange={(e) => {
                this.setState({playerName: e.target.value});
                Options.set('name', {username: e.target.value});
              }}
            />
            <Text py={2} fontWeight='bold'>Sound</Text>
            <Text py={2}>Music</Text>
            <Slider value={this.state.musicVol} max={1} step={0.05} onChange={(e,v) => {
              this.setState({musicVol: v});
              Options.set('sound', {music: v, ambience: this.state.ambienceVol});
            }}/>
            <Text py={2}>Ambience</Text>
            <Slider value={this.state.ambienceVol} max={1} step={0.05} onChange={(e,v) => {
              this.setState({ambienceVol: v});
              Options.set('sound', {ambience: v, music: this.state.musicVol});
            }}/>
            <Text py={2} fontWeight='bold'>PeerJS Server Config</Text>
            <TextField
              fullWidth
              multiline
              rows={5}
              defaultValue={this.state.peerjsTmp}
              error={!deepcompare(this.state.peerjs, (() => {
                try {
                  return JSON.parse(this.state.peerjsTmp);
                }
                catch(err) { return {}; }
              })())}
              onChange={(e) => {
                this.setState({peerjsTmp: e.target.value});
                try {
                  var res = JSON.parse(e.target.value);
                  this.setState({peerjs: res});
                  Options.set('peerjs', res);
                }
                catch(err) {}
              }}
            />
            <Text py={2} fontWeight='bold'>Board Color Palette</Text>
            <Flex flexWrap='wrap' width={1} alignItems='center'>
              {Object.keys(this.state.palette).map((e) => {
                return (
                  <Box width={1/2} m={1} key={e}>
                    <Text p={2}>{e.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + e.replace(/([A-Z])/g, ' $1').slice(1)}</Text>
                    <SketchPicker
                      color={{
                        r: Math.round(PIXI.utils.hex2rgb(this.state.palette[e])[0] * 255),
                        g: Math.round(PIXI.utils.hex2rgb(this.state.palette[e])[1] * 255),
                        b: Math.round(PIXI.utils.hex2rgb(this.state.palette[e])[2] * 255),
                      }}
                      onChange={(c) => {
                        var res = Object.assign({}, this.state.palette);
                        var tmp = {};
                        tmp[e] = PIXI.utils.rgb2hex([
                          c.rgb.r / 255,
                          c.rgb.g / 255,
                          c.rgb.b / 255
                        ]);
                        res = Object.assign(res, tmp);
                        this.setState({palette: res, paletteTmp: JSON.stringify(res, null, 2)});
                        Options.set('palette', res);
                      }}
                    />
                  </Box>
                );
              })}
            </Flex>
            <Text py={2} fontWeight='bold'>Board Color Palette Config</Text>
            <TextField
              fullWidth
              multiline
              rows={8+6}
              defaultValue={this.state.paletteTmp}
              error={!deepcompare(this.state.palette, (() => {
                try {
                  return JSON.parse(this.state.paletteTmp);
                }
                catch(err) { return {}; }
              })())}
              onChange={(e) => {
                this.setState({paletteTmp: e.target.value});
                try {
                  var res = JSON.parse(e.target.value);
                  this.setState({palette: res});
                  Options.set('palette', res);
                }
                catch(err) {}
              }}
            />
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
              to='/'
              variant='secondary'
              m={1}
            >
              Back
            </LinkButton>
            <Button
              variant='primary'
              onClick={() => { Options.reset(); this.sync(); }}
              m={1}
            >
              Reset
            </Button>
          </Flex>
        </Modal>
      </>
    );
  }
}
