import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import { AppBar } from '@alamos-fe/material-ui-core';
import { ApolloService } from '@alamos-fe/graphql-service';
import { FullScreenDialog } from '@alamos-fe/material-ui-core';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/dist/client/router';
import { Modal } from '../models/modals';
import { ModalRoutes } from '../modals';

import '../styles/global.scss';
import theme from '../theme';
import React from 'react';
import { GetStaticProps } from 'next';

function CustomApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale, locales, asPath } = router;
  ApolloService.setLocale(locale);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
    <>
      <Head>
        <title>Welcome to blog!</title>
      </Head>
      <div className="app flex flex-col">
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </div>
      {renderModal()}
    </>
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
