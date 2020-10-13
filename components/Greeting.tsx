import React from "react";
import styled from "@emotion/styled";
import { css } from "emotion";

import { Colors } from "@styles/theme";

import { Flex, Box } from "./Box";
import { H1, H3 } from "./Text";

interface Props {
  bg?: Colors;
}

const FilesImg = styled.img`
  position: absolute;
  bottom: -24px;
  right: -64px;
  opacity: 0.2;
  width: 65%;
`;

const DetailsImg = styled.img<{ upside?: boolean }>`
  position: absolute;
  ${(p) =>
    p.upside
      ? css`
          top: 0px;
          right: -14px;
        `
      : css`
          bottom: -20px;
        `}
`;

const Greeting: React.FC<Props> = ({ bg = "offWhite", children }) => {
  return (
    <Flex>
      <Box
        height="100vh"
        bg={bg}
        maxWidth={831}
        width="100%"
        position="relative"
        overflow="hidden"
      >
        <Box maxWidth={490} mt={246} ml={10}>
          <H1 fontWeight="normal" fontSize={58} letterSpacing={-0.5}>
            Bem-vindo ao
          </H1>
          <img src="/images/logo.png" />
          <H3
            color="dark.secondary"
            fontWeight="normal"
            lineHeight="29px"
            fontSize={24}
            mt={4}
          >
            Experimente a mais nova plataforma de transcrição de vídeo, áudios e
            imagens. <br />
            <br />
          </H3>
          <H3
            color="dark.secondary"
            fontWeight="normal"
            lineHeight="29px"
            fontSize={20}
          >
            Organize, transcreva e consulte, com facilidade seus mais imporantes
            registros.
          </H3>
        </Box>
        <FilesImg src="/images/welcome.png" />
        <DetailsImg upside src="/images/detail-circles-up.png" />
        <DetailsImg src="/images/detail-circles.png" />
      </Box>
      {children}
    </Flex>
  );
};

export default Greeting;
