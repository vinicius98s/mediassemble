import { styled } from "@styles/theme";
import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { css } from "@emotion/core";

export const InputAndButtonWrapper = styled(Box)`
  button {
    position: absolute;
    right: 0;
    top: 0;
    background: #0096c7;
    border-radius: 0px 8px 0px 0px;
    box-shadow: none;
  }
`;

export const CustomInput = styled.input`
  background: #fff;
  border-radius: 8px 8px 0px 0px;
  border: none;
  border-bottom: 2px solid #0096c7;
  width: 100%;
  height: 44px;
  padding: 12px 24px;
  outline: none;

  :disabled {
    background: #dee2e6;
  }

  ::placeholder {
    font-size: 14px;
    color: rgba(73, 80, 87, 0.4);
  }
`;

export const TextContainer = styled(Box)<{ noFiles?: boolean }>`
  width: 56vw;
  height: calc(100vh - 378px);
  overflow-y: scroll;
  padding: 16px 24px;
  box-shadow: 0px 1px 10px -1px rgba(0, 0, 0, 0.08);
  border-radius: 0px 0px 12px 12px;
  background: #ffffff;
  line-height: 38px;
  text-align: ${(p) => (p.noFiles ? "center" : "left")};

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    width: 8px;
    border-radius: 100px;
  }
  &::-webkit-scrollbar {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
  }
`;

export const Word = styled(Text)<{ clickable?: boolean; highlight?: boolean }>`
  cursor: ${(p) => (p.clickable ? "pointer" : "initial")};
  margin: 2px;
  padding: 0 2px;

  ${(p) =>
    p.clickable &&
    css`
      :hover {
        background: #0096c7;
        color: #fff;
      }
    `}

  ${(p) =>
    p.highlight &&
    css`
      background: #0096c7;
      color: #fff;
    `}
`;
