import Head from "next/head";

interface Props {
  description: string;
  title: string;
  ogImage?: string;
}

const SEO: React.FC<Props> = ({ description, title, ogImage }) => (
  <Head>
    <meta name="description" content={description} />
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {ogImage && <meta property="og:image" content={ogImage} />}
  </Head>
);

export default SEO;
