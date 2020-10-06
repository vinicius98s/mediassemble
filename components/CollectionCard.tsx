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
  max-width: 20%;
  min-width: 345px;
  width: 100%;
  height: 220px;
  position: relative;
  padding: ${(p) => `${p.theme.space[5]}px ${p.theme.space[6]}px`};
  margin-bottom: ${(p) => p.theme.space[7]}px;
`;

const Border = styled.div<{ color: Props["color"] }>`
  width: 8px;
  height: 100%;
  background: ${(p) => p.theme.colors.collections[p.color]};
  border-radius: 12px 0 0 12px;
  position: absolute;
  left: 0;
  top: 0;
`;

const TotalFiles = styled.div`
  position: absolute;
  bottom: ${(p) => `${p.theme.space[5]}px`};
  right: ${(p) => `${p.theme.space[4]}px`};
`;

interface Props {
  color: keyof typeof colors["collections"];
  name: string;
  recentFiles: Array<{ name: string; type: string }>;
  totalFiles: number;
  slug: string;
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
          <i
            data-eva="inbox"
            data-eva-fill="#212529"
            data-eva-height="24"
            data-eva-width="24"
          />
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
              <i
                data-eva="mic-outline"
                data-eva-fill="#212529"
                data-eva-height="20"
                data-eva-width="20"
              />
              <Text ml={2} fontSize="14px">
                {file.name}
              </Text>
            </Flex>
          ))
        ) : (
          <Flex alignItems="center">
            <i
              data-eva="slash-outline"
              data-eva-fill="#212529"
              data-eva-height="20"
              data-eva-width="20"
            />
            <Text ml={3} fontSize="14px">
              Arquivos não encontrados
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
