import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { fetcher as fetch } from "@services/api";

import Greeting from "@components/Greeting";
import { Box, Flex } from "@components/Box";
import { H1, P } from "@components/Text";
import Input from "@components/Input";
import Button from "@components/Button";
import SEO from "@components/SEO";

import useAuth from "@hooks/useAuth";

interface Response {
  success: boolean;
  msg: string;
  name: string;
}

export const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { isAuthenticated, setUser } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/collections");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error("Preencha todos campos!");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await fetch<Response>("/do_login", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: btoa(password),
        }),
      });

      if (!data?.success || error) {
        toast.error(data?.msg || "Falha ao fazer login");
        return;
      }

      setUser({ name: data.name, username: email });
      router.push("/collections");
    } catch (e) {
      toast.error("Falha ao fazer login");
    } finally {
      setIsLoading(false);
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
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box height="72px" />
              <Button width="100%" type="submit" loading={isLoading}>
                LOGIN
              </Button>
            </form>
            <Button
              width="100%"
              variant="secondary"
              onClick={() => router.push("/register")}
              maxWidth={410}
              mt={4}
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
