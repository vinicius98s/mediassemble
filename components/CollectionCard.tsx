import React from "react";
import Link from "next/link";

import { colors, styled } from "@styles/theme";

import { Flex } from "./Box";
import { Text } from "./Text";

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
  slug: string;
}

function fileIcon(extension: string) {
  switch (extension) {
    case "mp3":
      return "/icons/mic.svg";
    case "mp4":
      return "/icons/camera.svg";
    default:
      return "";
  }
}

const CollectionCard: React.FC<Props> = ({
  color,
  name,
  recentFiles,
  totalFiles,
  slug,
}) => {
  return (
    <Link href="/collections/[collection]" as={`/collections/${slug}`}>
      <Wrapper>
        <Border color={color} />
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
              <img src={fileIcon(file.type)} />
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
