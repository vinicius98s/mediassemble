import React from "react";
import Link, { LinkProps } from "next/link";

import { Flex } from "./Box";
import { Text } from "./Text";

import { styled } from "@styles/theme";

export interface Props {
  items: Array<{
    label: string;
    href: LinkProps["href"];
    isActive: boolean;
  }>;
}

const A = styled(Text)<{ isActive: boolean }>`
  color: ${(p) => p.theme.colors.dark.grey};
  font-size: 16px;
  font-weight: ${(p) => (p.isActive ? "600" : "500")};
  cursor: pointer;
`.withComponent("a");

const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <Flex mt={1}>
      {items.map((item, i) => (
        <Link href={item.href} key={i}>
          <A isActive={item.isActive}>
            {item.label}
            {i < items.length - 1 && (
              <Text color="dark.grey" mx={2}>
                {"|"}
              </Text>
            )}
          </A>
        </Link>
      ))}
    </Flex>
  );
};

export default Breadcrumb;
