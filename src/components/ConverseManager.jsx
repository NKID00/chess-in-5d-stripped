import React from 'react';

import 'converse.js/dist/converse.min';
import 'converse.js/dist/converse.min.css';

export default class ConverseManager extends React.Component {
  converse = window.converse;
  componentDidMount() {
    this.converse.initialize({
      bosh_service_url: 'http://xmpp.chessin5d.net:5280/http-bind/',
      allow_registration: false
    });
  }
  render() {
    return (
      <></>
    );
  }
}