import React from "react";

import Container from "@components/Container";
import { Box, Flex } from "@components/Box";
import Button from "@components/Button";
import SEO from "@components/SEO";

import { styled } from "@styles/theme";
import { Text } from "@components/Text";
import ListFiles from "@components/ListFiles";

const FilesContainer = styled(Flex)`
  width: 56vw;
  height: calc(100vh - 334px);
`;

const UploadInput = styled.button`
  width: 30vw;
  height: calc(100vh - 334px);
  box-shadow: 0px 1px 10px 2px rgba(0, 150, 199, 0.1);
  border-radius: 12px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%230096C7FF' opacity='0.3' stroke-width='4' stroke-dasharray='15%2c 15' stroke-dashoffset='82' stroke-linecap='square'/%3e%3c/svg%3e");
  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 50%;
  }

  input[type="file"] {
    display: none;
  }

  :hover {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%230096C7FF' opacity='1' stroke-width='4' stroke-dasharray='15%2c 15' stroke-dashoffset='82' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;

const Upload = () => {
  return (
    <>
      <SEO title="Enviar arquivos" description="Envie seus arquivos" />
      <Container
        title="Envie seus arquivos"
        breadcrumb={[
          { href: "/collections", label: "Minhas Coleções", isActive: false },
          { href: "/upload", label: "Enviar arquvios", isActive: true },
        ]}
        actions={
          <Box ml="auto">
            <Button>Enviar arquivos</Button>
          </Box>
        }
      >
        <Flex>
          <UploadInput>
            <input type="file" />
            <img src="/images/upload.png" />
            <Text color="blue.primary" fontSize="20px" mt="80px">
              Selecione ou Arraste seus arquivos
            </Text>
            <Text fontSize="18px" mt="16px">
              Tipos suportados: <b>mp3</b> e <b>mp4</b>
            </Text>
          </UploadInput>
          <FilesContainer ml="auto">
            <ListFiles
              chooseColleciton
              files={[
                { name: "audio_01.mp3" },
                { name: "audio__002.mp3" },
                { name: "aula001.mp3" },
                { name: "audio_aula_2.mp3" },
                { name: "audio_01.mp3" },
                { name: "audio__002.mp3" },
                { name: "aula001.mp3" },
                { name: "audio_aula_2.mp3" },
              ]}
            />
          </FilesContainer>
        </Flex>
      </Container>
    </>
  );
};

export default Upload;
