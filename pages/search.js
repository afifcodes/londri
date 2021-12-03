import Head from "next/head";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
export default function Home() {
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
            <input
              type="text"
              placeholder="Transaction Code"
              className="w-full border-2 sm:border-4 outline-none focus:outline-none focus:border-blue-300 active:outline-none p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl text-xs sm:text-base md:text-xl"
            />
            <button className="my-2 p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4">
              Search for it!
            </button>
          </div>
        </div>
      </Layout>
    </GlobalLayout>
  );
}
