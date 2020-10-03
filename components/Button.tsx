import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";

interface Props {
  width?: string | number;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

interface ButtonProps {
  width: string | number;
  variant: Props["variant"];
}

const StyledButton = styled.button<ButtonProps>`
  border-radius: 8px;
  color: #ffffff;
  letter-spacing: 2px;
  line-height: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  border: none;
  width: ${(p) => p.width};
  padding: 12px 32px;
  outline: none;
  cursor: pointer;

  ${(p) =>
    p.variant === "primary"
      ? css`
          background: #0096c7;
          box-shadow: 0px 2px 10px 5px rgba(0, 150, 199, 0.12);
        `
      : css`
          background: transparent;
          border: 2px solid #00b4d8;
          color: #00b4d8;
        `}
`;

const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  width = "100%",
  onClick,
}) => {
  return (
    <StyledButton onClick={onClick} width={width} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
