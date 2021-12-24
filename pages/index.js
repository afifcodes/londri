import Head from "next/head";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@utils/UserContext";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import Input from "@components/atomics/Input";
import Tag from "@components/atomics/Tag";
import Footer from "@components/Footer";

export default function Home() {
  const user = useContext(UserContext);
  const [dataTrans, setDataTrans] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    kind: "",
  });
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [uuid, setUuid] = useState("");
  const handleKindChange = (e) => {
    setDataTrans({ ...dataTrans, kind: e.target.value });
  };
  const handleNameChange = (e) => {
    setDataTrans({ ...dataTrans, name: e.target.value });
  };
  const handleAddressChange = (e) => {
    setDataTrans({ ...dataTrans, address: e.target.value });
  };
  const handleEmailChange = (e) => {
    setDataTrans({ ...dataTrans, email: e.target.value });
  };
  const handlePhoneChange = (e) => {
    setDataTrans({ ...dataTrans, phone: e.target.value });
  };

  const postTransaction = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.API_HOME}/transactions`,
        dataTrans
      );
      if (data.status === 200) {
        setIsError(false);
        setUuid(data.uuid);
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
    } else if (user.isSigned) {
      router.push("/transactions");
    }
  }, [user]);

  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <Layout>
        <Footer isError={isError} show={show} />
        <div className="w-full mt-16 xl:mt-0">
          <p>{uuid ? `Your id: ${uuid}` : "Let's proceed your order 🎉"}</p>
          <div className="grid gap-2 sm:gap-4 grid-cols-2 my-4 xl:my-8">
            <div className="col-span-2 grid grid-cols-3 gap-2">
              <Tag
                value="0"
                onClick={handleKindChange}
                css={
                  dataTrans.kind === "0" ? "bg-blue-500 text-white" : "bg-white"
                }
              >
                Cuci Kering
              </Tag>
              <Tag
                value="1"
                onClick={handleKindChange}
                css={
                  dataTrans.kind === "1" ? "bg-blue-500 text-white" : "bg-white"
                }
              >
                Cuci Setrika
              </Tag>
              <Tag
                value="2"
                onClick={handleKindChange}
                css={
                  dataTrans.kind === "2" ? "bg-blue-500 text-white" : "bg-white"
                }
              >
                Setrika
              </Tag>
            </div>
            <Input
              value={dataTrans.address}
              onChange={handleAddressChange}
              placeholder="Address e.g Jalan No.5 Imam Ghazali"
              css="block col-span-2"
            />
            <Input
              value={dataTrans.name}
              onChange={handleNameChange}
              placeholder="Name e.g John Doe"
            />
            <Input
              value={dataTrans.email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            <Input
              value={dataTrans.phone}
              onChange={handlePhoneChange}
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
