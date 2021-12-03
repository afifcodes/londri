import { useRouter } from "next/router";
import Link from "next/link";
export default function Navbar() {
  const router = useRouter();
  return (
    <div className="fixed w-screen">
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
          <Link href="/">
            <a
              className={`${
                router.pathname === "/" ? "text-blue-500" : ""
              } font-semibold outline-none focus:outline-none active:outline-none`}
            >
              Order
            </a>
          </Link>
          <Link href="/login">
            <a
              className={`${
                router.pathname.includes("login") ? "text-blue-500" : ""
              } font-semibold outline-none focus:outline-none active:outline-none`}
            >
              Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
