const { resolve, join } = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  react: {
    useSuspense: false
  },
  localePath: resolve(join(__dirname, '..', '..', '..', './public/locales')),
  preload: ['en', 'es']
};
