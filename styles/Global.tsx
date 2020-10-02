import { css, Global } from "@emotion/core";

import { Theme } from "./theme";

export default () => (
  <Global<Theme>
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `}
  />
);
