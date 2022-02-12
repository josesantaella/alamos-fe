import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
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
  const { locale, locales, query, back, push } = useRouter();

  const renderModal = () => {
    const modal = query.modal?.toString();
    const isOpen = modal in Modal;
    const activeModal = isOpen && ModalRoutes[modal as Modal];
    const ModalComponent = activeModal?.component;
    return (
      <FullScreenDialog isOpened={isOpen} onRequestClose={() => back()}>
        {isOpen ? <ModalComponent /> : null}
      </FullScreenDialog>
    );
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
            home={{ text: t('common:nav.home'), handler: () => push('/') }}
            localization={{
              active: locale,
              locales: locales.map((x) => ({
                value: x,
                label: x,
                handler: () => push('/', undefined, { locale: x })
              }))
            }}
          />
          <main className="flex flex-col overflow-x-auto flex-grow pb-2">
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ApolloProvider client={ApolloService.getClient()}>
              <Component {...pageProps} />
              {renderModal()}
            </ApolloProvider>
          </main>
        </div>
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
