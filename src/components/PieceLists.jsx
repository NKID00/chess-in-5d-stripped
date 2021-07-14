import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import * as crTexture from 'state/texture';

import californiaBB from 'assets/piece/california/bB.png';
import californiaBK from 'assets/piece/california/bK.png';
import californiaBN from 'assets/piece/california/bN.png';
import californiaBP from 'assets/piece/california/bP.png';
import californiaBQ from 'assets/piece/california/bQ.png';
import californiaBR from 'assets/piece/california/bR.png';
import californiaWB from 'assets/piece/california/wB.png';
import californiaWK from 'assets/piece/california/wK.png';
import californiaWN from 'assets/piece/california/wN.png';
import californiaWP from 'assets/piece/california/wP.png';
import californiaWQ from 'assets/piece/california/wQ.png';
import californiaWR from 'assets/piece/california/wR.png';

import cardinalBB from 'assets/piece/cardinal/bB.png';
import cardinalBK from 'assets/piece/cardinal/bK.png';
import cardinalBN from 'assets/piece/cardinal/bN.png';
import cardinalBP from 'assets/piece/cardinal/bP.png';
import cardinalBQ from 'assets/piece/cardinal/bQ.png';
import cardinalBR from 'assets/piece/cardinal/bR.png';
import cardinalWB from 'assets/piece/cardinal/wB.png';
import cardinalWK from 'assets/piece/cardinal/wK.png';
import cardinalWN from 'assets/piece/cardinal/wN.png';
import cardinalWP from 'assets/piece/cardinal/wP.png';
import cardinalWQ from 'assets/piece/cardinal/wQ.png';
import cardinalWR from 'assets/piece/cardinal/wR.png';

const keylist = [
  'blackP',
  'blackW',
  'blackB',
  'blackN',
  'blackR',
  'blackS',
  'blackQ',
  'blackK',
  'blackC',
  'blackY',
  'blackU',
  'blackD',
  'whiteP',
  'whiteW',
  'whiteB',
  'whiteN',
  'whiteR',
  'whiteS',
  'whiteQ',
  'whiteK',
  'whiteC',
  'whiteY',
  'whiteU',
  'whiteD'
];

/*
Props
 - emitter
*/
export class PieceSetList extends React.Component {
  state = {
    pieceSet: 'default'
  };
  async extractPieceSet() {
    let checkName = '';
    let isDifferent = false;
    for(let i = 0;!isDifferent && i < keylist.length;i++) {
      let currName = 'default';
      let currentTexture = await crTexture.get(keylist[i]);
      if(currentTexture !== null) {
        currName = currentTexture.name;
      }
      //Check if name is different (indicating different set)
      if(checkName.length <= 0) {
        checkName = currName;
      }
      if(checkName !== currName) {
        isDifferent = true;
      }
    }
    if(isDifferent) {
      this.setState({ pieceSet: 'custom' });
    }
    else {
      this.setState({ pieceSet: checkName });
    }
  }
  async updatePieceSet() {
    if(this.state.pieceSet !== 'custom') {
      if(this.state.pieceSet === 'default') {
        for(let i = 0;i < keylist.length;i++) {
          await crTexture.remove(keylist[i]);
        }
      }
      else if(this.state.pieceSet === 'california') {
        await crTexture.set('blackP', 'california', californiaBP);
        await crTexture.set('blackW', 'california', californiaBP);
        await crTexture.set('blackB', 'california', californiaBB);
        await crTexture.set('blackN', 'california', californiaBN);
        await crTexture.set('blackR', 'california', californiaBR);
        await crTexture.set('blackS', 'california', californiaBQ);
        await crTexture.set('blackQ', 'california', californiaBQ);
        await crTexture.set('blackK', 'california', californiaBK);
        await crTexture.set('blackC', 'california', californiaBK);
        await crTexture.set('blackY', 'california', californiaBQ);
        await crTexture.set('blackU', 'california', californiaBN);
        await crTexture.set('blackD', 'california', californiaBN);
        await crTexture.set('whiteP', 'california', californiaWP);
        await crTexture.set('whiteW', 'california', californiaWP);
        await crTexture.set('whiteB', 'california', californiaWB);
        await crTexture.set('whiteN', 'california', californiaWN);
        await crTexture.set('whiteR', 'california', californiaWR);
        await crTexture.set('whiteS', 'california', californiaWQ);
        await crTexture.set('whiteQ', 'california', californiaWQ);
        await crTexture.set('whiteK', 'california', californiaWK);
        await crTexture.set('whiteC', 'california', californiaWK);
        await crTexture.set('whiteY', 'california', californiaWQ);
        await crTexture.set('whiteU', 'california', californiaWN);
        await crTexture.set('whiteD', 'california', californiaWN);
      }
      else if(this.state.pieceSet === 'cardinal') {
        await crTexture.set('blackP', 'cardinal', cardinalBP);
        await crTexture.set('blackW', 'cardinal', cardinalBP);
        await crTexture.set('blackB', 'cardinal', cardinalBB);
        await crTexture.set('blackN', 'cardinal', cardinalBN);
        await crTexture.set('blackR', 'cardinal', cardinalBR);
        await crTexture.set('blackS', 'cardinal', cardinalBQ);
        await crTexture.set('blackQ', 'cardinal', cardinalBQ);
        await crTexture.set('blackK', 'cardinal', cardinalBK);
        await crTexture.set('blackC', 'cardinal', cardinalBK);
        await crTexture.set('blackY', 'cardinal', cardinalBQ);
        await crTexture.set('blackU', 'cardinal', cardinalBN);
        await crTexture.set('blackD', 'cardinal', cardinalBN);
        await crTexture.set('whiteP', 'cardinal', cardinalWP);
        await crTexture.set('whiteW', 'cardinal', cardinalWP);
        await crTexture.set('whiteB', 'cardinal', cardinalWB);
        await crTexture.set('whiteN', 'cardinal', cardinalWN);
        await crTexture.set('whiteR', 'cardinal', cardinalWR);
        await crTexture.set('whiteS', 'cardinal', cardinalWQ);
        await crTexture.set('whiteQ', 'cardinal', cardinalWQ);
        await crTexture.set('whiteK', 'cardinal', cardinalWK);
        await crTexture.set('whiteC', 'cardinal', cardinalWK);
        await crTexture.set('whiteY', 'cardinal', cardinalWQ);
        await crTexture.set('whiteU', 'cardinal', cardinalWN);
        await crTexture.set('whiteD', 'cardinal', cardinalWN);
      }
      if(this.props.emitter !== null) {
        this.props.emitter.emit('textureUpdate');
      }
    }
  }
  componentDidMount() {
    this.extractPieceSet();
  }
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.pieceSet !== this.state.pieceSet) {
      await this.updatePieceSet();
      await this.extractPieceSet();
    }
  }
  render(){
    return (
      <FormControl variant='outlined' fullWidth>
        <InputLabel><Trans>Piece Set</Trans></InputLabel>
        <Select
          value={this.state.pieceSet}
          onChange={(event) => {
            this.setState({ pieceSet: event.target.value });
          }}
          label={<Trans>Piece Set</Trans>}
        >
          <MenuItem value='default'>
            <i><Trans>Default</Trans></i>
          </MenuItem>
          <MenuItem value='california'>
            <Box display='flex'>
              <Box mr={1} mt='auto' mb='auto' alignItems='center'>
                California
              </Box>
              <img alt='White Knight Piece' src={californiaWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={californiaBN} style={{ height: 40 }} />
            </Box>
          </MenuItem>
          <MenuItem value='cardinal'>
            <Box display='flex'>
              <Box mr={1} mt='auto' mb='auto' alignItems='center'>
                Cardinal
              </Box>
              <img alt='White Knight Piece' src={cardinalWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={cardinalBN} style={{ height: 40 }} />
            </Box>
          </MenuItem>
          <MenuItem disabled value='custom'>
            <i><Trans>Custom</Trans></i>
          </MenuItem>
        </Select>
      </FormControl>
    );
  }
}