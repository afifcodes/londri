import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@utils/UserContext";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import Input from "@components/atomics/Input";
import Tag from "@components/atomics/Tag";
import Footer from "@components/Footer";

export default function Transaction() {
  const user = useContext(UserContext);
  const router = useRouter();
  const { uuid } = router.query;
  const [dataTrans, setDataTrans] = useState({
    uuid: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    cost: "",
    total_cost: "",
    weight: "",
    shipping_cost: "",
    date: "",
    kind: "",
  });
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleWeight = (e) => {
    setDataTrans({ ...dataTrans, weight: e.target.value });
  };

  const handleShipping = (e) => {
    setDataTrans({ ...dataTrans, shipping_cost: e.target.value });
  };
  const handleCost = (e) => {
    setDataTrans({ ...dataTrans, cost: e.target.value });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getTransaction = async () => {
    try {
      await axios.get(process.env.API_SANCTUM);
      const { data } = await axios.get(
        `${process.env.API_HOME}/transactions/${uuid}`
      );
      setDataTrans(data);
    } catch (error) {}
  };

  const updateTransaction = async () => {
    try {
      setUpdated(false);
      const { data } = await axios.put(
        `${process.env.API_HOME}/transactions/${uuid}`,
        {
          weight: dataTrans.weight,
          cost: dataTrans.cost,
          shipping_cost: dataTrans.shipping_cost,
        },
        config
      );
      if (data.status === 200) {
        setIsError(false);
        setUpdated(true);
      } else {
        setIsError(true);
      }
      setShow(true);
    } catch (error) {
      setIsError(true);
      setShow(true);
    }
  };

  const updateStatus = async () => {
    try {
      setUpdated(false);
      const { data } = await axios.put(
        `${process.env.API_HOME}/transactions/${uuid}/confirm`,
        {},
        config
      );
      setUpdated(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (uuid) {
      getTransaction();
    } else if (updated) {
      getTransaction();
    }
  }, [uuid, updated]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <Layout>
        <Footer isError={isError} show={show} />
        {dataTrans.name ? (
          <div className="w-full mt-16 xl:mt-0">
            <p>Status: {dataTrans.status === "0" ? "In Process" : "Done"}</p>
            <div className="grid gap-2 sm:gap-4 grid-cols-2 my-4 xl:my-8">
              <div className="col-span-2 grid grid-cols-3 gap-2">
                <Tag
                  value="0"
                  css={
                    dataTrans.kind === "0"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }
                  disabled={dataTrans.kind !== "0"}
                >
                  Cuci Kering
                </Tag>
                <Tag
                  value="1"
                  css={
                    dataTrans.kind === "1"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }
                  disabled={dataTrans.kind !== "1"}
                >
                  Cuci Setrika
                </Tag>
                <Tag
                  value="2"
                  css={
                    dataTrans.kind === "2"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }
                  disabled={dataTrans.kind !== "2"}
                >
                  Setrika
                </Tag>
              </div>
              <Input
                disabled
                value={dataTrans.address}
                placeholder="Address"
                css="block col-span-2"
              />
              <Input disabled value={dataTrans.name} placeholder="Name" />
              <Input disabled value={dataTrans.email} placeholder="Email" />
              <Input
                disabled
                value={dataTrans.phone}
                placeholder="Phone Number"
              />
              <Input disabled value={dataTrans.date} placeholder="Date" />
              <Input
                disabled={!user.isSigned || dataTrans.status === "1"}
                value={dataTrans.weight ?? ""}
                onChange={handleWeight}
                placeholder="Weight"
              />
              <Input
                disabled={!user.isSigned || dataTrans.status === "1"}
                value={dataTrans.cost ?? ""}
                onChange={handleCost}
                placeholder="Cost"
              />
              <Input
                disabled={!user.isSigned || dataTrans.status === "1"}
                value={dataTrans.shipping_cost ?? ""}
                onChange={handleShipping}
                placeholder="Shipping Cost"
              />
              <Input
                disabled
                value={dataTrans.total_cost ?? ""}
                placeholder="Total Cost"
              />
              {user.isSigned ? (
                <>
                  <button
                    disabled={dataTrans.status === "1"}
                    onClick={updateStatus}
                    className="p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4"
                  >
                    Mark as Done
                  </button>
                  <button
                    disabled={dataTrans.status === "1"}
                    onClick={updateTransaction}
                    className="p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4"
                  >
                    Update
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </Layout>
    </GlobalLayout>
  );
}
