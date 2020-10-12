import React, { useState } from "react";
import Link from "next/link";

import { styled } from "@styles/theme";

import { fileInfo } from "@lib/files";

import { Flex } from "./Box";
import { Text } from "./Text";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background: ${(p) => p.theme.colors.white};
  box-shadow: 0px 1px 10px -1px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  height: 220px;
  position: relative;
  padding: ${(p) => `${p.theme.space[5]}px ${p.theme.space[6]}px`};

  > button {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const Border = styled.div<{ color: Props["color"] }>`
  width: 8px;
  height: 100%;
  background: ${(p) => p.color};
  border-radius: 12px 0 0 12px;
  position: absolute;
  left: 0;
  top: 0;
`;

const TotalFiles = styled.div`
  position: absolute;
  bottom: ${(p) => `${p.theme.space[5]}px`};
  right: ${(p) => `${p.theme.space[5]}px`};
`;

interface Props {
  color: string;
  name: string;
  recentFiles: Array<{ name: string; type: string }>;
  totalFiles: number;
}

const CollectionCard: React.FC<Props> = ({
  color,
  name,
  recentFiles,
  totalFiles,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const toggleOptions = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const onClickSendFiles = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    router.push("/upload");
  };

  return (
    <Link href="/collections/[collection]" as={`/collections/${name}`}>
      <Wrapper>
        <Border color={color} />
        <button onClick={toggleOptions}>
          <img src="/icons/dots.svg" />
        </button>
        <Dropdown
          style={{
            right: 14,
          }}
          showOptions={showOptions}
          options={[
            { label: "Deletar", disabled: true },
            { label: "Enviar arquivos", onClick: onClickSendFiles },
          ]}
        />
        <Flex alignItems="center" mb={4}>
          <img src="/icons/inbox.png" />
          <Text fontWeight="400" fontSize={4} ml={2}>
            {name}
          </Text>
        </Flex>
        <Text display="block" mb={5} fontWeight="400">
          Arquivos recentes:
        </Text>
        {recentFiles.length ? (
          recentFiles.map((file, index) => (
            <Flex key={index} alignItems="center" mb="12px">
              <img src={fileInfo(file.name)?.icon} />
              <Text ml={2} fontSize="14px">
                {file.name}
              </Text>
            </Flex>
          ))
        ) : (
          <Flex alignItems="center">
            <img src="/icons/slash.svg" />
            <Text ml={3} fontSize="14px">
              Nenhum arquivo encontrado
            </Text>
          </Flex>
        )}
        <TotalFiles>
          <Text fontSize={2} fontWeight="500">
            {totalFiles} no total
          </Text>
        </TotalFiles>
      </Wrapper>
    </Link>
  );
};

export default CollectionCard;
