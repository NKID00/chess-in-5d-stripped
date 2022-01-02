import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';

//Available non-monospaced fonts
import '@fontsource/domine';
import '@fontsource/exo';
import '@fontsource/fira-sans';
import '@fontsource/eb-garamond';
import '@fontsource/merriweather';
import '@fontsource/newsreader';
import '@fontsource/open-sans';
import '@fontsource/playfair-display';
import '@fontsource/roboto-condensed';
import '@fontsource/roboto';
import '@fontsource/vollkorn';

//Available monospaced fonts
import '@fontsource/roboto-mono';

export const RegularFont = [
  <MenuItem value='domine' style={{ fontFamily: 'domine' }}>
    Domine
  </MenuItem>,
  <MenuItem value='exo' style={{ fontFamily: 'exo' }}>
    Exo
  </MenuItem>,
  <MenuItem value='fira sans' style={{ fontFamily: 'fira sans' }}>
    Fira Sans
  </MenuItem>,
  <MenuItem value='eb garamond' style={{ fontFamily: 'eb garamond' }}>
    EB Garamond
  </MenuItem>,
  <MenuItem value='merriweather' style={{ fontFamily: 'merriweather' }}>
    Merriweather
  </MenuItem>,
  <MenuItem value='newsreader' style={{ fontFamily: 'newsreader' }}>
    Newsreader
  </MenuItem>,
  <MenuItem value='open sans' style={{ fontFamily: 'open sans' }}>
    Open Sans
  </MenuItem>,
  <MenuItem value='playfair display' style={{ fontFamily: 'playfair display' }}>
    Playfair Display
  </MenuItem>,
  <MenuItem value='roboto condensed' style={{ fontFamily: 'roboto condensed' }}>
    Roboto Condensed
  </MenuItem>,
  <MenuItem value='roboto' style={{ fontFamily: 'roboto' }}>
    Roboto
  </MenuItem>,
  <MenuItem value='vollkorn' style={{ fontFamily: 'vollkorn' }}>
    Vollkorn
  </MenuItem>
];

export const MonospaceFont = [
  <MenuItem value='roboto mono' style={{ fontFamily: 'roboto mono' }}>
    Roboto Mono
  </MenuItem>
];