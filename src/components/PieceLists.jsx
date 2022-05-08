import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import EmitterContext from 'utils/EmitterContext';
import * as crTexture from 'state/texture';

import defaultBB from 'assets/piece/default/black_bishop.png';
import defaultBW from 'assets/piece/default/black_brawn.png';
import defaultBC from 'assets/piece/default/black_common_king.png';
import defaultBD from 'assets/piece/default/black_dragon.png';
import defaultBK from 'assets/piece/default/black_king.png';
import defaultBN from 'assets/piece/default/black_knight.png';
import defaultBP from 'assets/piece/default/black_pawn.png';
import defaultBS from 'assets/piece/default/black_princess.png';
import defaultBQ from 'assets/piece/default/black_queen.png';
import defaultBR from 'assets/piece/default/black_rook.png';
import defaultBY from 'assets/piece/default/black_royal_queen.png';
import defaultBU from 'assets/piece/default/black_unicorn.png';
import defaultWB from 'assets/piece/default/white_bishop.png';
import defaultWW from 'assets/piece/default/white_brawn.png';
import defaultWC from 'assets/piece/default/white_common_king.png';
import defaultWD from 'assets/piece/default/white_dragon.png';
import defaultWK from 'assets/piece/default/white_king.png';
import defaultWN from 'assets/piece/default/white_knight.png';
import defaultWP from 'assets/piece/default/white_pawn.png';
import defaultWS from 'assets/piece/default/white_princess.png';
import defaultWQ from 'assets/piece/default/white_queen.png';
import defaultWR from 'assets/piece/default/white_rook.png';
import defaultWY from 'assets/piece/default/white_royal_queen.png';
import defaultWU from 'assets/piece/default/white_unicorn.png';

import default2BB from 'assets/piece/default_v2/black_bishop.png';
import default2BW from 'assets/piece/default_v2/black_brawn.png';
import default2BC from 'assets/piece/default_v2/black_common_king.png';
import default2BD from 'assets/piece/default_v2/black_dragon.png';
import default2BK from 'assets/piece/default_v2/black_king.png';
import default2BN from 'assets/piece/default_v2/black_knight.png';
import default2BP from 'assets/piece/default_v2/black_pawn.png';
import default2BS from 'assets/piece/default_v2/black_princess.png';
import default2BQ from 'assets/piece/default_v2/black_queen.png';
import default2BR from 'assets/piece/default_v2/black_rook.png';
import default2BY from 'assets/piece/default_v2/black_royal_queen.png';
import default2BU from 'assets/piece/default_v2/black_unicorn.png';
import default2WB from 'assets/piece/default_v2/white_bishop.png';
import default2WW from 'assets/piece/default_v2/white_brawn.png';
import default2WC from 'assets/piece/default_v2/white_common_king.png';
import default2WD from 'assets/piece/default_v2/white_dragon.png';
import default2WK from 'assets/piece/default_v2/white_king.png';
import default2WN from 'assets/piece/default_v2/white_knight.png';
import default2WP from 'assets/piece/default_v2/white_pawn.png';
import default2WS from 'assets/piece/default_v2/white_princess.png';
import default2WQ from 'assets/piece/default_v2/white_queen.png';
import default2WR from 'assets/piece/default_v2/white_rook.png';
import default2WY from 'assets/piece/default_v2/white_royal_queen.png';
import default2WU from 'assets/piece/default_v2/white_unicorn.png';

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

import cburnettBB from 'assets/piece/cburnett/bB.png';
import cburnettBK from 'assets/piece/cburnett/bK.png';
import cburnettBN from 'assets/piece/cburnett/bN.png';
import cburnettBP from 'assets/piece/cburnett/bP.png';
import cburnettBQ from 'assets/piece/cburnett/bQ.png';
import cburnettBR from 'assets/piece/cburnett/bR.png';
import cburnettWB from 'assets/piece/cburnett/wB.png';
import cburnettWK from 'assets/piece/cburnett/wK.png';
import cburnettWN from 'assets/piece/cburnett/wN.png';
import cburnettWP from 'assets/piece/cburnett/wP.png';
import cburnettWQ from 'assets/piece/cburnett/wQ.png';
import cburnettWR from 'assets/piece/cburnett/wR.png';

import chessnutBB from 'assets/piece/chessnut/bB.png';
import chessnutBK from 'assets/piece/chessnut/bK.png';
import chessnutBN from 'assets/piece/chessnut/bN.png';
import chessnutBP from 'assets/piece/chessnut/bP.png';
import chessnutBQ from 'assets/piece/chessnut/bQ.png';
import chessnutBR from 'assets/piece/chessnut/bR.png';
import chessnutWB from 'assets/piece/chessnut/wB.png';
import chessnutWK from 'assets/piece/chessnut/wK.png';
import chessnutWN from 'assets/piece/chessnut/wN.png';
import chessnutWP from 'assets/piece/chessnut/wP.png';
import chessnutWQ from 'assets/piece/chessnut/wQ.png';
import chessnutWR from 'assets/piece/chessnut/wR.png';

import dubrovnyBB from 'assets/piece/dubrovny/bB.png';
import dubrovnyBK from 'assets/piece/dubrovny/bK.png';
import dubrovnyBN from 'assets/piece/dubrovny/bN.png';
import dubrovnyBP from 'assets/piece/dubrovny/bP.png';
import dubrovnyBQ from 'assets/piece/dubrovny/bQ.png';
import dubrovnyBR from 'assets/piece/dubrovny/bR.png';
import dubrovnyWB from 'assets/piece/dubrovny/wB.png';
import dubrovnyWK from 'assets/piece/dubrovny/wK.png';
import dubrovnyWN from 'assets/piece/dubrovny/wN.png';
import dubrovnyWP from 'assets/piece/dubrovny/wP.png';
import dubrovnyWQ from 'assets/piece/dubrovny/wQ.png';
import dubrovnyWR from 'assets/piece/dubrovny/wR.png';

import frescaBB from 'assets/piece/fresca/bB.png';
import frescaBK from 'assets/piece/fresca/bK.png';
import frescaBN from 'assets/piece/fresca/bN.png';
import frescaBP from 'assets/piece/fresca/bP.png';
import frescaBQ from 'assets/piece/fresca/bQ.png';
import frescaBR from 'assets/piece/fresca/bR.png';
import frescaWB from 'assets/piece/fresca/wB.png';
import frescaWK from 'assets/piece/fresca/wK.png';
import frescaWN from 'assets/piece/fresca/wN.png';
import frescaWP from 'assets/piece/fresca/wP.png';
import frescaWQ from 'assets/piece/fresca/wQ.png';
import frescaWR from 'assets/piece/fresca/wR.png';

import giocoBB from 'assets/piece/gioco/bB.png';
import giocoBK from 'assets/piece/gioco/bK.png';
import giocoBN from 'assets/piece/gioco/bN.png';
import giocoBP from 'assets/piece/gioco/bP.png';
import giocoBQ from 'assets/piece/gioco/bQ.png';
import giocoBR from 'assets/piece/gioco/bR.png';
import giocoWB from 'assets/piece/gioco/wB.png';
import giocoWK from 'assets/piece/gioco/wK.png';
import giocoWN from 'assets/piece/gioco/wN.png';
import giocoWP from 'assets/piece/gioco/wP.png';
import giocoWQ from 'assets/piece/gioco/wQ.png';
import giocoWR from 'assets/piece/gioco/wR.png';

import governorBB from 'assets/piece/governor/bB.png';
import governorBK from 'assets/piece/governor/bK.png';
import governorBN from 'assets/piece/governor/bN.png';
import governorBP from 'assets/piece/governor/bP.png';
import governorBQ from 'assets/piece/governor/bQ.png';
import governorBR from 'assets/piece/governor/bR.png';
import governorWB from 'assets/piece/governor/wB.png';
import governorWK from 'assets/piece/governor/wK.png';
import governorWN from 'assets/piece/governor/wN.png';
import governorWP from 'assets/piece/governor/wP.png';
import governorWQ from 'assets/piece/governor/wQ.png';
import governorWR from 'assets/piece/governor/wR.png';

import horseyBB from 'assets/piece/horsey/bB.png';
import horseyBK from 'assets/piece/horsey/bK.png';
import horseyBN from 'assets/piece/horsey/bN.png';
import horseyBP from 'assets/piece/horsey/bP.png';
import horseyBQ from 'assets/piece/horsey/bQ.png';
import horseyBR from 'assets/piece/horsey/bR.png';
import horseyWB from 'assets/piece/horsey/wB.png';
import horseyWK from 'assets/piece/horsey/wK.png';
import horseyWN from 'assets/piece/horsey/wN.png';
import horseyWP from 'assets/piece/horsey/wP.png';
import horseyWQ from 'assets/piece/horsey/wQ.png';
import horseyWR from 'assets/piece/horsey/wR.png';

import icpiecesBB from 'assets/piece/icpieces/bB.png';
import icpiecesBK from 'assets/piece/icpieces/bK.png';
import icpiecesBN from 'assets/piece/icpieces/bN.png';
import icpiecesBP from 'assets/piece/icpieces/bP.png';
import icpiecesBQ from 'assets/piece/icpieces/bQ.png';
import icpiecesBR from 'assets/piece/icpieces/bR.png';
import icpiecesWB from 'assets/piece/icpieces/wB.png';
import icpiecesWK from 'assets/piece/icpieces/wK.png';
import icpiecesWN from 'assets/piece/icpieces/wN.png';
import icpiecesWP from 'assets/piece/icpieces/wP.png';
import icpiecesWQ from 'assets/piece/icpieces/wQ.png';
import icpiecesWR from 'assets/piece/icpieces/wR.png';

import kosalBB from 'assets/piece/kosal/bB.png';
import kosalBK from 'assets/piece/kosal/bK.png';
import kosalBN from 'assets/piece/kosal/bN.png';
import kosalBP from 'assets/piece/kosal/bP.png';
import kosalBQ from 'assets/piece/kosal/bQ.png';
import kosalBR from 'assets/piece/kosal/bR.png';
import kosalWB from 'assets/piece/kosal/wB.png';
import kosalWK from 'assets/piece/kosal/wK.png';
import kosalWN from 'assets/piece/kosal/wN.png';
import kosalWP from 'assets/piece/kosal/wP.png';
import kosalWQ from 'assets/piece/kosal/wQ.png';
import kosalWR from 'assets/piece/kosal/wR.png';

import letterBB from 'assets/piece/letter/bB.png';
import letterBK from 'assets/piece/letter/bK.png';
import letterBN from 'assets/piece/letter/bN.png';
import letterBP from 'assets/piece/letter/bP.png';
import letterBQ from 'assets/piece/letter/bQ.png';
import letterBR from 'assets/piece/letter/bR.png';
import letterWB from 'assets/piece/letter/wB.png';
import letterWK from 'assets/piece/letter/wK.png';
import letterWN from 'assets/piece/letter/wN.png';
import letterWP from 'assets/piece/letter/wP.png';
import letterWQ from 'assets/piece/letter/wQ.png';
import letterWR from 'assets/piece/letter/wR.png';

import libraBB from 'assets/piece/libra/bB.png';
import libraBK from 'assets/piece/libra/bK.png';
import libraBN from 'assets/piece/libra/bN.png';
import libraBP from 'assets/piece/libra/bP.png';
import libraBQ from 'assets/piece/libra/bQ.png';
import libraBR from 'assets/piece/libra/bR.png';
import libraWB from 'assets/piece/libra/wB.png';
import libraWK from 'assets/piece/libra/wK.png';
import libraWN from 'assets/piece/libra/wN.png';
import libraWP from 'assets/piece/libra/wP.png';
import libraWQ from 'assets/piece/libra/wQ.png';
import libraWR from 'assets/piece/libra/wR.png';

import maestroBB from 'assets/piece/maestro/bB.png';
import maestroBK from 'assets/piece/maestro/bK.png';
import maestroBN from 'assets/piece/maestro/bN.png';
import maestroBP from 'assets/piece/maestro/bP.png';
import maestroBQ from 'assets/piece/maestro/bQ.png';
import maestroBR from 'assets/piece/maestro/bR.png';
import maestroWB from 'assets/piece/maestro/wB.png';
import maestroWK from 'assets/piece/maestro/wK.png';
import maestroWN from 'assets/piece/maestro/wN.png';
import maestroWP from 'assets/piece/maestro/wP.png';
import maestroWQ from 'assets/piece/maestro/wQ.png';
import maestroWR from 'assets/piece/maestro/wR.png';

import meridaBB from 'assets/piece/merida/bB.png';
import meridaBK from 'assets/piece/merida/bK.png';
import meridaBN from 'assets/piece/merida/bN.png';
import meridaBP from 'assets/piece/merida/bP.png';
import meridaBQ from 'assets/piece/merida/bQ.png';
import meridaBR from 'assets/piece/merida/bR.png';
import meridaWB from 'assets/piece/merida/wB.png';
import meridaWK from 'assets/piece/merida/wK.png';
import meridaWN from 'assets/piece/merida/wN.png';
import meridaWP from 'assets/piece/merida/wP.png';
import meridaWQ from 'assets/piece/merida/wQ.png';
import meridaWR from 'assets/piece/merida/wR.png';

import monoB from 'assets/piece/mono/B.png';
import monoK from 'assets/piece/mono/K.png';
import monoN from 'assets/piece/mono/N.png';
import monoP from 'assets/piece/mono/P.png';
import monoQ from 'assets/piece/mono/Q.png';
import monoR from 'assets/piece/mono/R.png';

import pirouettiBB from 'assets/piece/pirouetti/bB.png';
import pirouettiBK from 'assets/piece/pirouetti/bK.png';
import pirouettiBN from 'assets/piece/pirouetti/bN.png';
import pirouettiBP from 'assets/piece/pirouetti/bP.png';
import pirouettiBQ from 'assets/piece/pirouetti/bQ.png';
import pirouettiBR from 'assets/piece/pirouetti/bR.png';
import pirouettiWB from 'assets/piece/pirouetti/wB.png';
import pirouettiWK from 'assets/piece/pirouetti/wK.png';
import pirouettiWN from 'assets/piece/pirouetti/wN.png';
import pirouettiWP from 'assets/piece/pirouetti/wP.png';
import pirouettiWQ from 'assets/piece/pirouetti/wQ.png';
import pirouettiWR from 'assets/piece/pirouetti/wR.png';

import pixelBB from 'assets/piece/pixel/bB.png';
import pixelBK from 'assets/piece/pixel/bK.png';
import pixelBN from 'assets/piece/pixel/bN.png';
import pixelBP from 'assets/piece/pixel/bP.png';
import pixelBQ from 'assets/piece/pixel/bQ.png';
import pixelBR from 'assets/piece/pixel/bR.png';
import pixelWB from 'assets/piece/pixel/wB.png';
import pixelWK from 'assets/piece/pixel/wK.png';
import pixelWN from 'assets/piece/pixel/wN.png';
import pixelWP from 'assets/piece/pixel/wP.png';
import pixelWQ from 'assets/piece/pixel/wQ.png';
import pixelWR from 'assets/piece/pixel/wR.png';

import shapesBB from 'assets/piece/shapes/bB.png';
import shapesBK from 'assets/piece/shapes/bK.png';
import shapesBN from 'assets/piece/shapes/bN.png';
import shapesBP from 'assets/piece/shapes/bP.png';
import shapesBQ from 'assets/piece/shapes/bQ.png';
import shapesBR from 'assets/piece/shapes/bR.png';
import shapesWB from 'assets/piece/shapes/wB.png';
import shapesWK from 'assets/piece/shapes/wK.png';
import shapesWN from 'assets/piece/shapes/wN.png';
import shapesWP from 'assets/piece/shapes/wP.png';
import shapesWQ from 'assets/piece/shapes/wQ.png';
import shapesWR from 'assets/piece/shapes/wR.png';

import stauntyBB from 'assets/piece/staunty/bB.png';
import stauntyBK from 'assets/piece/staunty/bK.png';
import stauntyBN from 'assets/piece/staunty/bN.png';
import stauntyBP from 'assets/piece/staunty/bP.png';
import stauntyBQ from 'assets/piece/staunty/bQ.png';
import stauntyBR from 'assets/piece/staunty/bR.png';
import stauntyWB from 'assets/piece/staunty/wB.png';
import stauntyWK from 'assets/piece/staunty/wK.png';
import stauntyWN from 'assets/piece/staunty/wN.png';
import stauntyWP from 'assets/piece/staunty/wP.png';
import stauntyWQ from 'assets/piece/staunty/wQ.png';
import stauntyWR from 'assets/piece/staunty/wR.png';

import tatianaBB from 'assets/piece/tatiana/bB.png';
import tatianaBK from 'assets/piece/tatiana/bK.png';
import tatianaBN from 'assets/piece/tatiana/bN.png';
import tatianaBP from 'assets/piece/tatiana/bP.png';
import tatianaBQ from 'assets/piece/tatiana/bQ.png';
import tatianaBR from 'assets/piece/tatiana/bR.png';
import tatianaWB from 'assets/piece/tatiana/wB.png';
import tatianaWK from 'assets/piece/tatiana/wK.png';
import tatianaWN from 'assets/piece/tatiana/wN.png';
import tatianaWP from 'assets/piece/tatiana/wP.png';
import tatianaWQ from 'assets/piece/tatiana/wQ.png';
import tatianaWR from 'assets/piece/tatiana/wR.png';

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
 - onReset
*/
export class PieceSetList extends React.Component {
  static contextType = EmitterContext;
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
    if(this.state.pieceSet === 'default') {
      let needsUpdate = false;
      for(let i = 0;!needsUpdate && i < keylist.length;i++) {
        if((await crTexture.get(keylist[i])) !== null) {
          needsUpdate = true;
        }
      }
      if(needsUpdate) {
        await crTexture.set('blackP', 'default', defaultBP);
        await crTexture.set('blackW', 'default', defaultBW);
        await crTexture.set('blackB', 'default', defaultBB);
        await crTexture.set('blackN', 'default', defaultBN);
        await crTexture.set('blackR', 'default', defaultBR);
        await crTexture.set('blackS', 'default', defaultBS);
        await crTexture.set('blackQ', 'default', defaultBQ);
        await crTexture.set('blackK', 'default', defaultBK);
        await crTexture.set('blackC', 'default', defaultBC);
        await crTexture.set('blackY', 'default', defaultBY);
        await crTexture.set('blackU', 'default', defaultBU);
        await crTexture.set('blackD', 'default', defaultBD);
        await crTexture.set('whiteP', 'default', defaultWP);
        await crTexture.set('whiteW', 'default', defaultWW);
        await crTexture.set('whiteB', 'default', defaultWB);
        await crTexture.set('whiteN', 'default', defaultWN);
        await crTexture.set('whiteR', 'default', defaultWR);
        await crTexture.set('whiteS', 'default', defaultWS);
        await crTexture.set('whiteQ', 'default', defaultWQ);
        await crTexture.set('whiteK', 'default', defaultWK);
        await crTexture.set('whiteC', 'default', defaultWC);
        await crTexture.set('whiteY', 'default', defaultWY);
        await crTexture.set('whiteU', 'default', defaultWU);
        await crTexture.set('whiteD', 'default', defaultWD);
        if(this.props.emitter !== null) {
          this.props.emitter.emit('textureUpdate');
        }
      }
    }
    else if(this.state.pieceSet !== 'custom') {
      if(this.state.pieceSet === 'california') {
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
      else if(this.state.pieceSet === 'cburnett') {
        await crTexture.set('blackP', 'cburnett', cburnettBP);
        await crTexture.set('blackW', 'cburnett', cburnettBP);
        await crTexture.set('blackB', 'cburnett', cburnettBB);
        await crTexture.set('blackN', 'cburnett', cburnettBN);
        await crTexture.set('blackR', 'cburnett', cburnettBR);
        await crTexture.set('blackS', 'cburnett', cburnettBQ);
        await crTexture.set('blackQ', 'cburnett', cburnettBQ);
        await crTexture.set('blackK', 'cburnett', cburnettBK);
        await crTexture.set('blackC', 'cburnett', cburnettBK);
        await crTexture.set('blackY', 'cburnett', cburnettBQ);
        await crTexture.set('blackU', 'cburnett', cburnettBN);
        await crTexture.set('blackD', 'cburnett', cburnettBN);
        await crTexture.set('whiteP', 'cburnett', cburnettWP);
        await crTexture.set('whiteW', 'cburnett', cburnettWP);
        await crTexture.set('whiteB', 'cburnett', cburnettWB);
        await crTexture.set('whiteN', 'cburnett', cburnettWN);
        await crTexture.set('whiteR', 'cburnett', cburnettWR);
        await crTexture.set('whiteS', 'cburnett', cburnettWQ);
        await crTexture.set('whiteQ', 'cburnett', cburnettWQ);
        await crTexture.set('whiteK', 'cburnett', cburnettWK);
        await crTexture.set('whiteC', 'cburnett', cburnettWK);
        await crTexture.set('whiteY', 'cburnett', cburnettWQ);
        await crTexture.set('whiteU', 'cburnett', cburnettWN);
        await crTexture.set('whiteD', 'cburnett', cburnettWN);
      }
      else if(this.state.pieceSet === 'chessnut') {
        await crTexture.set('blackP', 'chessnut', chessnutBP);
        await crTexture.set('blackW', 'chessnut', chessnutBP);
        await crTexture.set('blackB', 'chessnut', chessnutBB);
        await crTexture.set('blackN', 'chessnut', chessnutBN);
        await crTexture.set('blackR', 'chessnut', chessnutBR);
        await crTexture.set('blackS', 'chessnut', chessnutBQ);
        await crTexture.set('blackQ', 'chessnut', chessnutBQ);
        await crTexture.set('blackK', 'chessnut', chessnutBK);
        await crTexture.set('blackC', 'chessnut', chessnutBK);
        await crTexture.set('blackY', 'chessnut', chessnutBQ);
        await crTexture.set('blackU', 'chessnut', chessnutBN);
        await crTexture.set('blackD', 'chessnut', chessnutBN);
        await crTexture.set('whiteP', 'chessnut', chessnutWP);
        await crTexture.set('whiteW', 'chessnut', chessnutWP);
        await crTexture.set('whiteB', 'chessnut', chessnutWB);
        await crTexture.set('whiteN', 'chessnut', chessnutWN);
        await crTexture.set('whiteR', 'chessnut', chessnutWR);
        await crTexture.set('whiteS', 'chessnut', chessnutWQ);
        await crTexture.set('whiteQ', 'chessnut', chessnutWQ);
        await crTexture.set('whiteK', 'chessnut', chessnutWK);
        await crTexture.set('whiteC', 'chessnut', chessnutWK);
        await crTexture.set('whiteY', 'chessnut', chessnutWQ);
        await crTexture.set('whiteU', 'chessnut', chessnutWN);
        await crTexture.set('whiteD', 'chessnut', chessnutWN);
      }
      else if(this.state.pieceSet === 'default_v2'){
        await crTexture.set('blackP', 'default_v2', default2BP);
        await crTexture.set('blackW', 'default_v2', default2BW);
        await crTexture.set('blackB', 'default_v2', default2BB);
        await crTexture.set('blackN', 'default_v2', default2BN);
        await crTexture.set('blackR', 'default_v2', default2BR);
        await crTexture.set('blackS', 'default_v2', default2BS);
        await crTexture.set('blackQ', 'default_v2', default2BQ);
        await crTexture.set('blackK', 'default_v2', default2BK);
        await crTexture.set('blackC', 'default_v2', default2BC);
        await crTexture.set('blackY', 'default_v2', default2BY);
        await crTexture.set('blackU', 'default_v2', default2BU);
        await crTexture.set('blackD', 'default_v2', default2BD);
        await crTexture.set('whiteP', 'default_v2', default2WP);
        await crTexture.set('whiteW', 'default_v2', default2WW);
        await crTexture.set('whiteB', 'default_v2', default2WB);
        await crTexture.set('whiteN', 'default_v2', default2WN);
        await crTexture.set('whiteR', 'default_v2', default2WR);
        await crTexture.set('whiteS', 'default_v2', default2WS);
        await crTexture.set('whiteQ', 'default_v2', default2WQ);
        await crTexture.set('whiteK', 'default_v2', default2WK);
        await crTexture.set('whiteC', 'default_v2', default2WC);
        await crTexture.set('whiteY', 'default_v2', default2WY);
        await crTexture.set('whiteU', 'default_v2', default2WU);
        await crTexture.set('whiteD', 'default_v2', default2WD);
      }
      else if(this.state.pieceSet === 'dubrovny') {
        await crTexture.set('blackP', 'dubrovny', dubrovnyBP);
        await crTexture.set('blackW', 'dubrovny', dubrovnyBP);
        await crTexture.set('blackB', 'dubrovny', dubrovnyBB);
        await crTexture.set('blackN', 'dubrovny', dubrovnyBN);
        await crTexture.set('blackR', 'dubrovny', dubrovnyBR);
        await crTexture.set('blackS', 'dubrovny', dubrovnyBQ);
        await crTexture.set('blackQ', 'dubrovny', dubrovnyBQ);
        await crTexture.set('blackK', 'dubrovny', dubrovnyBK);
        await crTexture.set('blackC', 'dubrovny', dubrovnyBK);
        await crTexture.set('blackY', 'dubrovny', dubrovnyBQ);
        await crTexture.set('blackU', 'dubrovny', dubrovnyBN);
        await crTexture.set('blackD', 'dubrovny', dubrovnyBN);
        await crTexture.set('whiteP', 'dubrovny', dubrovnyWP);
        await crTexture.set('whiteW', 'dubrovny', dubrovnyWP);
        await crTexture.set('whiteB', 'dubrovny', dubrovnyWB);
        await crTexture.set('whiteN', 'dubrovny', dubrovnyWN);
        await crTexture.set('whiteR', 'dubrovny', dubrovnyWR);
        await crTexture.set('whiteS', 'dubrovny', dubrovnyWQ);
        await crTexture.set('whiteQ', 'dubrovny', dubrovnyWQ);
        await crTexture.set('whiteK', 'dubrovny', dubrovnyWK);
        await crTexture.set('whiteC', 'dubrovny', dubrovnyWK);
        await crTexture.set('whiteY', 'dubrovny', dubrovnyWQ);
        await crTexture.set('whiteU', 'dubrovny', dubrovnyWN);
        await crTexture.set('whiteD', 'dubrovny', dubrovnyWN);
      }
      else if(this.state.pieceSet === 'fresca') {
        await crTexture.set('blackP', 'fresca', frescaBP);
        await crTexture.set('blackW', 'fresca', frescaBP);
        await crTexture.set('blackB', 'fresca', frescaBB);
        await crTexture.set('blackN', 'fresca', frescaBN);
        await crTexture.set('blackR', 'fresca', frescaBR);
        await crTexture.set('blackS', 'fresca', frescaBQ);
        await crTexture.set('blackQ', 'fresca', frescaBQ);
        await crTexture.set('blackK', 'fresca', frescaBK);
        await crTexture.set('blackC', 'fresca', frescaBK);
        await crTexture.set('blackY', 'fresca', frescaBQ);
        await crTexture.set('blackU', 'fresca', frescaBN);
        await crTexture.set('blackD', 'fresca', frescaBN);
        await crTexture.set('whiteP', 'fresca', frescaWP);
        await crTexture.set('whiteW', 'fresca', frescaWP);
        await crTexture.set('whiteB', 'fresca', frescaWB);
        await crTexture.set('whiteN', 'fresca', frescaWN);
        await crTexture.set('whiteR', 'fresca', frescaWR);
        await crTexture.set('whiteS', 'fresca', frescaWQ);
        await crTexture.set('whiteQ', 'fresca', frescaWQ);
        await crTexture.set('whiteK', 'fresca', frescaWK);
        await crTexture.set('whiteC', 'fresca', frescaWK);
        await crTexture.set('whiteY', 'fresca', frescaWQ);
        await crTexture.set('whiteU', 'fresca', frescaWN);
        await crTexture.set('whiteD', 'fresca', frescaWN);
      }
      else if(this.state.pieceSet === 'gioco') {
        await crTexture.set('blackP', 'gioco', giocoBP);
        await crTexture.set('blackW', 'gioco', giocoBP);
        await crTexture.set('blackB', 'gioco', giocoBB);
        await crTexture.set('blackN', 'gioco', giocoBN);
        await crTexture.set('blackR', 'gioco', giocoBR);
        await crTexture.set('blackS', 'gioco', giocoBQ);
        await crTexture.set('blackQ', 'gioco', giocoBQ);
        await crTexture.set('blackK', 'gioco', giocoBK);
        await crTexture.set('blackC', 'gioco', giocoBK);
        await crTexture.set('blackY', 'gioco', giocoBQ);
        await crTexture.set('blackU', 'gioco', giocoBN);
        await crTexture.set('blackD', 'gioco', giocoBN);
        await crTexture.set('whiteP', 'gioco', giocoWP);
        await crTexture.set('whiteW', 'gioco', giocoWP);
        await crTexture.set('whiteB', 'gioco', giocoWB);
        await crTexture.set('whiteN', 'gioco', giocoWN);
        await crTexture.set('whiteR', 'gioco', giocoWR);
        await crTexture.set('whiteS', 'gioco', giocoWQ);
        await crTexture.set('whiteQ', 'gioco', giocoWQ);
        await crTexture.set('whiteK', 'gioco', giocoWK);
        await crTexture.set('whiteC', 'gioco', giocoWK);
        await crTexture.set('whiteY', 'gioco', giocoWQ);
        await crTexture.set('whiteU', 'gioco', giocoWN);
        await crTexture.set('whiteD', 'gioco', giocoWN);
      }
      else if(this.state.pieceSet === 'governor') {
        await crTexture.set('blackP', 'governor', governorBP);
        await crTexture.set('blackW', 'governor', governorBP);
        await crTexture.set('blackB', 'governor', governorBB);
        await crTexture.set('blackN', 'governor', governorBN);
        await crTexture.set('blackR', 'governor', governorBR);
        await crTexture.set('blackS', 'governor', governorBQ);
        await crTexture.set('blackQ', 'governor', governorBQ);
        await crTexture.set('blackK', 'governor', governorBK);
        await crTexture.set('blackC', 'governor', governorBK);
        await crTexture.set('blackY', 'governor', governorBQ);
        await crTexture.set('blackU', 'governor', governorBN);
        await crTexture.set('blackD', 'governor', governorBN);
        await crTexture.set('whiteP', 'governor', governorWP);
        await crTexture.set('whiteW', 'governor', governorWP);
        await crTexture.set('whiteB', 'governor', governorWB);
        await crTexture.set('whiteN', 'governor', governorWN);
        await crTexture.set('whiteR', 'governor', governorWR);
        await crTexture.set('whiteS', 'governor', governorWQ);
        await crTexture.set('whiteQ', 'governor', governorWQ);
        await crTexture.set('whiteK', 'governor', governorWK);
        await crTexture.set('whiteC', 'governor', governorWK);
        await crTexture.set('whiteY', 'governor', governorWQ);
        await crTexture.set('whiteU', 'governor', governorWN);
        await crTexture.set('whiteD', 'governor', governorWN);
      }
      else if(this.state.pieceSet === 'horsey') {
        await crTexture.set('blackP', 'horsey', horseyBP);
        await crTexture.set('blackW', 'horsey', horseyBP);
        await crTexture.set('blackB', 'horsey', horseyBB);
        await crTexture.set('blackN', 'horsey', horseyBN);
        await crTexture.set('blackR', 'horsey', horseyBR);
        await crTexture.set('blackS', 'horsey', horseyBQ);
        await crTexture.set('blackQ', 'horsey', horseyBQ);
        await crTexture.set('blackK', 'horsey', horseyBK);
        await crTexture.set('blackC', 'horsey', horseyBK);
        await crTexture.set('blackY', 'horsey', horseyBQ);
        await crTexture.set('blackU', 'horsey', horseyBN);
        await crTexture.set('blackD', 'horsey', horseyBN);
        await crTexture.set('whiteP', 'horsey', horseyWP);
        await crTexture.set('whiteW', 'horsey', horseyWP);
        await crTexture.set('whiteB', 'horsey', horseyWB);
        await crTexture.set('whiteN', 'horsey', horseyWN);
        await crTexture.set('whiteR', 'horsey', horseyWR);
        await crTexture.set('whiteS', 'horsey', horseyWQ);
        await crTexture.set('whiteQ', 'horsey', horseyWQ);
        await crTexture.set('whiteK', 'horsey', horseyWK);
        await crTexture.set('whiteC', 'horsey', horseyWK);
        await crTexture.set('whiteY', 'horsey', horseyWQ);
        await crTexture.set('whiteU', 'horsey', horseyWN);
        await crTexture.set('whiteD', 'horsey', horseyWN);
      }
      else if(this.state.pieceSet === 'icpieces') {
        await crTexture.set('blackP', 'icpieces', icpiecesBP);
        await crTexture.set('blackW', 'icpieces', icpiecesBP);
        await crTexture.set('blackB', 'icpieces', icpiecesBB);
        await crTexture.set('blackN', 'icpieces', icpiecesBN);
        await crTexture.set('blackR', 'icpieces', icpiecesBR);
        await crTexture.set('blackS', 'icpieces', icpiecesBQ);
        await crTexture.set('blackQ', 'icpieces', icpiecesBQ);
        await crTexture.set('blackK', 'icpieces', icpiecesBK);
        await crTexture.set('blackC', 'icpieces', icpiecesBK);
        await crTexture.set('blackY', 'icpieces', icpiecesBQ);
        await crTexture.set('blackU', 'icpieces', icpiecesBN);
        await crTexture.set('blackD', 'icpieces', icpiecesBN);
        await crTexture.set('whiteP', 'icpieces', icpiecesWP);
        await crTexture.set('whiteW', 'icpieces', icpiecesWP);
        await crTexture.set('whiteB', 'icpieces', icpiecesWB);
        await crTexture.set('whiteN', 'icpieces', icpiecesWN);
        await crTexture.set('whiteR', 'icpieces', icpiecesWR);
        await crTexture.set('whiteS', 'icpieces', icpiecesWQ);
        await crTexture.set('whiteQ', 'icpieces', icpiecesWQ);
        await crTexture.set('whiteK', 'icpieces', icpiecesWK);
        await crTexture.set('whiteC', 'icpieces', icpiecesWK);
        await crTexture.set('whiteY', 'icpieces', icpiecesWQ);
        await crTexture.set('whiteU', 'icpieces', icpiecesWN);
        await crTexture.set('whiteD', 'icpieces', icpiecesWN);
      }
      else if(this.state.pieceSet === 'kosal') {
        await crTexture.set('blackP', 'kosal', kosalBP);
        await crTexture.set('blackW', 'kosal', kosalBP);
        await crTexture.set('blackB', 'kosal', kosalBB);
        await crTexture.set('blackN', 'kosal', kosalBN);
        await crTexture.set('blackR', 'kosal', kosalBR);
        await crTexture.set('blackS', 'kosal', kosalBQ);
        await crTexture.set('blackQ', 'kosal', kosalBQ);
        await crTexture.set('blackK', 'kosal', kosalBK);
        await crTexture.set('blackC', 'kosal', kosalBK);
        await crTexture.set('blackY', 'kosal', kosalBQ);
        await crTexture.set('blackU', 'kosal', kosalBN);
        await crTexture.set('blackD', 'kosal', kosalBN);
        await crTexture.set('whiteP', 'kosal', kosalWP);
        await crTexture.set('whiteW', 'kosal', kosalWP);
        await crTexture.set('whiteB', 'kosal', kosalWB);
        await crTexture.set('whiteN', 'kosal', kosalWN);
        await crTexture.set('whiteR', 'kosal', kosalWR);
        await crTexture.set('whiteS', 'kosal', kosalWQ);
        await crTexture.set('whiteQ', 'kosal', kosalWQ);
        await crTexture.set('whiteK', 'kosal', kosalWK);
        await crTexture.set('whiteC', 'kosal', kosalWK);
        await crTexture.set('whiteY', 'kosal', kosalWQ);
        await crTexture.set('whiteU', 'kosal', kosalWN);
        await crTexture.set('whiteD', 'kosal', kosalWN);
      }
      else if(this.state.pieceSet === 'letter') {
        await crTexture.set('blackP', 'letter', letterBP);
        await crTexture.set('blackW', 'letter', letterBP);
        await crTexture.set('blackB', 'letter', letterBB);
        await crTexture.set('blackN', 'letter', letterBN);
        await crTexture.set('blackR', 'letter', letterBR);
        await crTexture.set('blackS', 'letter', letterBQ);
        await crTexture.set('blackQ', 'letter', letterBQ);
        await crTexture.set('blackK', 'letter', letterBK);
        await crTexture.set('blackC', 'letter', letterBK);
        await crTexture.set('blackY', 'letter', letterBQ);
        await crTexture.set('blackU', 'letter', letterBN);
        await crTexture.set('blackD', 'letter', letterBN);
        await crTexture.set('whiteP', 'letter', letterWP);
        await crTexture.set('whiteW', 'letter', letterWP);
        await crTexture.set('whiteB', 'letter', letterWB);
        await crTexture.set('whiteN', 'letter', letterWN);
        await crTexture.set('whiteR', 'letter', letterWR);
        await crTexture.set('whiteS', 'letter', letterWQ);
        await crTexture.set('whiteQ', 'letter', letterWQ);
        await crTexture.set('whiteK', 'letter', letterWK);
        await crTexture.set('whiteC', 'letter', letterWK);
        await crTexture.set('whiteY', 'letter', letterWQ);
        await crTexture.set('whiteU', 'letter', letterWN);
        await crTexture.set('whiteD', 'letter', letterWN);
      }
      else if(this.state.pieceSet === 'libra') {
        await crTexture.set('blackP', 'libra', libraBP);
        await crTexture.set('blackW', 'libra', libraBP);
        await crTexture.set('blackB', 'libra', libraBB);
        await crTexture.set('blackN', 'libra', libraBN);
        await crTexture.set('blackR', 'libra', libraBR);
        await crTexture.set('blackS', 'libra', libraBQ);
        await crTexture.set('blackQ', 'libra', libraBQ);
        await crTexture.set('blackK', 'libra', libraBK);
        await crTexture.set('blackC', 'libra', libraBK);
        await crTexture.set('blackY', 'libra', libraBQ);
        await crTexture.set('blackU', 'libra', libraBN);
        await crTexture.set('blackD', 'libra', libraBN);
        await crTexture.set('whiteP', 'libra', libraWP);
        await crTexture.set('whiteW', 'libra', libraWP);
        await crTexture.set('whiteB', 'libra', libraWB);
        await crTexture.set('whiteN', 'libra', libraWN);
        await crTexture.set('whiteR', 'libra', libraWR);
        await crTexture.set('whiteS', 'libra', libraWQ);
        await crTexture.set('whiteQ', 'libra', libraWQ);
        await crTexture.set('whiteK', 'libra', libraWK);
        await crTexture.set('whiteC', 'libra', libraWK);
        await crTexture.set('whiteY', 'libra', libraWQ);
        await crTexture.set('whiteU', 'libra', libraWN);
        await crTexture.set('whiteD', 'libra', libraWN);
      }
      else if(this.state.pieceSet === 'maestro') {
        await crTexture.set('blackP', 'maestro', maestroBP);
        await crTexture.set('blackW', 'maestro', maestroBP);
        await crTexture.set('blackB', 'maestro', maestroBB);
        await crTexture.set('blackN', 'maestro', maestroBN);
        await crTexture.set('blackR', 'maestro', maestroBR);
        await crTexture.set('blackS', 'maestro', maestroBQ);
        await crTexture.set('blackQ', 'maestro', maestroBQ);
        await crTexture.set('blackK', 'maestro', maestroBK);
        await crTexture.set('blackC', 'maestro', maestroBK);
        await crTexture.set('blackY', 'maestro', maestroBQ);
        await crTexture.set('blackU', 'maestro', maestroBN);
        await crTexture.set('blackD', 'maestro', maestroBN);
        await crTexture.set('whiteP', 'maestro', maestroWP);
        await crTexture.set('whiteW', 'maestro', maestroWP);
        await crTexture.set('whiteB', 'maestro', maestroWB);
        await crTexture.set('whiteN', 'maestro', maestroWN);
        await crTexture.set('whiteR', 'maestro', maestroWR);
        await crTexture.set('whiteS', 'maestro', maestroWQ);
        await crTexture.set('whiteQ', 'maestro', maestroWQ);
        await crTexture.set('whiteK', 'maestro', maestroWK);
        await crTexture.set('whiteC', 'maestro', maestroWK);
        await crTexture.set('whiteY', 'maestro', maestroWQ);
        await crTexture.set('whiteU', 'maestro', maestroWN);
        await crTexture.set('whiteD', 'maestro', maestroWN);
      }
      else if(this.state.pieceSet === 'merida') {
        await crTexture.set('blackP', 'merida', meridaBP);
        await crTexture.set('blackW', 'merida', meridaBP);
        await crTexture.set('blackB', 'merida', meridaBB);
        await crTexture.set('blackN', 'merida', meridaBN);
        await crTexture.set('blackR', 'merida', meridaBR);
        await crTexture.set('blackS', 'merida', meridaBQ);
        await crTexture.set('blackQ', 'merida', meridaBQ);
        await crTexture.set('blackK', 'merida', meridaBK);
        await crTexture.set('blackC', 'merida', meridaBK);
        await crTexture.set('blackY', 'merida', meridaBQ);
        await crTexture.set('blackU', 'merida', meridaBN);
        await crTexture.set('blackD', 'merida', meridaBN);
        await crTexture.set('whiteP', 'merida', meridaWP);
        await crTexture.set('whiteW', 'merida', meridaWP);
        await crTexture.set('whiteB', 'merida', meridaWB);
        await crTexture.set('whiteN', 'merida', meridaWN);
        await crTexture.set('whiteR', 'merida', meridaWR);
        await crTexture.set('whiteS', 'merida', meridaWQ);
        await crTexture.set('whiteQ', 'merida', meridaWQ);
        await crTexture.set('whiteK', 'merida', meridaWK);
        await crTexture.set('whiteC', 'merida', meridaWK);
        await crTexture.set('whiteY', 'merida', meridaWQ);
        await crTexture.set('whiteU', 'merida', meridaWN);
        await crTexture.set('whiteD', 'merida', meridaWN);
      }
      else if(this.state.pieceSet === 'mono') {
        await crTexture.set('blackP', 'mono', monoP);
        await crTexture.set('blackW', 'mono', monoP);
        await crTexture.set('blackB', 'mono', monoB);
        await crTexture.set('blackN', 'mono', monoN);
        await crTexture.set('blackR', 'mono', monoR);
        await crTexture.set('blackS', 'mono', monoQ);
        await crTexture.set('blackQ', 'mono', monoQ);
        await crTexture.set('blackK', 'mono', monoK);
        await crTexture.set('blackC', 'mono', monoK);
        await crTexture.set('blackY', 'mono', monoQ);
        await crTexture.set('blackU', 'mono', monoN);
        await crTexture.set('blackD', 'mono', monoN);
        await crTexture.set('whiteP', 'mono', monoP);
        await crTexture.set('whiteW', 'mono', monoP);
        await crTexture.set('whiteB', 'mono', monoB);
        await crTexture.set('whiteN', 'mono', monoN);
        await crTexture.set('whiteR', 'mono', monoR);
        await crTexture.set('whiteS', 'mono', monoQ);
        await crTexture.set('whiteQ', 'mono', monoQ);
        await crTexture.set('whiteK', 'mono', monoK);
        await crTexture.set('whiteC', 'mono', monoK);
        await crTexture.set('whiteY', 'mono', monoQ);
        await crTexture.set('whiteU', 'mono', monoN);
        await crTexture.set('whiteD', 'mono', monoN);
      }
      else if(this.state.pieceSet === 'pirouetti') {
        await crTexture.set('blackP', 'pirouetti', pirouettiBP);
        await crTexture.set('blackW', 'pirouetti', pirouettiBP);
        await crTexture.set('blackB', 'pirouetti', pirouettiBB);
        await crTexture.set('blackN', 'pirouetti', pirouettiBN);
        await crTexture.set('blackR', 'pirouetti', pirouettiBR);
        await crTexture.set('blackS', 'pirouetti', pirouettiBQ);
        await crTexture.set('blackQ', 'pirouetti', pirouettiBQ);
        await crTexture.set('blackK', 'pirouetti', pirouettiBK);
        await crTexture.set('blackC', 'pirouetti', pirouettiBK);
        await crTexture.set('blackY', 'pirouetti', pirouettiBQ);
        await crTexture.set('blackU', 'pirouetti', pirouettiBN);
        await crTexture.set('blackD', 'pirouetti', pirouettiBN);
        await crTexture.set('whiteP', 'pirouetti', pirouettiWP);
        await crTexture.set('whiteW', 'pirouetti', pirouettiWP);
        await crTexture.set('whiteB', 'pirouetti', pirouettiWB);
        await crTexture.set('whiteN', 'pirouetti', pirouettiWN);
        await crTexture.set('whiteR', 'pirouetti', pirouettiWR);
        await crTexture.set('whiteS', 'pirouetti', pirouettiWQ);
        await crTexture.set('whiteQ', 'pirouetti', pirouettiWQ);
        await crTexture.set('whiteK', 'pirouetti', pirouettiWK);
        await crTexture.set('whiteC', 'pirouetti', pirouettiWK);
        await crTexture.set('whiteY', 'pirouetti', pirouettiWQ);
        await crTexture.set('whiteU', 'pirouetti', pirouettiWN);
        await crTexture.set('whiteD', 'pirouetti', pirouettiWN);
      }
      else if(this.state.pieceSet === 'pixel') {
        await crTexture.set('blackP', 'pixel', pixelBP);
        await crTexture.set('blackW', 'pixel', pixelBP);
        await crTexture.set('blackB', 'pixel', pixelBB);
        await crTexture.set('blackN', 'pixel', pixelBN);
        await crTexture.set('blackR', 'pixel', pixelBR);
        await crTexture.set('blackS', 'pixel', pixelBQ);
        await crTexture.set('blackQ', 'pixel', pixelBQ);
        await crTexture.set('blackK', 'pixel', pixelBK);
        await crTexture.set('blackC', 'pixel', pixelBK);
        await crTexture.set('blackY', 'pixel', pixelBQ);
        await crTexture.set('blackU', 'pixel', pixelBN);
        await crTexture.set('blackD', 'pixel', pixelBN);
        await crTexture.set('whiteP', 'pixel', pixelWP);
        await crTexture.set('whiteW', 'pixel', pixelWP);
        await crTexture.set('whiteB', 'pixel', pixelWB);
        await crTexture.set('whiteN', 'pixel', pixelWN);
        await crTexture.set('whiteR', 'pixel', pixelWR);
        await crTexture.set('whiteS', 'pixel', pixelWQ);
        await crTexture.set('whiteQ', 'pixel', pixelWQ);
        await crTexture.set('whiteK', 'pixel', pixelWK);
        await crTexture.set('whiteC', 'pixel', pixelWK);
        await crTexture.set('whiteY', 'pixel', pixelWQ);
        await crTexture.set('whiteU', 'pixel', pixelWN);
        await crTexture.set('whiteD', 'pixel', pixelWN);
      }
      else if(this.state.pieceSet === 'shapes') {
        await crTexture.set('blackP', 'shapes', shapesBP);
        await crTexture.set('blackW', 'shapes', shapesBP);
        await crTexture.set('blackB', 'shapes', shapesBB);
        await crTexture.set('blackN', 'shapes', shapesBN);
        await crTexture.set('blackR', 'shapes', shapesBR);
        await crTexture.set('blackS', 'shapes', shapesBQ);
        await crTexture.set('blackQ', 'shapes', shapesBQ);
        await crTexture.set('blackK', 'shapes', shapesBK);
        await crTexture.set('blackC', 'shapes', shapesBK);
        await crTexture.set('blackY', 'shapes', shapesBQ);
        await crTexture.set('blackU', 'shapes', shapesBN);
        await crTexture.set('blackD', 'shapes', shapesBN);
        await crTexture.set('whiteP', 'shapes', shapesWP);
        await crTexture.set('whiteW', 'shapes', shapesWP);
        await crTexture.set('whiteB', 'shapes', shapesWB);
        await crTexture.set('whiteN', 'shapes', shapesWN);
        await crTexture.set('whiteR', 'shapes', shapesWR);
        await crTexture.set('whiteS', 'shapes', shapesWQ);
        await crTexture.set('whiteQ', 'shapes', shapesWQ);
        await crTexture.set('whiteK', 'shapes', shapesWK);
        await crTexture.set('whiteC', 'shapes', shapesWK);
        await crTexture.set('whiteY', 'shapes', shapesWQ);
        await crTexture.set('whiteU', 'shapes', shapesWN);
        await crTexture.set('whiteD', 'shapes', shapesWN);
      }
      else if(this.state.pieceSet === 'staunty') {
        await crTexture.set('blackP', 'staunty', stauntyBP);
        await crTexture.set('blackW', 'staunty', stauntyBP);
        await crTexture.set('blackB', 'staunty', stauntyBB);
        await crTexture.set('blackN', 'staunty', stauntyBN);
        await crTexture.set('blackR', 'staunty', stauntyBR);
        await crTexture.set('blackS', 'staunty', stauntyBQ);
        await crTexture.set('blackQ', 'staunty', stauntyBQ);
        await crTexture.set('blackK', 'staunty', stauntyBK);
        await crTexture.set('blackC', 'staunty', stauntyBK);
        await crTexture.set('blackY', 'staunty', stauntyBQ);
        await crTexture.set('blackU', 'staunty', stauntyBN);
        await crTexture.set('blackD', 'staunty', stauntyBN);
        await crTexture.set('whiteP', 'staunty', stauntyWP);
        await crTexture.set('whiteW', 'staunty', stauntyWP);
        await crTexture.set('whiteB', 'staunty', stauntyWB);
        await crTexture.set('whiteN', 'staunty', stauntyWN);
        await crTexture.set('whiteR', 'staunty', stauntyWR);
        await crTexture.set('whiteS', 'staunty', stauntyWQ);
        await crTexture.set('whiteQ', 'staunty', stauntyWQ);
        await crTexture.set('whiteK', 'staunty', stauntyWK);
        await crTexture.set('whiteC', 'staunty', stauntyWK);
        await crTexture.set('whiteY', 'staunty', stauntyWQ);
        await crTexture.set('whiteU', 'staunty', stauntyWN);
        await crTexture.set('whiteD', 'staunty', stauntyWN);
      }
      else if(this.state.pieceSet === 'tatiana') {
        await crTexture.set('blackP', 'tatiana', tatianaBP);
        await crTexture.set('blackW', 'tatiana', tatianaBP);
        await crTexture.set('blackB', 'tatiana', tatianaBB);
        await crTexture.set('blackN', 'tatiana', tatianaBN);
        await crTexture.set('blackR', 'tatiana', tatianaBR);
        await crTexture.set('blackS', 'tatiana', tatianaBQ);
        await crTexture.set('blackQ', 'tatiana', tatianaBQ);
        await crTexture.set('blackK', 'tatiana', tatianaBK);
        await crTexture.set('blackC', 'tatiana', tatianaBK);
        await crTexture.set('blackY', 'tatiana', tatianaBQ);
        await crTexture.set('blackU', 'tatiana', tatianaBN);
        await crTexture.set('blackD', 'tatiana', tatianaBN);
        await crTexture.set('whiteP', 'tatiana', tatianaWP);
        await crTexture.set('whiteW', 'tatiana', tatianaWP);
        await crTexture.set('whiteB', 'tatiana', tatianaWB);
        await crTexture.set('whiteN', 'tatiana', tatianaWN);
        await crTexture.set('whiteR', 'tatiana', tatianaWR);
        await crTexture.set('whiteS', 'tatiana', tatianaWQ);
        await crTexture.set('whiteQ', 'tatiana', tatianaWQ);
        await crTexture.set('whiteK', 'tatiana', tatianaWK);
        await crTexture.set('whiteC', 'tatiana', tatianaWK);
        await crTexture.set('whiteY', 'tatiana', tatianaWQ);
        await crTexture.set('whiteU', 'tatiana', tatianaWN);
        await crTexture.set('whiteD', 'tatiana', tatianaWN);
      }
      if(this.props.emitter !== null) {
        this.props.emitter.emit('textureUpdate');
      }
    }
  }
  componentDidMount() {
    this.extractPieceSet();
    this.textureListener = this.context.on('textureUpdate', () => {
      this.extractPieceSet();
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.pieceSet !== this.state.pieceSet) {
      await this.updatePieceSet();
    }
  }
  componentWillUnmount() {
    //Stop listening to texture changes
    if(typeof this.textureListener === 'function') { this.textureListener(); }
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
          <MenuItem value='california'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={californiaWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={californiaBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                California
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='cardinal'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={cardinalWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={cardinalBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Cardinal
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='cburnett'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={cburnettWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={cburnettBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                C. Burnett
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='chessnut'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={chessnutWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={chessnutBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Chessnut
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='default'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={defaultWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={defaultBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                <i><Trans>Default</Trans></i>
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='default_v2'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={default2WN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={default2BR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                <Trans>Default V2</Trans>
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='dubrovny'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={dubrovnyWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={dubrovnyBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Dubrovny
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='fresca'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={frescaWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={frescaBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Fresca
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='gioco'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={giocoWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={giocoBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Gioco
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='governor'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={governorWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={governorBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Governor
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='horsey'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={horseyWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={horseyBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Horsey
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='icpieces'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={icpiecesWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={icpiecesBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                ICPieces
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='kosal'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={kosalWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={kosalBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Kosal
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='letter'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={letterWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={letterBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Letter
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='libra'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={libraWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={libraBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Libra
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='maestro'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={maestroWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={maestroBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Maestro
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='merida'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={meridaWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={meridaBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Merida
              </Box>
            </Box>
          </MenuItem>
          {/* TODO Add piece palette option to allow tinting pieces
          <MenuItem value='mono'>
            <Box display='flex'>
              <img alt='Knight Piece' src={monoN} style={{ height: 40 }} />
              <img alt='Knight Piece' src={monoR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Mono
              </Box>
            </Box>
          </MenuItem>
          */}
          <MenuItem value='pirouetti'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={pirouettiWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={pirouettiBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Pirouetti
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='pixel'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={pixelWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={pixelBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Pixel
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='shapes'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={shapesWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={shapesBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Shapes
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='staunty'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={stauntyWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={stauntyBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Staunty
              </Box>
            </Box>
          </MenuItem>
          <MenuItem value='tatiana'>
            <Box display='flex'>
              <img alt='White Knight Piece' src={tatianaWN} style={{ height: 40 }} />
              <img alt='Black Knight Piece' src={tatianaBR} style={{ height: 40 }} />
              <Box ml={1} mt='auto' mb='auto' alignItems='center'>
                Tatiana
              </Box>
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

export const resetPieceSet = async (emitter = null) => {
  await crTexture.set('blackP', 'default', defaultBP);
  await crTexture.set('blackW', 'default', defaultBW);
  await crTexture.set('blackB', 'default', defaultBB);
  await crTexture.set('blackN', 'default', defaultBN);
  await crTexture.set('blackR', 'default', defaultBR);
  await crTexture.set('blackS', 'default', defaultBS);
  await crTexture.set('blackQ', 'default', defaultBQ);
  await crTexture.set('blackK', 'default', defaultBK);
  await crTexture.set('blackC', 'default', defaultBC);
  await crTexture.set('blackY', 'default', defaultBY);
  await crTexture.set('blackU', 'default', defaultBU);
  await crTexture.set('blackD', 'default', defaultBD);
  await crTexture.set('whiteP', 'default', defaultWP);
  await crTexture.set('whiteW', 'default', defaultWW);
  await crTexture.set('whiteB', 'default', defaultWB);
  await crTexture.set('whiteN', 'default', defaultWN);
  await crTexture.set('whiteR', 'default', defaultWR);
  await crTexture.set('whiteS', 'default', defaultWS);
  await crTexture.set('whiteQ', 'default', defaultWQ);
  await crTexture.set('whiteK', 'default', defaultWK);
  await crTexture.set('whiteC', 'default', defaultWC);
  await crTexture.set('whiteY', 'default', defaultWY);
  await crTexture.set('whiteU', 'default', defaultWU);
  await crTexture.set('whiteD', 'default', defaultWD);
  if(emitter !== null) {
    emitter.emit('textureUpdate');
  }
}
