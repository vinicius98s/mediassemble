import React, { useState } from "react";
import { useRouter } from "next/router";

import CollectionCard from "@components/CollectionCard";
import SEO from "@components/SEO";
import Container from "@components/Container";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { Box, Flex } from "@components/Box";
import Input from "@components/Input";
import ColorPicker from "@components/ColorPicker";

import { styled } from "@styles/theme";

import useAuth from "@hooks/useAuth";

const CollectionsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 32px;
  grid-row-gap: 32px;

  @media (max-width: 1480px) {
    grid-template-columns: auto auto auto;
  }

  div:not(:last-of-type) {
    margin-right: ${(p) => p.theme.space[6]}px;
  }
`;

const Collections: React.FC = () => {
  const [addCollectionModal, setAddCollectionModal] = useState(false);
  const router = useRouter();

  if (process.browser) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      router.push("/");
    }
  }

  return (
    <>
      <Modal
        isOpen={addCollectionModal}
        onRequestClose={() => setAddCollectionModal(false)}
        title="Adicionar nova Coleção"
      >
        <Flex width="100%" justifyContent="center">
          <Box>
            <Input id="name" label="Nome" placeholder="ex: Escola" />
            <Box height="48px" />
            <ColorPicker />
          </Box>
        </Flex>
      </Modal>
      <SEO title="Collections" description="Collections page" />
      <Container
        title="Minhas Coleções"
        actions={
          <Button ml="auto" onClick={() => setAddCollectionModal(true)}>
            ADICIONAR COLEÇÃO
          </Button>
        }
      >
        <CollectionsWrapper>
          <CollectionCard
            color="green"
            name="Escola"
            recentFiles={[{ name: "documentario.mp3", type: "mp3" }]}
            totalFiles={1}
            slug="escola"
          />
          <CollectionCard
            color="blue"
            name="Programação"
            recentFiles={[
              { name: "audio__01.mp3", type: "mp3" },
              { name: "audio_02.mp3", type: "mp3" },
              { name: "aula001.mp3", type: "mp3" },
            ]}
            totalFiles={6}
            slug="programação"
          />
          <CollectionCard
            color="red"
            name="Nova coleção"
            recentFiles={[]}
            totalFiles={0}
            slug="nova-coleção"
          />
          <CollectionCard
            color="red"
            name="Nova coleção"
            recentFiles={[]}
            totalFiles={0}
            slug="nova-coleção"
          />
          <CollectionCard
            color="red"
            name="Nova coleção"
            recentFiles={[]}
            totalFiles={0}
            slug="nova-coleção"
          />
        </CollectionsWrapper>
      </Container>
    </>
  );
};

export default Collections;
