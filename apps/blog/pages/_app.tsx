import { AppBar } from '@alamos-fe/material-ui-core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/global.scss';
import theme from '../theme';

function CustomApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to blog!</title>
      </Head>
      <div className="app">
        <ThemeProvider theme={theme}>
          <AppBar/>
          <main>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </div>
    </>
  );
}

export default CustomApp;
