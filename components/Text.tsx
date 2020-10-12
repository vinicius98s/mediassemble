import React from "react";
import styled from "@emotion/styled";
import {
  color,
  layout,
  space,
  typography,
  LayoutProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

import { Colors } from "@styles/theme";

type Props = {
  color?: Colors;
  onClick?: () => void;
} & LayoutProps &
  SpaceProps &
  TypographyProps;

const StyledH1 = styled("h1", {
  shouldForwardProp,
})(color, typography, space, layout);

const StyledH3 = styled("h3", {
  shouldForwardProp,
})(color, typography, space, layout);

const StyledText = styled("span", {
  shouldForwardProp,
})(color, typography, space, layout);

const StyledP = styled("p", {
  shouldForwardProp,
})(color, typography, space, layout);

export const H1: React.FC<Props> = ({
  children,
  color = "dark.primary",
  ...props
}) => {
  return (
    <StyledH1 color={color} {...props}>
      {children}
    </StyledH1>
  );
};

export const H3: React.FC<Props> = ({
  children,
  color = "dark.primary",
  ...props
}) => (
  <StyledH3 color={color} {...props}>
    {children}
  </StyledH3>
);

export const Text: React.FC<Props> = ({
  children,
  color = "dark.primary",
  ...props
}) => (
  <StyledText color={color} {...props}>
    {children}
  </StyledText>
);

export const P: React.FC<Props> = ({
  children,
  color = "dark.primary",
  ...props
}) => (
  <StyledP color={color} {...props}>
    {children}
  </StyledP>
);
