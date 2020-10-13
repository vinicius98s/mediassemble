import React, { createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import qs from "querystring";
import ReactPlayer from "react-player/lazy";

import { fetcher as fetch } from "@services/api";

import SEO from "@components/SEO";
import Container from "@components/Container";
import { Box, Flex } from "@components/Box";
import Button from "@components/Button";
import { Text } from "@components/Text";
import ListFiles from "@components/ListFiles";
import ConvertedText from "@components/ConvertedText";
import Spinner from "@components/Spinner";
// import DeleteCollectionModal from "@components/DeleteCollectionModal";

import useAuth from "@hooks/useAuth";

import { fileInfo } from "@lib/files";

import { styled } from "@styles/theme";
import { toast } from "react-toastify";
import useLocalStorage from "@hooks/useLocalStorage";

interface ActionsProps {
  onDeleteClick?: () => void;
  onUploadFilesClick?: () => void;
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitSearchForm?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ActionsWrapper = styled(Flex)`
  form {
    position: relative;

    > button {
      position: absolute;
      right: 12px;
      top: 0;
    }

    > input {
      width: 420px;
      margin-right: 12px;
      border: 2px solid #00b4d8;
      border-radius: 8px;
      padding: 12px 16px;
      outline: none;
    }
  }
`;

const Actions: React.FC<ActionsProps> = ({
  onDeleteClick,
  onUploadFilesClick,
  onChangeInput,
  onSubmitSearchForm,
}) => {
  return (
    <ActionsWrapper ml="auto">
      {/* <Button mr={4} variant="danger" onClick={onDeleteClick}>
        DELETAR
      </Button> */}
      <form onSubmit={onSubmitSearchForm}>
        <input placeholder="Procure por arquivos" onChange={onChangeInput} />
        <Button type="submit" variant="secondary">
          PESQUISAR
        </Button>
      </form>
      <Button onClick={onUploadFilesClick}>ENVIAR ARQUIVOS</Button>
    </ActionsWrapper>
  );
};

interface Response {
  data: {
    files: Array<{
      name: string;
      public_url: string;
      transcript_url: string | false;
    }>;
  };
}

interface SearchResponse {
  files_found: Array<string>;
  success: boolean;
}

const Collections: React.FC = () => {
  const [searchInFilesText, setSearchInFilesText] = useState("");
  const [foundFiles, setFoundFiles] = useState<string[]>([]);

  const router = useRouter();
  const collectionName = router.query.collection as string;

  const { user, isAuthenticated } = useAuth();
  if (process.browser && !isAuthenticated) {
    router.push("/");
  }

  const params = qs.stringify({
    prefix: user?.username,
    collection: collectionName,
  });

  const { data, error } = useSWR<Response>(`/list_files?${params}`, {
    revalidateOnMount: true,
    refreshInterval: 3000,
  });

  const [selectedFile, setSelectedFile] = useState(data?.data.files[0]);
  const [filesBeingTranscripted, setFilesBeingTranscripted] = useLocalStorage<
    string[]
  >("transcripting-files", []);

  useEffect(() => {
    if (selectedFile) {
      const isCurrentTranscripting = filesBeingTranscripted.includes(
        selectedFile.name
      );
      if (isCurrentTranscripting && !!selectedFile.transcript_url) {
        setFilesBeingTranscripted(
          filesBeingTranscripted.filter(
            (filename) => filename !== selectedFile.name
          )
        );
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    if (data?.data.files) {
      if (selectedFile) {
        const newSelectedFile = data.data.files.find(
          (f) => f.name === selectedFile.name
        );
        setSelectedFile(newSelectedFile);
      } else {
        setSelectedFile(data.data.files[0]);
      }
    }
  }, [data, error]);

  const loading = !data && !error;

  const selectedFileInfo = selectedFile && fileInfo(selectedFile.name);

  const playerRef = createRef<ReactPlayer>();

  useEffect(() => {
    if (searchInFilesText === "") {
      setFoundFiles([]);
    }
  }, [searchInFilesText]);

  const handleSubmitSearchForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const params = qs.stringify({
      username: user?.username,
      collection: collectionName,
      term: searchInFilesText,
    });

    const { data, error } = await fetch<SearchResponse>(
      `/search_in_files?${params}`
    );

    if ((!data?.success && !data?.files_found.length) || error) {
      toast.warn("Termo não encontrado!");
      return;
    }

    if (data.files_found.length) {
      setFoundFiles(data.files_found);
    }
  };
  return (
    <>
      {/* <DeleteCollectionModal /> */}
      <SEO title="Collections" description="Collections page" />
      <Container
        breadcrumb={[
          { label: "Minhas Coleções", href: "/collections", isActive: false },
          {
            label: collectionName,
            href: {
              pathname: "/collections/[collection]",
              href: `/collection/${collectionName}`,
            },
            isActive: true,
          },
        ]}
        collection={{
          name: collectionName,
          color: "green",
        }}
        actions={
          <Actions
            // onDeleteClick={() => setIsDeleteModalOpen(true)}
            onUploadFilesClick={() => router.push("/upload")}
            onChangeInput={(e) => setSearchInFilesText(e.target.value)}
            onSubmitSearchForm={handleSubmitSearchForm}
          />
        }
      >
        <Flex>
          <Box width="30vw">
            {loading ? (
              <Flex alignItems="center" justifyContent="center" height="100%">
                <Spinner dark size={20} />
              </Flex>
            ) : !data?.data.files.length ? (
              <Text>Você não tem arquivos nessa coleção</Text>
            ) : (
              <ListFiles
                onClickFile={(fileName) => {
                  setSelectedFile(
                    data.data.files.find((f) => f.name === fileName)
                  );
                }}
                selectedFileName={selectedFile?.name}
                files={data?.data.files
                  .filter((file) =>
                    foundFiles.length ? foundFiles.includes(file.name) : true
                  )
                  .map((file) => ({
                    fileName: file.name,
                  }))}
                accordion={
                  <>
                    {new RegExp(/mp(3|4)/).test(
                      selectedFileInfo?.extension || ""
                    ) ? (
                      <ReactPlayer
                        ref={playerRef}
                        url={selectedFile?.public_url}
                        controls={true}
                        height={
                          selectedFileInfo?.extension === "mp3" ? 80 : 260
                        }
                      />
                    ) : (
                      <Box mt={3}>
                        <img src={selectedFile?.public_url} width="100%" />
                      </Box>
                    )}
                  </>
                }
              />
            )}
          </Box>
          <Flex ml="auto">
            <ConvertedText
              hasFiles={(data?.data.files.length || 0) > 0}
              file={selectedFile}
              isFileBeingTranscripted={
                selectedFile
                  ? filesBeingTranscripted.includes(selectedFile.name)
                  : false
              }
              loading={loading}
              username={user?.username as string}
              filename={selectedFile?.name}
              playerRef={playerRef}
              onClickTranscribeFile={() => {
                if (selectedFile) {
                  setFilesBeingTranscripted([
                    ...filesBeingTranscripted,
                    selectedFile.name,
                  ]);
                } else {
                  throw new Error("Clique no transcrever sem selectedFile");
                }
              }}
            />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Collections;
