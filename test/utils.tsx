import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { CacheProvider } from "@emotion/core";

import GlobalStyles from "@styles/Global";
import { theme } from "@styles/theme";

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cache}>
        <GlobalStyles />
        {children}
      </CacheProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: JSX.Element, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options });

export { customRender as render };
