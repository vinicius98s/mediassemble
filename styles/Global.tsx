import { css, Global } from "@emotion/core";

import { theme, Theme } from "./theme";

const GlobalTheme = () => (
  <Global<Theme>
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
      }

      body {
        background: ${theme.colors.offWhite};
      }
    `}
  />
);

export default GlobalTheme;
