import Head from "next/head";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";

export default function Transaction() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <Layout>
        <p>{id}</p>
      </Layout>
    </GlobalLayout>
  );
}
