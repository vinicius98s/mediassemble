import App, { AppProps } from "next/app";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { CacheProvider } from "@emotion/core";

import GlobalStyles from "@styles/Global";
import { theme } from "@styles/theme";

class MyApp extends App<{ Component: AppProps; pageProps: AppProps }> {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <GlobalStyles />
          <Component {...pageProps} />
        </CacheProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
