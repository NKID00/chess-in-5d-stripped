import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import SelectAllIcon from '@material-ui/icons/SelectAll';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

export default class ViewMenu extends React.Component {
  render() {
    return (
      <Card>
        <Box m={1}>
          <ButtonGroup fullWidth>
            <Button
              startIcon={<SelectAllIcon />}
              onClick={() => {
                if(typeof this.props.onUndo === 'function') {
                  this.props.onPresentZoom();
                }
              }}
            >
              Present
            </Button>
            <Button
              startIcon={<ZoomOutMapIcon />}
              onClick={() => {
                if(typeof this.props.onSubmit === 'function') {
                  this.props.onFullboardZoom();
                }
              }}
            >
              Full
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    );
  }
}
