import { css, Global } from "@emotion/core";

import { Theme } from "./theme";

export default () => (
  <Global<Theme>
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
      }
    `}
  />
);
