import React from "react";
import { keyframes } from "@emotion/core";

import { Colors, styled } from "@styles/theme";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

interface SpinnerProps {
  size?: number;
  dark?: boolean;
}

const Spinner = styled.div<SpinnerProps>`
  width: ${(p) => p.size || 12}px;
  height: ${(p) => p.size || 12}px;
  border: 2px solid
    ${(p) => (p.dark ? "rgba(45, 55, 72, 0.3)" : "rgba(255, 255, 255, 0.3)")};
  border-radius: 50%;
  border-top-color: ${(p) => (p.dark ? "#495057" : "#ffffff")};
  animation: ${spin} 1s ease-in-out infinite;
`;

export default Spinner;
