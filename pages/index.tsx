import React, { useState } from "react";
import { useRouter } from "next/router";

import Greeting from "@components/Greeting";
import { Box, Flex } from "@components/Box";
import { H1, P } from "@components/Text";
import Input from "@components/Input";
import Button from "@components/Button";
import SEO from "@components/SEO";

export const Home = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "test@mediassemble.com" && password === "mediassemble") {
      router.push("/collections");
    }
  };

  return (
    <>
      <SEO title="Mediassemble" description="Mediassemble home page" />
      <Greeting>
        <Flex
          width="100%"
          height="100vh"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="white"
        >
          <Box>
            <H1 fontWeight="500" fontSize={6} mb="14px">
              Login
            </H1>
            <P color="dark.secondary" mb={10} fontSize={3}>
              Você pode criar uma conta se não tiver.
            </P>
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                id="email"
                placeholder="ex: jhon@doe.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box height="32px" />
              <Input
                label="Senha"
                id="password"
                placeholder="··········"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box height="72px" />
              <Button width="100%" type="submit">
                LOGIN
              </Button>
            </form>
            <Box height={5} />
            <Button
              width="100%"
              variant="secondary"
              onClick={() => router.push("/register")}
            >
              CRIAR UMA CONTA
            </Button>
          </Box>
        </Flex>
      </Greeting>
    </>
  );
};

export default Home;
