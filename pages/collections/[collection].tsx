import React, { createRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import qs from "querystring";
import ReactPlayer from "react-player/lazy";

import SEO from "@components/SEO";
import Container from "@components/Container";
import { Box, Flex } from "@components/Box";
import Button from "@components/Button";
import { Text } from "@components/Text";
import ListFiles from "@components/ListFiles";
import ConvertedText from "@components/ConvertedText";

import useAuth from "@hooks/useAuth";
import Spinner from "@components/Spinner";
import { fileInfo } from "@lib/files";
// import DeleteCollectionModal from "@components/DeleteCollectionModal";

interface ActionsProps {
  onDeleteClick?: () => void;
  onUploadFilesClick?: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  onDeleteClick,
  onUploadFilesClick,
}) => (
  <Flex ml="auto">
    {/* <Button mr={4} variant="danger" onClick={onDeleteClick}>
      DELETAR
    </Button> */}
    <Button onClick={onUploadFilesClick}>ENVIAR ARQUIVOS</Button>
  </Flex>
);

interface Response {
  data: {
    files: Array<{
      name: string;
      public_url: string;
      transcript_url: string | false;
    }>;
  };
}

const Collections: React.FC = () => {
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

  const { data, error } = useSWR<Response>(`/list_files?${params}`);

  const [selectedFile, setSelectedFile] = useState(data?.data.files[0]);

  useEffect(() => {
    if (data?.data.files[0]) {
      setSelectedFile(data.data.files[0]);
    }
  }, [data]);

  const loading = !data && !error;

  const selectedFileInfo = selectedFile && fileInfo(selectedFile.name);

  const playerRef = createRef<ReactPlayer>();

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
                files={data?.data.files.map((file) => ({
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
              transcript_url={selectedFile?.transcript_url}
              loading={loading}
              username={user?.username as string}
              filename={selectedFile?.name}
              playerRef={playerRef}
              collectionName={collectionName}
            />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Collections;
