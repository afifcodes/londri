import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@utils/UserContext";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import Input from "@components/atomics/Input";
import Tag from "@components/atomics/Tag";
import Footer from "@components/Footer";
import router from "next/router";
export default function Home() {
  const user = useContext(UserContext);
  const [dataTrans, setDataTrans] = useState({
    nama: "",
    alamat: "",
    email: "",
    hp: "",
    tipe: "",
  });
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const handleTypeChange = (e) => {
    console.log(e.target.value);
    setDataTrans({ ...dataTrans, tipe: e.target.value });
  };
  const handleNamaChange = (e) => {
    setDataTrans({ ...dataTrans, nama: e.target.value });
  };
  const handleAlamatChange = (e) => {
    setDataTrans({ ...dataTrans, alamat: e.target.value });
  };
  const handleEmailChange = (e) => {
    setDataTrans({ ...dataTrans, email: e.target.value });
  };
  const handleHpChange = (e) => {
    setDataTrans({ ...dataTrans, hp: e.target.value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const postTransaction = async () => {
    try {
      const data = await axios.post(
        `${process.env.API_HOME}/transactions`,
        dataTrans
      );
      if (data.status === 200) {
        setIsError(false);
      } else {
        setIsError(true);
      }
      setShow(true);
    } catch (e) {
      setIsError(true);
      setShow(true);
    }
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  useEffect(() => {
    if (router.pathname.includes("login")) {
      router.push("/");
    }
  }, []);

  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <Layout>
        <Footer isError={isError} show={show} />
        <div className="w-full mt-16 xl:mt-0">
          <p>Let's proceed your order 🎉</p>
          <div className="grid gap-2 sm:gap-4 grid-cols-2 my-4 xl:my-8">
            <div className="col-span-2 grid grid-cols-3 gap-2">
              <Tag
                value="0"
                onClick={handleTypeChange}
                css={
                  dataTrans.tipe === "0" ? "bg-blue-500 text-white" : "bg-white"
                }
              >
                Cuci Kering
              </Tag>
              <Tag
                value="1"
                onClick={handleTypeChange}
                css={
                  dataTrans.tipe === "1" ? "bg-blue-500 text-white" : "bg-white"
                }
              >
                Cuci Setrika
              </Tag>
              <Tag
                value="2"
                onClick={handleTypeChange}
                css={
                  dataTrans.tipe === "2" ? "bg-blue-500 text-white" : "bg-white"
                }
              >
                Setrika
              </Tag>
            </div>
            <Input
              value={dataTrans.alamat}
              onChange={handleAlamatChange}
              placeholder="Address e.g Jalan No.5 Imam Ghazali"
              css="block col-span-2"
            />
            <Input
              value={dataTrans.nama}
              onChange={handleNamaChange}
              placeholder="Name e.g John Doe"
            />
            <Input
              value={dataTrans.email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            <Input
              value={dataTrans.hp}
              onChange={handleHpChange}
              placeholder="Phone Number"
            />
            <button
              onClick={postTransaction}
              className="p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4"
            >
              Order Now
            </button>
          </div>
          <p className="text-xs sm:text-sm">
            *We'll come to your home for estimated time of 15 minutes
          </p>
        </div>
      </Layout>
    </GlobalLayout>
  );
}
