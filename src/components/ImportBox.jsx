import React from 'react';

import {Controlled as CodeMirror} from 'react-codemirror2';
import { Box } from 'rebass';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/addon/mode/simple');
require('components/NotationMode');

export default class ImportBox extends React.Component {
  render() {
    return (
      <Box width={1} p={2} height='100%'>
        <Box my={2} width={1} sx={{
          borderWidth: '1px',
          borderColor: '#4f4f4f',
          borderStyle: 'solid',
          fontSize: '14pt',
          height: '80%'
        }}>
          <CodeMirror
            value={this.props.value}
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
        <Box my={2} width={1} height='20%'>
          <FilePond
            maxFiles={1}
            allowMultiple={false}
            onupdatefiles={(files) => {
              if(files.length > 0) {
                files[0].file.text().then((input) => {    
                  if(typeof this.props.onChange === 'function') {
                    this.props.onChange(input);
                  }
                });
              }
            }}
          />
        </Box>
      </Box>
    );
  }
}
