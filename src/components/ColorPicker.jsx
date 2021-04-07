import React from 'react';

import { CompactPicker } from 'react-color';

import * as PIXI from 'pixi.js';

export default class ColorPicker extends React.Component {
  render() {
    return (
      <CompactPicker
        color={{
          r: Math.round(PIXI.utils.hex2rgb(this.props.color)[0] * 255),
          g: Math.round(PIXI.utils.hex2rgb(this.props.color)[1] * 255),
          b: Math.round(PIXI.utils.hex2rgb(this.props.color)[2] * 255),
        }}
        onChange={(c) => {
          var hex = PIXI.utils.rgb2hex([c.rgb.r/255, c.rgb.g/255, c.rgb.b/255]);
          if(typeof this.props.onChange === 'function') {
            this.props.onChange(hex);
          }
        }}
      />
    );
  }
}