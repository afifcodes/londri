import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@utils/UserContext";
import GlobalLayout from "@components/GlobalLayout";
import Navbar from "@components/Navbar";
import Input from "@components/atomics/Input";
import withAuth from "@utils/withAuth";

const Transactions = () => {
  const user = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getTransactions = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.API_HOME}/transactions`,
        config
      );
      setTransactions(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (user.done && !user.isSigned) {
      router.push("/");
    } else if (user.done && user.token) {
      getTransactions();
    }
  }, [user]);

  const renderSwitch = (kind) => {
    switch (kind) {
      case "0":
        return "Cuci Setrika";
      case "1":
        return "Cuci Kering";
      default:
        return "Setrika";
    }
  };

  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <div className="max-w-[100rem] m-auto px-8 sm:px-32 py-24 min-h-screen min-w-screen grid gap-8 grid-cols-1 xl:grid-cols-2 content-center place-content-center items-center">
        {transactions.length > 0
          ? transactions.map((t) => {
              return (
                <div
                  className="w-full mt-16 xl:mt-0 bg-white rounded-2xl py-4 xl:py-8 px-4 xl:px-8"
                  key={t.uuid}
                >
                  <p>Transaction ID: {t.uuid}</p>
                  <div className="grid gap-2 sm:gap-4 grid-cols-2">
                    <Input disabled value={renderSwitch(t.kind)} />
                    <Input disabled value={t.name} placeholder="Name" />
                    <Input disabled value={t.date} placeholder="Date" />
                    <Input disabled value={t.address} placeholder="Address" />
                    <Input
                      disabled
                      value={t.status === "0" ? "In Progress" : "Done"}
                      placeholder="Status"
                    />
                    <Link href={`/transactions/${t.uuid}`}>
                      <button className="p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4">
                        Click To View
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </GlobalLayout>
  );
};
export default withAuth(Transactions, "admin");
