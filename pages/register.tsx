import React from "react";
import { useRouter } from "next/router";

import Greeting from "@components/Greeting";
import { Box, Flex } from "@components/Box";
import { H1, P } from "@components/Text";
import Input from "@components/Input";
import Button from "@components/Button";
import SEO from "@components/SEO";

export const Register = (): JSX.Element => {
  const router = useRouter();
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
        >
          <Box>
            <H1 fontWeight={500} fontSize={48} mb="14px">
              Criar uma conta
            </H1>
            <P color="dark.secondary" mb="80px" fontSize="16px">
              Você pode fazer login se já tiver conta.
            </P>
            <Input label="Nome" id="name" placeholder="Jhon Doe" type="text" />
            <Box height="32px" />
            <Input
              label="Email"
              id="email"
              placeholder="ex: jhon@doe.com"
              type="email"
            />
            <Box height="32px" />
            <Input
              label="Senha"
              id="password"
              placeholder="··········"
              type="password"
            />
            <Box height="32px" />
            <Input
              label="Confirmar senha"
              id="confirm-password"
              placeholder="··········"
              type="password"
            />
            <Box height="72px" />
            <Button>REGISTRAR</Button>
            <Box height="24px" />
            <Button variant="secondary" onClick={router.back}>
              VOLTAR
            </Button>
          </Box>
        </Flex>
      </Greeting>
    </>
  );
};

export default Register;
