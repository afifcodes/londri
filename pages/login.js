import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "@utils/UserContext";
import GlobalLayout from "@components/GlobalLayout";
import Layout from "@components/Layout";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Input from "@components/atomics/Input";
import withAuth from "@utils/withAuth";

const Login = () => {
  const user = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleEmail = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePassword = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.API_HOME}/login`,
        userData
      );
      if (data.status === "Success") {
        setIsError(false);
        user.setToken(data.data.token);
        user.setIsSigned(true);
        localStorage.setItem("londry", data.data.token);
      } else {
        setIsError(true);
      }
      setShow(true);
    } catch (error) {
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

  return (
    <GlobalLayout>
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <Navbar />
      <Layout>
        <Footer isError={isError} show={show} />
        <div className="w-full mt-16 xl:mt-0">
          <div className="grid gap-2 sm:gap-4 grid-cols-2 my-4 xl:my-8">
            <Input
              type="text"
              value={userData.email}
              onChange={handleEmail}
              placeholder="Email"
              css="w-full col-span-2"
            />
            <Input
              type="password"
              value={userData.password}
              onChange={handlePassword}
              placeholder="Password"
              css="w-full col-span-2"
            />
            <div></div>
            <button
              onClick={handleLogin}
              className="outline-none p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4"
            >
              Login
            </button>
          </div>
        </div>
      </Layout>
    </GlobalLayout>
  );
};

export default withAuth(Login, "portal");
