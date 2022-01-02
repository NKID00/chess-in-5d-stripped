import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import copy from 'copy-to-clipboard';

import { compressLink } from 'utils/LinkCompression';
import {Controlled as CodeMirror} from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
require('codemirror/addon/mode/simple');
require('components/CodeMirror/NotationMode');

const fileDownload = require('js-file-download');

/*
Props
 - open
 - onClose
 - notation
*/
class ExportNotation extends React.Component {
  state = {
    import: ''
  }
  getLink() {
    if(typeof this.props.notation === 'string') {
      return `${window.location.origin}/#/analyze?import=${compressLink(this.props.notation)}`;
    }
    return '';
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        maxWidth='lg'
        fullWidth
      >
        <DialogTitle>
          <Trans>Export Notation</Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Trans>Link:</Trans>
                <br />
                <div style={{ maxHeight: '10vh', overflow: 'auto' }}>
                  <Link
                    href={this.getLink()}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      wordWrap: 'break-word'
                    }}
                  >
                    {this.getLink()}
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12}>
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
                    options={{
                      mode: 'notation',
                      theme: 'mdn-like'
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => { 
              if(typeof this.props.onClose === 'function') {
                this.props.onClose();
              }
            }}
          >
            <Trans>Close</Trans>
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              copy(this.getLink());
            }}
          >
            <Trans>Copy link to clipboard</Trans>
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {
              copy(this.props.notation);
            }}
          >
            <Trans>Copy to clipboard</Trans>
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              fileDownload(this.props.notation, 'chessin5d-' + (Date.now()) + '.5dpgn');
            }}
          >
            <Trans>Export to file</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withRouter(ExportNotation);