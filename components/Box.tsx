import React from "react";
import styled from "@emotion/styled";
import {
  color,
  layout,
  flexbox,
  space,
  position,
  ColorProps,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

const StyledFlex = styled("div", {
  shouldForwardProp,
})({ display: "flex" }, color, space, layout, flexbox, position);

type BaseProps = ColorProps & SpaceProps & LayoutProps & PositionProps;
type FlexComponentProps = BaseProps & FlexboxProps;

export const Flex: React.FC<FlexComponentProps> = ({ children, ...props }) => (
  // @ts-ignore
  <StyledFlex {...props}>{children}</StyledFlex>
);

const StyledBox = styled("div", {
  shouldForwardProp,
})(color, space, layout, position);

export const Box: React.FC<BaseProps> = ({ children, ...props }) => (
  // @ts-ignore
  <StyledBox {...props}>{children}</StyledBox>
);
