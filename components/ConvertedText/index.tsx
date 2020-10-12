import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fetch from "isomorphic-unfetch";
import ReactPlayer from "react-player/lazy";

import { fetcher as apiFetch } from "@services/api";

import { Box, Flex } from "../Box";
import { Text } from "../Text";
import Button from "../Button";
import Spinner from "../Spinner";

import * as S from "./styles";

interface Props {
  transcript_url?: string | false;
  hasFiles?: boolean;
  loading?: boolean;
  username: string;
  filename?: string;
  playerRef: React.RefObject<ReactPlayer>;
}

interface Response {
  success: boolean;
  msg: string;
}

type TranscriptedText = {
  TIMESTAMP: string;
  transcript:
    | string
    | Array<
        Record<
          string,
          {
            time_seconds: number;
            time_milli: string;
          }
        >
      >;
};

const ConvertedText: React.FC<Props> = ({
  transcript_url,
  hasFiles,
  loading,
  username,
  filename,
  playerRef,
}) => {
  const [
    transcriptedText,
    setTranscriptedText,
  ] = useState<TranscriptedText | null>(null);
  const [searchWord, setSearchWord] = useState("");
  // TODO: implement it with localStorage
  const [loadingTranscriptedText, setLoadingTranscriptedText] = useState(false);

  const [isTranscribingFile, setIsTranscribingFile] = useState(false);

  const falsyTranscriptUrl = transcript_url === false;

  useEffect(() => {
    if (falsyTranscriptUrl || !transcript_url) {
      setTranscriptedText(null);
      return;
    }

    if (transcript_url) {
      (async () => {
        try {
          setLoadingTranscriptedText(true);
          const res = await fetch(
            transcript_url
              .replace("/mediassemble-transcripts/", "/")
              .replace("https://", "https://mediassemble-transcripts.")
          );
          const data = (await res.json()) as TranscriptedText;
          setTranscriptedText(data);
        } catch (e) {
          console.error("Transcript URL error", e);
          toast.error("Erro ao buscar texto transcrito!");
        } finally {
          setLoadingTranscriptedText(false);
        }
      })();
    }
  }, [transcript_url]);

  async function convertText() {
    try {
      setIsTranscribingFile(true);

      const { data, error } = await apiFetch<Response>("/convert_to_text_pub", {
        method: "POST",
        body: JSON.stringify({
          prefix: username,
          filename,
        }),
      });

      if (!data?.success || error) {
        toast.error(data?.msg || "Falha ao transcrever arquivo!");
        return;
      }

      toast.success("Arquivo transcrito com sucesso!");
    } catch (e) {
      toast.error("Falha ao transcrever arquivo!");
    } finally {
      setIsTranscribingFile(false);
    }
  }

  const handleWordClick = (seconds: number) => {
    playerRef.current?.seekTo(seconds - 0.5, "seconds");
    const player = playerRef.current?.getInternalPlayer() as HTMLMediaElement;
    player.play();
  };

  return (
    <Box>
      <S.InputAndButtonWrapper position="relative">
        <S.CustomInput
          onChange={(e) => setSearchWord(e.target.value)}
          disabled={!transcriptedText?.transcript}
          placeholder="Tente procurar por alguma palavra"
        />
      </S.InputAndButtonWrapper>
      <S.TextContainer noFiles={!hasFiles}>
        {loading ? (
          <Flex
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner dark size={20} />
          </Flex>
        ) : (
          <>
            {transcriptedText?.transcript ? (
              <>
                {typeof transcriptedText.transcript === "string" ? (
                  transcriptedText.transcript.split("\n").map((word, i) => (
                    <React.Fragment key={`${word}${i}`}>
                      {i > 0 && <br />}
                      {word.split(" ").map((w, i) => (
                        <S.Word
                          key={`${i}-${w}`}
                          highlight={
                            searchWord.trim().toLowerCase() ===
                              w.trim().toLowerCase() && w !== ""
                          }
                        >
                          {w}
                        </S.Word>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <Flex width="100%" flexWrap="wrap">
                    {transcriptedText.transcript.map((obj) => {
                      const [word] = Object.keys(obj);
                      const { time_seconds, time_milli } = obj[word];
                      return (
                        <S.Word
                          key={`${word}${time_seconds}${time_milli}`}
                          clickable
                          highlight={
                            searchWord.trim().toLowerCase() ===
                              word.trim().toLowerCase() && word !== " "
                          }
                          onClick={() => handleWordClick(time_seconds)}
                        >
                          {word}
                        </S.Word>
                      );
                    })}
                  </Flex>
                )}
              </>
            ) : (
              <Flex
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                mt={2}
              >
                {!hasFiles && (
                  <Text fontSize="17px">
                    Você precisa de arquivos na coleção para transcrevê-los!
                  </Text>
                )}
                {falsyTranscriptUrl && (
                  <>
                    <Text fontSize="17px">
                      Transcreva esse arquivo para texto!
                    </Text>
                    <Button
                      loading={isTranscribingFile}
                      onClick={convertText}
                      mt={4}
                    >
                      TRANSCREVER
                    </Button>
                  </>
                )}
              </Flex>
            )}
          </>
        )}
      </S.TextContainer>
    </Box>
  );
};

export default ConvertedText;
