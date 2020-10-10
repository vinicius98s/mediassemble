import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";
import { darken } from "polished";
import { space, SpaceProps } from "styled-system";

import Spinner from "./Spinner";

type Props = {
  width?: string | number;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  maxWidth?: string | number;
  loading?: boolean;
} & SpaceProps;

interface ButtonProps {
  width: string | number;
  maxWidth: string | number;
  variant: Props["variant"];
}

const StyledButton = styled.button<ButtonProps>`
  ${space}

  > .spinner {
    margin-right: 12px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 8px;
  color: #ffffff;
  letter-spacing: 0.25px;
  line-height: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  border: none;
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  max-width: ${(p) =>
    typeof p.maxWidth === "number" ? `${p.maxWidth}px` : p.maxWidth};
  padding: 12px 32px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  :disabled {
    background: #dee2e6;
    color: #adb5bd;
    cursor: initial;
    border: none;
    box-shadow: none;
  }

  ${(p) => {
    switch (p.variant) {
      case "primary":
        return css`
          background: #0096c7;
          box-shadow: 0px 2px 10px 5px rgba(0, 150, 199, 0.12);

          :not(:disabled):hover {
            background: ${darken(0.1, "#0096c7")};
          }
        `;
      case "danger":
        return css`
          background: #d42e56;
          box-shadow: 0px 2px 10px 5px rgba(212, 46, 86, 0.12);

          :not(:disabled):hover {
            background: ${darken(0.1, "#D42E56")};
          }
        `;
      case "secondary":
        return css`
          background: transparent;
          border: 2px solid #00b4d8;
          color: #00b4d8;

          :not(:disabled):hover {
            border: 2px solid ${darken(0.1, "#00b4d8")};
            color: ${darken(0.1, "#00b4d8")};
          }
        `;
    }
  }}
`;

const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  width = "auto",
  maxWidth = "unset",
  loading,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      width={width}
      maxWidth={maxWidth}
      variant={variant}
      disabled={loading}
    >
      {loading && <Spinner className="spinner" size={15} dark />}
      {children}
    </StyledButton>
  );
};

export default Button;
