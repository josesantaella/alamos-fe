const { resolve, join } = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  react: {
    useSuspense: false
  },
  localePath: resolve('apps/blog/public/locales'),
  preload: ['en', 'es']
};
