import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";
import { darken } from "polished";
import { space, SpaceProps } from "styled-system";

type Props = {
  width?: string | number;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
} & SpaceProps;

interface ButtonProps {
  width: string | number;
  variant: Props["variant"];
}

const StyledButton = styled.button<ButtonProps>`
  ${space}

  height: 44px;
  border-radius: 8px;
  color: #ffffff;
  letter-spacing: 0.25px;
  line-height: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  border: none;
  width: ${(p) => p.width};
  padding: 12px 32px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  ${(p) => {
    switch (p.variant) {
      case "primary":
        return css`
          background: #0096c7;
          box-shadow: 0px 2px 10px 5px rgba(0, 150, 199, 0.12);

          :hover {
            background: ${darken(0.1, "#0096c7")};
          }
        `;
      case "danger":
        return css`
          background: #d42e56;
          box-shadow: 0px 2px 10px 5px rgba(212, 46, 86, 0.12);

          :hover {
            background: ${darken(0.1, "#D42E56")};
          }
        `;
      case "secondary":
        return css`
          background: transparent;
          border: 2px solid #00b4d8;
          color: #00b4d8;

          :hover {
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
  ...props
}) => {
  return (
    <StyledButton {...props} width={width} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
