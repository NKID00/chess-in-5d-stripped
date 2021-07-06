import React from 'react';

import Box from '@material-ui/core/Box';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/addon/mode/simple');
require('components/CodeMirror/NotationMode');

export default class RawNotation extends React.Component {
  render() {
    return (
      <Box m={2}>
        <Box
          height={1}
          width={1}
          sx={{
            borderWidth: '1px',
            borderColor: '#4f4f4f',
            borderStyle: 'solid',
          }}
        >
          <CodeMirror
            value={this.props.notation}
            onBeforeChange={(e, d, v) => {
              if(typeof this.props.onChange === 'function') {
                this.props.onChange(v);
              }
            }}
            options={{
              mode: 'notation',
              theme: 'mdn-like'
            }}
          />
        </Box>
      </Box>
    );
  }
}
