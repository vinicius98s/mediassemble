import React from "react";

import Header from "@components/Header";
import SEO from "@components/SEO";
import Container from "@components/Container";

const Collections: React.FC = () => {
  return (
    <>
      <SEO title="Collections" description="Collections page" />
      <Header name="Jhon Doe" />
      <Container title="Minhas Coleções">
        <h1>collection</h1>
      </Container>
    </>
  );
};

export default Collections;
