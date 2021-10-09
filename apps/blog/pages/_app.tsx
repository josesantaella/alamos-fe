import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import { AppBar } from '@alamos-fe/material-ui-core';
import { ApolloService } from '@alamos-fe/graphql-service';
import { FullScreenDialog } from '@alamos-fe/material-ui-core';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import { useRouter } from 'next/dist/client/router';
import { Modal } from '../models/modals';
import { ModalRoutes } from '../modals';

import '../styles/global.scss';
import theme from '../theme';
import React from 'react';
import { GetStaticProps } from 'next';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function CustomApp({ Component, pageProps, emotionCache = createCache({ key: 'css' }) }: MyAppProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale, locales, asPath } = router;
  ApolloService.setLocale(locale);

  const renderModal = () => {
    const modal = router.query.modal?.toString();
    const isOpen = modal in Modal;
    const activeModal = isOpen && ModalRoutes[modal as Modal];
    const ModalComponent = activeModal?.component;
    return (
      <FullScreenDialog isOpened={isOpen} onRequestClose={() => router.back()}>
        {isOpen ? <ModalComponent /> : null}
      </FullScreenDialog>
    );
  };

  const handleLocaleChange = (locale) => {
    const shallow = Object.prototype.hasOwnProperty.call(Component, 'isLocaleHandler');
    router.replace(asPath, undefined, { locale, shallow });
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Alamos Blog</title>
      </Head>
      <ThemeProvider theme={theme}>
        <div className="app flex flex-col">
          <AppBar
            navItems={[]}
            home={{ text: t('common:nav.home'), handler: () => router.push('/') }}
            localization={{
              active: locale,
              locales: locales.map((x) => ({
                value: x,
                label: x,
                handler: () => handleLocaleChange(x)
              }))
            }}
          />
          <main className="flex flex-col overflow-x-auto flex-grow pb-2">
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </main>
        </div>
        {renderModal()}
      </ThemeProvider>
    </CacheProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig))
    }
  };
};
export default appWithTranslation(CustomApp);
