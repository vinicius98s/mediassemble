import React, { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";

import { Text } from "./Text";
import { Box } from "./Box";

type Props = {
  label: string;
  id: string;
  placeholder: string;
  width?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const Line = styled.div`
  width: calc(100% - 32px);
  height: 2px;
  background: #00b4d8;
  position: absolute;
  margin-left: 16px;
  bottom: 0px;
`;

const StyledInput = styled.input`
  border-radius: 8px;
  height: 40px;
  background: ${(p) => (p.theme as any).colors.offWhite};
  border: none;
  padding: 12px 16px;
  font-size: 14px;
  width: 100%;
  outline: none;

  ::placeholder {
    color: ${(p) => (p.theme as any).colors.dark.grey};
  }
`;

const Input: React.FC<Props> = ({
  label,
  id,
  placeholder,
  width = 410,
  ...props
}) => {
  return (
    <Box width={width}>
      <label htmlFor={id}>
        <Text
          fontSize={12}
          lineHeight="15px"
          letterSpacing="0.15px"
          fontWeight="600"
          mb={2}
        >
          {label}
        </Text>
      </label>
      <Box maxWidth={width} width="100%" position="relative">
        <StyledInput placeholder={placeholder} id={id} {...props} />
        <Line />
      </Box>
    </Box>
  );
};

export default Input;
