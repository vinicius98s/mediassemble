import React from "react";
import Select from "react-select";

import { styled } from "@styles/theme";

import { Box, Flex } from "./Box";
import { Text } from "./Text";

interface Props {
  files: Array<{
    name: string;
  }>;
  chooseColleciton?: boolean;
}

const Container = styled(Box)`
  width: 100%;
  height: calc(100vh - 334px);
  overflow-y: auto;
  padding-right: 8px;

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
  position: relative;

  > div {
    width: 30%;
    position: absolute;
    right: 12%;
  }

  button {
    position: absolute;
    right: 8px;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }
`;

const options = [
  { value: "escola", label: "Escola" },
  { value: "programacao", label: "Programação" },
  { value: "vanilla", label: "Vanilla" },
];

const ListFiles: React.FC<Props> = ({ files, chooseColleciton }) => {
  return (
    <Container>
      {files.map((file, index) => (
        <FileBox key={index}>
          <img src="/icons/mic.svg" />
          <Text ml={2} fontSize="18px" fontWeight="500">
            {file.name}
          </Text>
          {chooseColleciton && (
            <Select
              value={{ value: "escola", label: "Escola" }}
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: {
                  ...theme.colors,
                  primary: "#212529",
                  primary50: "#ADB5BD",
                },
              })}
              styles={{
                control: (provided) => ({
                  ...provided,
                  background: "#DEE2E6",
                  border: "none",
                  boxShadow: "none",
                  fontSize: 15,
                  borderColor: "transparent",
                }),
                option: (provided, state) => ({
                  ...provided,
                  background: state.isSelected ? "#DEE2E6" : "transparent",
                  color: "#212529",
                }),
              }}
            />
          )}
          <button>
            <img src="/icons/dots.svg" />
          </button>
        </FileBox>
      ))}
    </Container>
  );
};

export default ListFiles;
