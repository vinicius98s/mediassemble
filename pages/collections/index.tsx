import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import qs from "querystring";
import { toast } from "react-toastify";

import CollectionCard from "@components/CollectionCard";
import SEO from "@components/SEO";
import Container from "@components/Container";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { Box, Flex } from "@components/Box";
import Input from "@components/Input";
import ColorPicker, { useColor } from "@components/ColorPicker";
import Spinner from "@components/Spinner";
import { Text } from "@components/Text";

import { fetcher as fetch } from "@services/api";

import { styled } from "@styles/theme";

import useAuth from "@hooks/useAuth";
import { fileInfo } from "@lib/files";

const CollectionsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 32px;
  grid-row-gap: 32px;

  @media (max-width: 1480px) {
    grid-template-columns: auto auto auto;
    min-width: 320px;
  }

  div:not(:last-of-type) {
    margin-right: ${(p) => p.theme.space[6]}px;
  }
`;

interface Collection {
  hexadecimal_color: string;
  name: string;
  total_files: number;
  recent_files: Array<{
    filename: string;
  }>;
}

type Data = {
  data: {
    collections: Array<Collection>;
    success: boolean;
  };
};

type ResponseError = {
  success: boolean;
  msg: string;
};

const formatRecentFileNames = (files: Array<{ filename: string }>) => {
  return files.map((file) => {
    const info = fileInfo(file.filename);
    return {
      type: info?.extension as string,
      name: info?.name as string,
    };
  });
};

type AddCollectionResponse = { success: boolean; msg: string };

const Collections: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addCollectionModal, setAddCollectionModal] = useState(false);
  const [loadingAddCollection, setLoadingAddCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [color, setColor] = useColor("green");

  const router = useRouter();

  const { isAuthenticated, user } = useAuth();
  if (process.browser) {
    if (!isAuthenticated) {
      router.push("/");
    }
  }

  const params = qs.stringify({ username: user?.username });

  const { data, error, revalidate } = useSWR<Data, ResponseError>(
    `/list_collection?${params}`,
    { refreshInterval: 3000, revalidateOnMount: true }
  );

  useEffect(() => {
    setIsLoading(!data && !error);
  }, [data, error]);

  const handleAddNewCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAddCollection(true);

    try {
      const { data, error } = await fetch<AddCollectionResponse>(
        "/create_collection",
        {
          method: "POST",
          body: JSON.stringify({
            username: user?.username,
            collection_name: newCollectionName,
            hexadecimal_color: color.hex,
          }),
        }
      );

      if (!data?.success || error) {
        toast.error("Erro ao criar coleção!");
        return;
      }

      await revalidate();
      setAddCollectionModal(false);
      setNewCollectionName("");
      setColor("green");
      toast.success("Coleção adicionada com sucesso!");
    } catch (e) {
      toast.error("Erro ao criar coleção!");
    } finally {
      setLoadingAddCollection(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={addCollectionModal}
        onRequestClose={() => setAddCollectionModal(false)}
        title="Adicionar nova Coleção"
      >
        <Flex width="100%" justifyContent="center">
          <form onSubmit={handleAddNewCollection}>
            <Input
              id="name"
              label="Nome"
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="ex: Escola"
            />
            <Box height="48px" />
            <ColorPicker
              selectedColorName={color.name}
              onChangeColor={setColor}
            />
            <Flex justifyContent="center" mt={10}>
              <Button type="submit" loading={loadingAddCollection}>
                SALVAR COLEÇÃO
              </Button>
            </Flex>
          </form>
        </Flex>
      </Modal>

      <SEO title="Coleções" description="Página de coleções" />

      <Container
        title="Minhas Coleções"
        actions={
          <Button ml="auto" onClick={() => setAddCollectionModal(true)}>
            ADICIONAR COLEÇÃO
          </Button>
        }
      >
        {isLoading ? (
          <Flex
            width="100%"
            height="calc(100vh - 400px)"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size={35} dark />
          </Flex>
        ) : !data?.data.collections?.length ? (
          <Text fontSize={3}>Parece que você não tem nenhuma coleção</Text>
        ) : (
          <CollectionsWrapper>
            {data.data.collections.map((collection, index) => (
              <CollectionCard
                key={index}
                color={collection.hexadecimal_color}
                name={collection.name}
                recentFiles={formatRecentFileNames(collection.recent_files)}
                totalFiles={collection.total_files}
              />
            ))}
          </CollectionsWrapper>
        )}
      </Container>
    </>
  );
};

export default Collections;
