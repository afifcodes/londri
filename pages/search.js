import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import Input from "@components/atomics/Input";
import axios from "axios";
export default function Home() {
  const [code, setCode] = useState("");

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleSearch = () => {
    Router.push(`/transactions/${code}`);
  };

  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <Layout>
        <div className="w-full mt-16 xl:mt-0">
          <p>Let's search your order 🎉</p>
          <div className="flex items-center justify-end flex-wrap my-4 xl:my-8">
            <Input
              type="text"
              placeholder="Transaction Code"
              value={code}
              onChange={handleCode}
            />
            <button
              onClick={handleSearch}
              className="my-2 p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4"
            >
              Search for it!
            </button>
          </div>
        </div>
      </Layout>
    </GlobalLayout>
  );
}
