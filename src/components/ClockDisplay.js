import React from 'react';

import { Button } from 'rebass';

export default class LocalComputer extends React.Component {
  render() {
    return (
      <>
        <Button
          bg='white'
          color='black'
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
