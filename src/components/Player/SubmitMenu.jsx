import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SendIcon from '@material-ui/icons/Send';
import UndoIcon from '@material-ui/icons/Undo';

export default class SubmitMenu extends React.Component {
  render() {
    return (
      <Card>
        <Box m={1}>
          <ButtonGroup fullWidth>
            <Button
              startIcon={<UndoIcon />}
              onClick={() => {
                if(typeof this.props.onUndo === 'function') {
                  this.props.onUndo();
                }
              }}
            >
              Undo
            </Button>
            <Button
              variant='contained'
              color='primary'
              endIcon={<SendIcon />}
              onClick={() => {
                if(typeof this.props.onSubmit === 'function') {
                  this.props.onSubmit();
                }
              }}
            >
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    );
  }
}
