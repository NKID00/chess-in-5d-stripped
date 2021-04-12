import React from 'react';

import EmitterContext from 'EmitterContext';
import * as authStore from 'state/auth';
import * as settings from 'state/settings';

import 'converse.js/dist/converse.min';
import 'converse.js/dist/converse.min.css';
import 'converse.js/dist/icons';
import 'converse.js/dist/emojis';
import 'converse.js/dist/sounds/msg_received.ogg';
import 'converse.js/logo/conversejs-filled.svg';

export default class ConverseManager extends React.Component {
  static contextType = EmitterContext;
  converse = window.converse;
  isInitialized = false;
  conversePlugin() {
    this.converse.plugins.add('custom', {
      initialize: function () {
        this._converse.api.settings.extend({
          'emitter': null,
          'authStore': null,
        });
        this._converse.api.listen.on('initialized', () => {
          var _converse = this._converse;
          var emitter = _converse.api.settings.get('emitter');
          var authStore = _converse.api.settings.get('authStore');
          var listeners = [];

          //Enter all the default rooms
          var enterDefaultRooms = () => {
            var defaultRooms = authStore.get().xmpp.defaultRooms;
            if(Array.isArray(defaultRooms)) {
              for(var i = 0;i < defaultRooms.length;i++) {
                _converse.api.rooms.open(defaultRooms[i]);
              }
            }
          }

          //Logout if no longer logged in
          var logoutCheck = () => {
            if(!authStore.isLoggedIn()) {
              //Unbind listeners
              for(var i = 0;i < listeners.length;i++) {
                try {
                  listeners[i]();
                }
                catch(err) {}
              }
              _converse.api.user.logout();
            }
          }

          //Add listeners to listen for auth store updates
          listeners.push(emitter.on('authUpdate', enterDefaultRooms.bind(this)));
          listeners.push(emitter.on('authUpdate', logoutCheck.bind(this)));

          //Initial function calls
          enterDefaultRooms();
          logoutCheck();
        });
      }
    });
  }
  converseInit() {
    if(!this.isInitialized && authStore.isLoggedIn()) {
      var storedAuth = authStore.get();
      if(storedAuth.xmpp !== null) {
        this.conversePlugin();
        var wsUrl = `wss://${storedAuth.xmpp.domain}:5281/xmpp-websocket/`;
        if(window.location.protocol !== 'https:') {
          //Use regular (non-tls) url if not using https
          wsUrl = `ws://${storedAuth.xmpp.domain}:5280/xmpp-websocket/`;
        }
        this.converse.initialize({
          allow_logout: false,
          allow_registration: false,
          allow_chat_pending_contacts: true,
          auto_login: true,
          auto_away: 30,
          auto_reconnect: true,
          i18n: settings.get().locale,
          muc_nickname_from_jid: true,
          omemo_default: true,
          show_message_avatar: false,
          authentication: 'login',
          jid: storedAuth.xmpp.username,
          password: storedAuth.xmpp.password,
          websocket_url: wsUrl,
          whitelisted_plugins: ['custom'],
          blacklisted_plugins: ['converse-profile'],
          theme: 'concord',
          emitter: this.context,
          authStore: authStore,
        });
        this.isInitialized = true;
      }
    }
  }
  componentDidMount() {
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.converseInit();
    });
    this.converseInit();
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    return (
      <></>
    );
  }
}