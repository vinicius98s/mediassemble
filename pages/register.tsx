import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { fetcher as fetch } from "@services/api";

import Greeting from "@components/Greeting";
import { Box, Flex } from "@components/Box";
import { H1, P } from "@components/Text";
import Input from "@components/Input";
import Button from "@components/Button";
import SEO from "@components/SEO";

interface Response {
  success: boolean;
  msg: string;
}

export const Register = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Suas senhas não conferem!");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await fetch<Response>("/do_signup", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: btoa(password),
          name,
        }),
      });

      if (!data?.success || error) {
        toast.error(data?.msg || "Erro ao criar usuário!");
        return;
      }

      toast.success("Usuário criado com sucesso!");
    } catch (e) {
      toast.error("Erro ao criar usuário!");
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
          <form onSubmit={handleSubmit}>
            <H1 fontWeight={500} fontSize="46px" mb="14px">
              Criar uma conta
            </H1>
            <P color="dark.secondary" mb="80px" fontSize="16px">
              Você pode fazer login se já tiver conta.
            </P>
            <Input
              label="Nome"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Jhon Doe"
              type="text"
            />
            <Box height="32px" />
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
            <Box height="32px" />
            <Input
              label="Confirmar senha"
              id="confirm-password"
              placeholder="··········"
              type="password"
              autoComplete="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Box height="72px" />
            <Button type="submit" width="100%" loading={isLoading}>
              REGISTRAR
            </Button>
          </form>
          <Button
            width="100%"
            maxWidth={410}
            variant="secondary"
            onClick={router.back}
            mt={4}
          >
            VOLTAR
          </Button>
        </Flex>
      </Greeting>
    </>
  );
};

export default Register;
