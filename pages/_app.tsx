import App, { AppProps } from "next/app";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { CacheProvider } from "@emotion/core";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "@styles/Global";
import { theme } from "@styles/theme";

import { SWRProvider } from "@services/api";

class MyApp extends App<{ Component: AppProps; pageProps: AppProps }> {
  componentDidMount() {
    Modal.setAppElement("#__next");
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <GlobalStyles />
          <SWRProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SWRProvider>
        </CacheProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
