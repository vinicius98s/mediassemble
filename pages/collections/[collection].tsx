import React, { useState } from "react";
import { useRouter } from "next/router";

import SEO from "@components/SEO";
import Container from "@components/Container";
import { Box, Flex } from "@components/Box";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { Text } from "@components/Text";
import ListFiles from "@components/ListFiles";
import ConvertedText from "@components/ConvertedText";

import { styled } from "@styles/theme";

interface ActionsProps {
  onDeleteClick?: () => void;
  onUploadFilesClick?: () => void;
}

const DeleteTextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  span {
    max-width: 528px;
  }
`;

const Actions: React.FC<ActionsProps> = ({
  onDeleteClick,
  onUploadFilesClick,
}) => (
  <Flex ml="auto">
    <Button mr={4} variant="danger" onClick={onDeleteClick}>
      DELETAR
    </Button>
    <Button onClick={onUploadFilesClick}>ENVIAR ARQUIVOS</Button>
  </Flex>
);

const Collections: React.FC = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        minHeight={480}
        title="Deletar coleção?"
      >
        <DeleteTextWrapper>
          <Text fontSize="20px" fontWeight="400" lineHeight="30px">
            Tem certeza que deseja deletar a coleção <b>Escola</b>?
            <br />
            <br />
            Essa ação é permanente e <b>não pode ser restaurada!</b>
          </Text>
          <Flex mt="96px">
            <Button mr={4} onClick={() => setIsDeleteModalOpen(false)}>
              CANCELAR
            </Button>
            <Button variant="danger">DELETAR</Button>
          </Flex>
        </DeleteTextWrapper>
      </Modal>
      <SEO title="Collections" description="Collections page" />
      <Container
        breadcrumb={[
          { label: "Minhas Coleções", href: "/collections", isActive: false },
          {
            label: "Escola",
            href: {
              pathname: "/collections/[collection]",
              href: `/collections/escola`,
            },
            isActive: true,
          },
        ]}
        collection={{
          name: "Escola",
          color: "green",
        }}
        actions={
          <Actions
            onDeleteClick={() => setIsDeleteModalOpen(true)}
            onUploadFilesClick={() => router.push("/upload")}
          />
        }
      >
        <Flex>
          <Box width="30vw">
            <ListFiles
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
          </Box>
          <Flex ml="auto">
            <ConvertedText />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Collections;
