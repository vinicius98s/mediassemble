import { CollectionColors, styled } from "@styles/theme";
import React from "react";

import { Box, Flex } from "./Box";
import { H1 } from "./Text";
import Breadcrumb, { Props as BreadcrumbProps } from "./Breadcrumb";

interface Props {
  title?: string;
  actions?: JSX.Element;
  collection?: {
    name: string;
    color: CollectionColors;
    breadcrumb: BreadcrumbProps["items"];
  };
}

const Border = styled.div<{ color: CollectionColors }>`
  width: 8px;
  height: 70px;
  background: ${(p) => p.theme.colors.collections[p.color]};
  border-radius: 12px 0 0 12px;
  margin-right: 27px;
`;

const Container: React.FC<Props> = ({
  title,
  actions,
  collection,
  children,
}) => {
  return (
    <Box mx={10} mt={10}>
      <Flex flexDirection="row" width="100%" mb={9} alignItems="center">
        {collection && <Border color={collection.color} />}
        <Box>
          <H1 fontWeight="500" fontSize="34px" letterSpacing="-0.5px">
            {title || collection?.name}
          </H1>
          {collection?.breadcrumb && (
            <Breadcrumb items={collection?.breadcrumb} />
          )}
        </Box>
        {actions && actions}
      </Flex>
      {children}
    </Box>
  );
};

export default Container;
