import Head from "next/head";

import { H1 } from "@components/Headings";

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <H1 color="dark.primary">Hello World</H1>
  </>
);

export default Home;
