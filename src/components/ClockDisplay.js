import React from 'react';

import { Button } from 'rebass';
import Options from 'Options';
import { Howl } from 'howler';
import end from 'assets/sound/end.flac';

export default class LocalComputer extends React.Component {
  endHowl = new Howl({
    volume: 0,
    src: end
  });
  componentDidUpdate(prevProps) {
    if(prevProps.whiteDurationLeft > 0) {
      if(this.props.whiteDurationLeft <= 0) {
        this.endHowl.volume(Options.get('sound').effect);
        if(this.endHowl.volume() > 0) {
          this.endHowl.play();
        }
      }
    }
    if(prevProps.blackDurationLeft > 0) {
      if(this.props.blackDurationLeft <= 0) {
        this.endHowl.volume(Options.get('sound').effect);
        if(this.endHowl.volume() > 0) {
          this.endHowl.play();
        }
      }
    }
  }
  render() {
    return (
      <>
        <Button
          bg='white'
          color='black'
          disabled
          mx={1}
        >
          {
            ((this.props.whiteDurationLeft > 3600) ? (Math.floor(this.props.whiteDurationLeft / 3600).toFixed() + ':') : '') +
            Math.floor((this.props.whiteDurationLeft / 60) % 60).toFixed().padStart(2, '0') +
            ':' +
            Math.floor(this.props.whiteDurationLeft % 60 % 3600).toFixed().padStart(2, '0')
          }
        </Button>
        <Button
          bg='black'
          color='white'
          variant='outline'
          disabled
          mx={1}
        >
          {
            ((this.props.blackDurationLeft > 3600) ? (Math.floor(this.props.blackDurationLeft / 3600).toFixed() + ':') : '') +
            Math.floor((this.props.blackDurationLeft / 60) % 60).toFixed().padStart(2, '0') +
            ':' +
            Math.floor(this.props.blackDurationLeft % 60 % 3600).toFixed().padStart(2, '0')
          }
        </Button>
      </>
    );
  }
}
