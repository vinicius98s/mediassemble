import React, { useState } from "react";
import Select from "react-select";

import { styled } from "@styles/theme";

import { Box, Flex } from "./Box";
import { Text } from "./Text";
import { fileInfo } from "@lib/files";
import Dropdown from "./Dropdown";

type Collection = {
  value: string;
  label: string;
};

interface Props {
  files: Array<{
    fileName: string;
    collection?: Collection;
  }>;
  selectedFileName?: string;
  onClickFile?: (fileName: string) => void;
  accordion?: JSX.Element;
  collections?: Array<{ label: string; value: string }>;
  onChangeCollectionFile?: (c: Collection, fileName: string) => void;
  dropdownOptions?: {
    label: string;
    onClick?: (fileName: string) => void;
    disabled?: boolean;
  }[];
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

const FileBox = styled(Flex)<{ isSelected: boolean; cursor?: string }>`
  flex-wrap: wrap;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 10px -1px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 22px 16px;
  margin-bottom: 30px;
  position: relative;
  cursor: ${(p) => p.cursor || "initial"};
  border: ${(p) => (p.isSelected ? "2px solid #0096c7" : "none")};

  > .select {
    width: 30%;
    position: absolute;
    right: 12%;
  }

  > button {
    position: absolute;
    right: 8px;
    top: 22px;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }
`;

const FileName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 45%;
`;

const ListFiles: React.FC<Props> = ({
  files,
  collections,
  selectedFileName,
  onClickFile,
  accordion,
  onChangeCollectionFile,
  dropdownOptions,
}) => {
  const [showDropdown, setShowDropdown] = useState("");
  const toggleShowDropdown = (fileName: string) => {
    if (showDropdown === "") {
      setShowDropdown(fileName);
    } else {
      setShowDropdown("");
    }
  };

  return (
    <Container>
      {files.map((file, index) => (
        <FileBox
          // @ts-ignore
          onClick={() => onClickFile?.(file.fileName)}
          key={`${file.fileName}_${index}`}
          isSelected={selectedFileName === file.fileName}
          cursor={!collections ? "pointer" : undefined}
        >
          <img src={fileInfo(file.fileName)?.icon} />
          <FileName ml={2} fontSize="18px" fontWeight="500">
            {file.fileName}
          </FileName>
          {collections?.length && (
            <Select
              className="select"
              value={collections.find(
                (c) => c.value === file.collection?.value
              )}
              options={collections}
              onChange={(value) =>
                onChangeCollectionFile?.(value as Collection, file.fileName)
              }
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
                  background: "#F8F9FA",
                  border: "none",
                  boxShadow: "none",
                  fontSize: 15,
                  borderColor: "transparent",
                }),
                option: (provided, state) => ({
                  ...provided,
                  background: state.isSelected ? "#DEE2E6" : "transparent",
                  color: "#212529",
                  cursor: "pointer",
                }),
              }}
            />
          )}
          {accordion && selectedFileName === file.fileName && accordion}
          {dropdownOptions && (
            <>
              <button onClick={() => toggleShowDropdown(file.fileName)}>
                <img src="/icons/dots.svg" />
              </button>
              <Dropdown
                style={{
                  right: 36,
                  top: 20,
                  width: 100,
                  zIndex: 9999,
                }}
                showOptions={
                  showDropdown !== "" && file.fileName === showDropdown
                }
                options={dropdownOptions.map((o) => ({
                  ...o,
                  onClick: () => {
                    o.onClick?.(file.fileName);
                    setShowDropdown("");
                  },
                }))}
              />
            </>
          )}
        </FileBox>
      ))}
    </Container>
  );
};

export default ListFiles;
