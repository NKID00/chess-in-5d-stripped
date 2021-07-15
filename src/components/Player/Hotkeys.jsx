import React from 'react';

import EmitterContext from 'utils/EmitterContext';
import * as hotkeys from 'state/hotkeys';

/*
Props
 - disabled
 - onUndo
 - onSubmit
 - onRestore
 - onPreviousAction
 - onPreviousMove
 - onNextMove
 - onNextAction
*/
export default class Hotkeys extends React.Component {
  static contextType = EmitterContext;
  hotkeys = hotkeys.get();
  keyHandler(event) {
    let currKey = event.key;
    if(currKey.length === 1) {
      currKey = currKey.toUpperCase();
    }
    if(
      !this.props.disabled &&
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

      //Check if hotkeys are triggered
      let triggered = [];
      let hotkeysObjectKeys = Object.keys(this.hotkeys);
      for(let i = 0;i < hotkeysObjectKeys.length;i++) {
        let currLine = this.hotkeys[hotkeysObjectKeys[i]];
        let currLineArray = currLine.split(', ');
        for(let j = 0;j < currLineArray.length;j++) {
          if(currLineArray[j] === target) {
            triggered.push(hotkeysObjectKeys[i]);
          }
        }
      }
      if(triggered.includes('undo')) {
        if(typeof this.props.onUndo === 'function') {
          this.props.onUndo();
        }
      }
      if(triggered.includes('submit')) {
        if(typeof this.props.onSubmit === 'function') {
          this.props.onSubmit();
        }
      }
      if(triggered.includes('restore')) {
        if(typeof this.props.onRestore === 'function') {
          this.props.onRestore();
        }
      }
      if(triggered.includes('previousAction')) {
        if(typeof this.props.onPreviousAction === 'function') {
          this.props.onPreviousAction();
        }
      }
      if(triggered.includes('previousMove')) {
        if(typeof this.props.onPreviousMove === 'function') {
          this.props.onPreviousMove();
        }
      }
      if(triggered.includes('nextMove')) {
        if(typeof this.props.onNextMove === 'function') {
          this.props.onNextMove();
        }
      }
      if(triggered.includes('nextAction')) {
        if(typeof this.props.onNextAction === 'function') {
          this.props.onNextAction();
        }
      }
      if(triggered.length > 0) {
        event.preventDefault();
      }
    }
  }
  componentDidMount() {
    //Update state if hotkeys files are changed
    this.hotkeys = hotkeys.get();
    this.hotkeysListener = this.context.on('hotkeysUpdate', () => {
      this.hotkeys = hotkeys.get();
    });
    //Window keyDown listener
    this.keyHandler = this.keyHandler.bind(this);
    window.addEventListener('keydown', this.keyHandler);
  }
  componentWillUnmount() {
    //Remove window keyDown listener
    window.removeEventListener('keydown', this.keyHandler);
    //Stop listening to hotkeys file changes
    if(typeof this.hotkeysListener === 'function') { this.hotkeysListener(); }
  }
  render() {
    return (
      <></>
    );
  }
}