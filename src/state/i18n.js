import { i18n } from '@lingui/core';
import { messages as enMessages } from '@lingui/loader!locales/en/messages.po'; // eslint-disable-line import/no-webpack-loader-syntax
import { messages as frMessages } from '@lingui/loader!locales/fr/messages.po'; // eslint-disable-line import/no-webpack-loader-syntax
import { en, fr } from 'make-plural/plurals';

//Locale for converse.js
import 'converse.js/dist/locales/fr-LC_MESSAGES-converse-po';

import moment from 'moment';

import * as settings from 'state/settings';

const i18nInit = (emitter) => {
  i18n.load('en', enMessages);
  i18n.load('fr', frMessages);
  i18n.loadLocaleData('en', { plurals: en });
  i18n.loadLocaleData('fr', { plurals: fr });    
  i18n.activate(settings.get().locale);
  moment.locale(settings.get().locale);
  emitter.on('settingsUpdate', () => {
    i18n.activate(settings.get().locale);
    moment.locale(settings.get().locale);
  });
}

export default i18nInit;