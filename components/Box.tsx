import styled from "@emotion/styled";
import { color, layout, flexbox, space, position } from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

export const Flex = styled("div", {
  shouldForwardProp,
})({ display: "flex" }, color, space, layout, flexbox, position);

export const Box = styled("div", {
  shouldForwardProp,
})(color, space, layout, position);
