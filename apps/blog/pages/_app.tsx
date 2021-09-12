import { AppBar } from '@alamos-fe/material-ui-core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import Modal from "react-modal";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/dist/client/router';
import { Modals } from "../models/modals";
import { ModalRoutes } from "../modals";

import '../styles/global.scss';
import theme from '../theme';


Modal.setAppElement("#__next")

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const renderModal = () => {
    const modal = router.query.modal?.toString();
    if(modal in Modals){
      const activeModal = ModalRoutes[modal as Modals];
      const ModalComponent = activeModal.component;
      return (
        <Modal
          isOpen={true}
          onRequestClose={() => router.back()}
        >
          <ModalComponent />
        </Modal>
        );

    }
  }

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
      {renderModal()}
    </>
  );
}

export default CustomApp;
