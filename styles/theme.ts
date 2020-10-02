const colors = {
  main: "#fff",
};

export const theme = {
  colors,
};

export type Theme = typeof theme;
export type PropsWithTheme<P> = P & { theme: Theme };
