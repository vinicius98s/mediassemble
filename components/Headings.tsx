import styled from "@emotion/styled";
import { color } from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

import { Colors } from "@styles/theme";

const StyledH1 = styled("h1", {
  shouldForwardProp,
})(color);

export const H1: React.FC<{ color: Colors }> = ({ children }) => {
  return <StyledH1 color={(color as unknown) as string}>{children}</StyledH1>;
};
