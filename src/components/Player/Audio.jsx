import React from 'react';

import { Howl } from 'howler';

import EmitterContext from 'utils/EmitterContext';
import * as audio from 'state/audio';
import * as crConfig from 'state/config';

/*
Props
 - chessRendererRef
 - actionHistory
 - moveBuffer
 - isEnd
*/
export default class Audio extends React.Component {
  static contextType = EmitterContext;
  async audioRefresh() {
    if(typeof this.backgroundHowl !== 'undefined') { this.backgroundHowl.unload(); }
    var backgroundAudio = (await audio.get('background'));
    this.backgroundHowl = new Howl({
      volume: backgroundAudio.volume,
      src: backgroundAudio.audio,
      autoplay: true,
      loop: true
    });
    if(typeof this.endHowl !== 'undefined') { this.endHowl.unload(); }
    var endAudio = (await audio.get('end'));
    this.endHowl = new Howl({
      volume: endAudio.volume,
      src: endAudio.audio
    });
    if(typeof this.moveHowl !== 'undefined') { this.moveHowl.unload(); }
    var moveAudio = (await audio.get('move'));
    this.moveHowl = new Howl({
      volume: moveAudio.volume,
      src: moveAudio.audio
    });
    if(typeof this.undoHowl !== 'undefined') { this.undoHowl.unload(); }
    var undoAudio = (await audio.get('undo'));
    this.undoHowl = new Howl({
      volume: undoAudio.volume,
      src: undoAudio.audio
    });
    if(typeof this.submitHowl !== 'undefined') { this.submitHowl.unload(); }
    var submitAudio = (await audio.get('submit'));
    this.submitHowl = new Howl({
      volume: submitAudio.volume,
      src: submitAudio.audio
    });
  }
  triggerAutoRecenter() {
    let currentConfig = crConfig.get();
    if(currentConfig.extra.autoRecenter && this.props.chessRendererRef) {
      window.setTimeout(() => {
        this.props.chessRendererRef.current.chessRenderer.zoom.present(true, false);
      }, 250);
    }
  }
  componentDidMount() {
    this.audioRefresh();
    //Update state if audio files are changed
    this.audioListener = this.context.on('audioUpdate', () => {
      this.audioRefresh();
    });
  }
  componentDidUpdate(prevProps) {
    //Check for prop changes to trigger sound
    if(
      Array.isArray(prevProps.actionHistory) &&
      Array.isArray(this.props.actionHistory) &&
      prevProps.actionHistory.length !== this.props.actionHistory.length
    ) {
      if(prevProps.actionHistory.length < this.props.actionHistory.length) {
        //Submit / Forward Action triggered
        this.submitHowl.play();
        this.triggerAutoRecenter();
      }
      else {
        //Revert Action triggered
        this.undoHowl.play();
        this.triggerAutoRecenter();
      }
    }
    else if(
      Array.isArray(prevProps.moveBuffer) &&
      Array.isArray(this.props.moveBuffer) &&
      prevProps.moveBuffer.length !== this.props.moveBuffer.length
    ) {
      if(prevProps.moveBuffer.length < this.props.moveBuffer.length) {
        //Move triggered
        this.moveHowl.play();
        this.triggerAutoRecenter();
      }
      else {
        //Undo triggered
        this.undoHowl.play();
        this.triggerAutoRecenter();
      }
    }
    else if(
      typeof prevProps.isEnd === 'boolean' &&
      typeof this.props.isEnd === 'boolean' &&
      prevProps.isEnd !== this.props.isEnd
    ) {
      if(this.props.isEnd) {
        //End triggered
        this.endHowl.play();
        this.triggerAutoRecenter();
      }
    }
  }
  componentWillUnmount() {
    //Stop listening to audio file changes
    if(typeof this.audioListener === 'function') { this.audioListener(); }
  }
  render() {
    return (
      <></>
    );
  }
}