import React from "react";

import { Box, Flex } from "./Box";
import { H1 } from "./Text";

interface Props {
  title?: string;
  actions?: JSX.Element;
}

const Container: React.FC<Props> = ({ title, actions, children }) => {
  return (
    <Box mx={11} mt={11}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        mb={9}
      >
        <H1 fontWeight="500" fontSize="34px" letterSpacing="-0.5px">
          {title}
        </H1>
        {actions && actions}
      </Flex>
      {children}
    </Box>
  );
};

export default Container;
