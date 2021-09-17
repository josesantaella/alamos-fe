import { AppBar } from '@alamos-fe/material-ui-core';
import { ApolloService } from '@alamos-fe/graphql-service';
import { FullScreenDialog } from '@alamos-fe/material-ui-core';
import { AppProps } from 'next/app';
import { appWithTranslation, useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/dist/client/router';
import { Modal } from '../models/modals';
import { ModalRoutes } from '../modals';

import '../styles/global.scss';
import theme from '../theme';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  ApolloService.setLocale(locale);
  const { t } = useTranslation('common');

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const renderModal = () => {
    const modal = router.query.modal?.toString();
    if (modal in Modal) {
      const activeModal = ModalRoutes[modal as Modal];
      const ModalComponent = activeModal.component;
      return (
        <FullScreenDialog isOpened={modal in Modal} onRequestClose={() => router.back()}>
          <ModalComponent />
        </FullScreenDialog>
      );
    }
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
            localization={{
              active: locale,
              locales: locales.map((x) => ({
                value: x,
                label: x,
                handler: () => router.push(asPath, undefined, { locale: x, shallow: true })
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
export default appWithTranslation(CustomApp);
