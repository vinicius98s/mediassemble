import React from "react";

import { styled } from "@styles/theme";

import { Box } from "./Box";
import { Text } from "./Text";
import Button from "./Button";

const InputAndButtonWrapper = styled(Box)`
  button {
    position: absolute;
    right: 0;
    background: #0096c7;
    border-radius: 0px 8px 0px 0px;
    box-shadow: none;
  }
`;

const CustomInput = styled.input`
  background: #dee2e6;
  border-radius: 8px 8px 8px 0px;
  border: none;
  border-bottom: 2px solid #0096c7;
  width: 100%;
  height: 44px;
  padding: 12px 24px;
  outline: none;

  ::placeholder {
    font-size: 14px;
    color: rgba(73, 80, 87, 0.4);
  }
`;

const TextContainer = styled(Box)`
  width: 56vw;
  height: calc(100vh - 378px);
  overflow-y: scroll;
  padding: 16px 24px;
  box-shadow: 0px 1px 10px -1px rgba(0, 0, 0, 0.08);
  border-radius: 0px 0px 12px 12px;
  background: #ffffff;
  line-height: 32px;

  scrollbar-width: thin;
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

const ConvertedText: React.FC = () => {
  return (
    <Box>
      <InputAndButtonWrapper position="relative">
        <CustomInput placeholder="Tente procurar por alguma palavra" />
        <Button>PESQUISAR</Button>
      </InputAndButtonWrapper>
      <TextContainer>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint,
          delectus veniam et repudiandae autem porro nisi distinctio iusto.
          Tenetur quod odit vero quis accusantium amet beatae odio fugiat minus
          repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus.
        </Text>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint,
          delectus veniam et repudiandae autem porro nisi distinctio iusto.
          Tenetur quod odit vero quis accusantium amet beatae odio fugiat minus
          repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sint, delectus veniam et repudiandae autem porro nisi distinctio
          iusto. Tenetur quod odit vero quis accusantium amet beatae odio fugiat
          minus repellendus.
        </Text>
      </TextContainer>
    </Box>
  );
};

export default ConvertedText;
