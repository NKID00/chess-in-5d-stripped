import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment  from '@material-ui/core/InputAdornment';
import InputLabel  from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import EmitterContext from 'utils/EmitterContext';
import * as hotkeys from 'state/hotkeys';

/*
Props:
 - hotkeyTarget
 - label
*/
export default class HotkeyPicker extends React.Component {
  static contextType = EmitterContext;
  state = {
    addMode: false,
    hotkeys: hotkeys.get()
  }
  componentDidMount() {
    //Update state if hotkeys are changed
    this.hotkeysListener = this.context.on('hotkeysUpdate', () => {
      this.setState({ hotkeys: hotkeys.get() });
    });
  }
  componentWillUnmount() {
    //Stop listening to hotkeys changes
    if(typeof this.hotkeysListener === 'function') { this.hotkeysListener(); }
  }
  render() {
    return (
      <FormControl variant='outlined' fullWidth>
        <InputLabel>{this.props.label}</InputLabel>
        <OutlinedInput
          variant='outlined'
          value={this.state.hotkeys[this.props.hotkeyTarget]}
          label={this.props.label}
          onKeyDown={(event) => {
            event.preventDefault();
            let currKey = event.key;
            if(currKey.length === 1) {
              currKey = currKey.toUpperCase();
            }
            if(
              currKey !== 'Control' &&
              currKey !== 'Shift' &&
              currKey !== 'Alt' &&
              currKey !== 'Meta' &&
              currKey !== ',' &&
              !event.repeat
            ) {
              let delim = currKey !== '+' ? '+' : '-';
              let target = '';
              if(event.ctrlKey) {
                target += 'Ctrl' + delim;
              }
              if(event.altKey) {
                target += 'Alt' + delim;
              }
              if(event.shiftKey) {
                target += 'Shift' + delim;
              }
              target += currKey;
              let currHotkey = hotkeys.get();
              let currHotkeyLine = currHotkey[this.props.hotkeyTarget];
              if(this.state.addMode && currHotkeyLine.length > 0) {
                if(!currHotkeyLine.split(', ').includes(target)) {
                  currHotkeyLine += ', ' + target;
                }
              }
              else {
                currHotkeyLine = target;
              }
              currHotkey[this.props.hotkeyTarget] = currHotkeyLine;
              hotkeys.set(currHotkey, this.context);
            }
          }}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => { this.setState({ addMode: !this.state.addMode }); }}
                color={this.state.addMode ? 'primary' : 'default'}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  let currHotkey = hotkeys.get();
                  currHotkey[this.props.hotkeyTarget] = '';
                  hotkeys.set(currHotkey, this.context);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}