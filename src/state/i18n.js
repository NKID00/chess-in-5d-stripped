import { i18n } from '@lingui/core';
import { messages as enMessages } from 'locales/en/messages.js';
import { messages as frMessages } from 'locales/fr/messages.js';

//Local for converse.js
import 'converse.js/dist/locales/fr-LC_MESSAGES-converse-po';

import * as settings from 'state/settings';

const i18nInit = (emitter) => {
  i18n.load('en', enMessages);
  i18n.load('fr', frMessages);
  i18n.activate(settings.get().locale);
  emitter.on('settingsUpdate', () => {
    i18n.activate(settings.get().locale);
  });
}

export default i18nInit;