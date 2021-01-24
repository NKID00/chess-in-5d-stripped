import React from 'react';

import Modal from 'react-modal';
import { Button, Box, Flex, Text } from 'rebass';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import LinkButton from 'components/LinkButton';
import MenuBar from 'components/MenuBar';
import Options from 'Options';
import { SketchPicker } from 'react-color';
import * as PIXI from 'pixi.js-legacy';

const deepcompare = require('deep-equal');

export default class OptionsMenu extends React.Component {
  state = {
    server: Options.get('server'),
    serverTmp: JSON.stringify(Options.get('server'), null, 2),
    peerjs: Options.get('peerjs'),
    peerjsTmp: JSON.stringify(Options.get('peerjs'), null, 2),
    palette: Options.get('palette'),
    paletteTmp: JSON.stringify(Options.get('palette'), null, 2),
    playerName: Options.get('name').username,
    musicVol: Options.get('sound').music,
    ambienceVol: Options.get('sound').ambience,
    effectVol: Options.get('sound').effect,
    showTutorialPopup: Options.get('tutorial').showPopup
  };
  sync() {
    this.setState({
      server: Options.get('server'),
      serverTmp: JSON.stringify(Options.get('server'), null, 2),
      peerjs: Options.get('peerjs'),
      peerjsTmp: JSON.stringify(Options.get('peerjs'), null, 2),
      palette: Options.get('palette'),
      paletteTmp: JSON.stringify(Options.get('palette'), null, 2),
      playerName: Options.get('name').username,
      musicVol: Options.get('sound').music,
      ambienceVol: Options.get('sound').ambience,
      effectVol: Options.get('sound').effect,
      showTutorialPopup: Options.get('tutorial').showPopup
    });
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
            <Text py={2}>Effect</Text>
            <Slider value={this.state.effectVol} max={1} step={0.05} onChange={(e,v) => {
              this.setState({effectVol: v});
              Options.set('sound', {effect: v, ambience: this.state.ambienceVol, music: this.state.musicVol});
            }}/>
            <Text py={2}>Music</Text>
            <Slider value={this.state.musicVol} max={1} step={0.05} onChange={(e,v) => {
              this.setState({musicVol: v});
              Options.set('sound', {music: v, ambience: this.state.ambienceVol, effect: this.state.effectVol});
            }}/>
            <Text py={2}>Ambience</Text>
            <Slider value={this.state.ambienceVol} max={1} step={0.05} onChange={(e,v) => {
              this.setState({ambienceVol: v});
              Options.set('sound', {ambience: v, music: this.state.musicVol, effect: this.state.effectVol});
            }}/>
            <Text py={2} fontWeight='bold'>Tutorial</Text>
            <Flex>
              <Text p={2}>Show Tutorial Popup</Text>
              <Checkbox
                color='primary'
                checked={this.state.showTutorialPopup}
                onChange={(e) => {
                  this.setState({showTutorialPopup: e.target.checked});
                  Options.set('tutorial', { showPopup: e.target.checked })
                }}
              />
            </Flex>
            <Text py={2} fontWeight='bold'>Server Config</Text>
            <TextField
              fullWidth
              multiline
              rows={5}
              defaultValue={this.state.serverTmp}
              error={!deepcompare(this.state.server, (() => {
                try {
                  return JSON.parse(this.state.serverTmp);
                }
                catch(err) { return {}; }
              })())}
              onChange={(e) => {
                this.setState({serverTmp: e.target.value});
                try {
                  var res = JSON.parse(e.target.value);
                  this.setState({server: res});
                  Options.set('server', res);
                }
                catch(err) {}
              }}
            />
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
              onClick={() => { Options.resetPalette(); this.sync(); }}
              m={1}
            >
              Reset Palette
            </Button>
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
