import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@utils/UserContext";
export default function Navbar() {
  const user = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("londry");
    user.setToken("");
    user.setIsSigned(false);
    router.reload("/");
  };
  return (
    <div className="fixed w-screen backdrop-blur-xl">
      <div className="max-w-[100rem] m-auto px-8 sm:px-32 py-4 sm:py-6 flex justify-between">
        <Link href="/">
          <a className="leading-4 font-extrabold">
            LON
            <br />
            DRY
          </a>
        </Link>
        <div className="flex gap-4 sm:gap-16 items-center">
          <Link href="/search">
            <a
              className={`${
                router.pathname.includes("search") ? "text-blue-500" : ""
              } font-semibold outline-none focus:outline-none active:outline-none`}
            >
              Search
            </a>
          </Link>
          {user.isSigned ? (
            <Link href="/transactions">
              <a
                className={`${
                  router.pathname.includes("transactions")
                    ? "text-blue-500"
                    : ""
                } font-semibold outline-none focus:outline-none active:outline-none`}
              >
                Transactions
              </a>
            </Link>
          ) : (
            <Link href="/">
              <a
                className={`${
                  router.pathname === "/" ? "text-blue-500" : ""
                } font-semibold outline-none focus:outline-none active:outline-none`}
              >
                Order
              </a>
            </Link>
          )}
          {user.isSigned ? (
            <a
              onClick={handleLogout}
              className={`${
                router.pathname.includes("login") ? "text-blue-500" : ""
              } cursor-pointer font-semibold outline-none focus:outline-none active:outline-none`}
            >
              Logout
            </a>
          ) : (
            <Link href="/login">
              <a
                className={`${
                  router.pathname.includes("login") ? "text-blue-500" : ""
                } font-semibold outline-none focus:outline-none active:outline-none`}
              >
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
