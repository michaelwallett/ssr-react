var i18n = require('i18next');

i18n.init({
  ns: {
    defaultNs: 'translation',
    namespaces: ['translation']
  },
  fallbackLng: false,
  load: 'unspecific',
  useCookie: false
});

module.exports = i18n;