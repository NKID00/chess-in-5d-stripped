import React from 'react';

import EmitterContext from 'utils/EmitterContext';
import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as auth from 'network/auth';

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
          var enterRooms = () => {
            var defaultRooms = authStore.get().xmpp.defaultRooms;
            if(Array.isArray(defaultRooms)) {
              for(var i = 0;i < defaultRooms.length;i++) {
                _converse.api.rooms.open(defaultRooms[i]);
              }
            }
          }

          //Logout if no longer logged in
          var logoutCheck = () => {
            if(!authStore.isLoggedIn() || !settings.get().xmpp) {
              //Unbind listeners
              for(var i = 0;i < listeners.length;i++) {
                try {
                  listeners[i]();
                }
                catch(err) {}
              }
              _converse.api.user.logout();
              window.location.reload();
            }
          }

          //Add listeners to listen for auth store updates
          listeners.push(emitter.on('authUpdate', enterRooms.bind(this)));
          listeners.push(emitter.on('authUpdate', logoutCheck.bind(this)));
          listeners.push(emitter.on('settingsUpdate', logoutCheck.bind(this)));
          //Converse listeners
          _converse.api.listen.on('chatBoxClosed', enterRooms.bind(this));

          //Initial function calls
          enterRooms();
          logoutCheck();
        });
      }
    });
  }
  async converseInit() {
    if(!this.isInitialized && authStore.isLoggedIn() && settings.get().xmpp) {
      var storedAuth = authStore.get();
      if(storedAuth.xmpp === null) {
        await auth.xmpp();
        storedAuth = authStore.get();
      }
      if(!this.isInitialized && storedAuth.xmpp !== null) {
        this.conversePlugin();
        let initObj = {
          allow_logout: false,
          allow_registration: false,
          allow_chat_pending_contacts: true,
          auto_login: true,
          auto_away: 30,
          auto_reconnect: true,
          i18n: settings.get().locale,
          muc_nickname_from_jid: true,
          omemo_default: false,
          show_message_avatar: false,
          authentication: 'login',
          jid: storedAuth.xmpp.username,
          password: storedAuth.xmpp.password,
          whitelisted_plugins: ['custom'],
          blacklisted_plugins: ['converse-profile'],
          theme: 'concord',
          emitter: this.context,
          authStore: authStore,
        };
        if(!settings.get().xmppBosh) {
          let wsUrl = `wss://${storedAuth.xmpp.domain}:5281/xmpp-websocket/`;
          if(window.location.protocol !== 'https:') {
            //Use regular (non-tls) url if not using https
            wsUrl = `ws://${storedAuth.xmpp.domain}:5280/xmpp-websocket/`;
          }
          initObj['websocket_url'] = wsUrl;
        }
        else {
          let boshUrl = `https://${storedAuth.xmpp.domain}:5281/http-bind/`;
          if(window.location.protocol !== 'https:') {
            //Use regular (non-tls) url if not using https
            boshUrl = `http://${storedAuth.xmpp.domain}:5280/http-bind/`;
          }
          initObj['bosh_service_url'] = boshUrl;
        }
        this.converse.initialize(initObj);
        this.isInitialized = true;
      }
    }
  }
  componentDidMount() {
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', async () => {
      await this.converseInit();
      if(this.isInitialized && !authStore.isLoggedIn()) {
        this.isInitialized = false;
      }
    });
    //Update state if settings is changed
    this.settingsListener = this.context.on('settingsUpdate', async () => {
      await this.converseInit();
      if(this.isInitialized && !authStore.isLoggedIn()) {
        this.isInitialized = false;
      }
    });
    this.converseInit();
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
    //Stop listening to settings changes
    if(typeof this.settingsListener === 'function') { this.settingsListener(); }
  }
  render() {
    return (
      <></>
    );
  }
}