import React, { useEffect, useRef, useState } from "react";
import qs from "querystring";
import useSWR from "swr";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import fetch from "isomorphic-unfetch";

import { fetcher as apiFetch } from "@services/api";

import Container from "@components/Container";
import { Box, Flex } from "@components/Box";
import Button from "@components/Button";
import SEO from "@components/SEO";
import { Text } from "@components/Text";
import ListFiles from "@components/ListFiles";
import Spinner from "@components/Spinner";

import useAuth from "@hooks/useAuth";

import { Wrapper, UploadInput } from "../upload/styles";
import {
  Data,
  Files,
  ResponseError,
  SignedURLResponse,
  SignedUrl,
} from "../upload/types";

const Upload = () => {
  const [collections, setCollections] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [files, setFiles] = useState<Files>([]);
  const [loadingCollections, setLoadingCollections] = useState(false);

  const [isGeneratingSignedUrls, setIsGeneratingSignedUrls] = useState(false);
  const [signedUrls, setSignedUrls] = useState<SignedUrl[]>([]);

  const router = useRouter();

  const { isAuthenticated, user } = useAuth();
  if (process.browser) {
    if (!isAuthenticated) {
      router.push("/");
    }
  }

  const params = qs.stringify({ username: user?.username });
  const { data, error } = useSWR<Data, ResponseError>(
    `/list_collection?${params}`
  );

  useEffect(() => {
    let inputFiles = fileInputRef.current?.files;
    if (inputFiles?.length !== files.length) {
      inputFiles = (Array.from(inputFiles || []).filter(
        (file) => !files.find((f) => f.fileName === file.name)
      ) as unknown) as FileList;
    }
  }, [files]);

  useEffect(() => {
    if (!data && !error) {
      setLoadingCollections(true);
      return;
    }

    if (!data?.data.success || error) {
      toast.error("Falha ao carregar coleções!");
    }

    if (data?.data.collections.length) {
      setCollections(
        data.data.collections.map((c) => ({
          label: c.name,
          value: c.name,
        }))
      );
    }
    setLoadingCollections(false);
  }, [data, error]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        file,
        fileName: file.name,
        collection: collections[0],
      }));
      setFiles([...files, ...newFiles]);
    }
  };
  const onClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeCollectionFile = (
    newCollection: { label: string; value: string },
    fileName: string
  ) => {
    setFiles(
      files.map((f) =>
        f.fileName === fileName ? { ...f, collection: newCollection } : f
      )
    );
  };

  const onDeleteOption = (fileName: string) => {
    setFiles(files.filter((f) => f.fileName !== fileName));
  };

  const generateSingleSignedUrl = async (file: Files[0]) => {
    try {
      const { data } = await apiFetch<SignedURLResponse>("/get_signed_url", {
        method: "POST",
        body: JSON.stringify({
          username: user?.username,
          filename: file.fileName,
          contentType: file.file.type,
          collection: file.collection.value,
        }),
      });

      if (data?.signed_url && data.metadata_header) {
        await sendSingleImage({
          file: file.file,
          signedUrl: data.signed_url,
          header: data.metadata_header["x-goog-meta-collection"],
        });
      }
    } catch (e) {
      throw new Error("File signed url error");
    }
  };

  const sendSingleImage = async (singleSignedUrl: SignedUrl) => {
    try {
      const formData = new FormData();
      formData.append("data", singleSignedUrl.file);
      await fetch(singleSignedUrl.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": singleSignedUrl.file.type,
          "x-goog-meta-collection": singleSignedUrl.header,
        },
        body: formData,
      });
    } catch (e) {
      console.error("Failed to send images:", e);
    }
  };

  const generateAllSignedUrls = async () => {
    setIsGeneratingSignedUrls(true);
    try {
      await Promise.all([...files].map(generateSingleSignedUrl));
      toast.success("Arquivos enviadas com sucesso!");
      setFiles([]);
    } catch (e) {
      toast.error("Falha ao gerar urls dos arquivos!");
      console.error("Failed all signed urls:", e);
    } finally {
      setIsGeneratingSignedUrls(false);
    }
  };

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
            <Button
              loading={isGeneratingSignedUrls}
              onClick={generateAllSignedUrls}
            >
              Enviar arquivos
            </Button>
          </Box>
        }
      >
        <Wrapper>
          <UploadInput onClick={onClickUpload} disabled={!collections.length}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onChangeInputFile}
              accept="image/png, image/jpg, audio/mp3, video/mp4"
              multiple
            />
            <img src="/images/upload.png" />
            <Text color="blue.primary" fontSize="20px" mt="80px">
              Selecione seus arquivos
            </Text>
            <Text fontSize="18px" mt="16px">
              Tipos suportados: <b>mp3</b>, <b>mp4</b>, <b>jpg</b> e <b>png</b>
            </Text>
          </UploadInput>
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            {loadingCollections || !collections.length ? (
              <Flex alignItems="center" flexDirection="column">
                <Spinner size={20} dark />
                <Text mt={2}>Carregando coleções</Text>
              </Flex>
            ) : (
              <ListFiles
                collections={collections}
                onChangeCollectionFile={onChangeCollectionFile}
                files={files}
                dropdownOptions={[
                  { label: "Deletar", onClick: onDeleteOption },
                ]}
              />
            )}
          </Flex>
        </Wrapper>
      </Container>
    </>
  );
};

export default Upload;
