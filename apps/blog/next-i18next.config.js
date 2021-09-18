const { resolve, join } = require('path');
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  react: {
    useSuspense: false
  },
  localePath: process.env.PUBLIC_FOLDER_ROOT || resolve('./public/locales'),
  preload: ['en', 'es']
};
