import React from "react";

import { styled } from "@styles/theme";

import { Box, Flex } from "./Box";
import { Text } from "./Text";

interface Props {
  files: Array<{
    name: string;
  }>;
}

const Container = styled(Box)`
  width: 30vw;
  height: calc(100vh - 334px);
  overflow-y: scroll;
  padding-right: 8px;

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

const FileBox = styled(Flex)`
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 10px -1px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 22px 16px;
  margin-bottom: 30px;
`;

const ListFiles: React.FC<Props> = ({ files }) => {
  return (
    <Container>
      {files.map((file, index) => (
        <FileBox key={index}>
          <i
            data-eva="mic-outline"
            data-eva-fill="#212529"
            data-eva-height="20"
            data-eva-width="20"
          />
          <Text ml={2} fontSize="20px" fontWeight="500">
            {file.name}
          </Text>
        </FileBox>
      ))}
    </Container>
  );
};

export default ListFiles;
