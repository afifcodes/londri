import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-cool font-semibold text-base sm:text-xl">
      <Head>
        <title>LONDRY | One tap order</title>
      </Head>
      <div className="fixed w-screen px-8 sm:px-32 py-4 sm:py-6 flex justify-between">
        <Link href="/">
          <a>Home</a>
        </Link>
        <a>Login</a>
      </div>
      <div className="px-8 sm:px-32 py-4 min-h-screen min-w-screen flex flex-wrap justify-between items-center content-center bg-gradient-to-br from-white to-blue-300">
        <div>
          <div className="flex justify-start items-end">
            <p className="font-black text-8xl sm:text-9xl">
              LON
              <br />
              DRY
            </p>
            <img
              src="/images/char.png"
              alt="char"
              className="max-h-48 sm:max-h-72"
            />
          </div>
          <p className="text-xl sm:text-3xl font-bold">
            Laundry just in couple of click
          </p>
        </div>
        <div className="mt-16 xl:mt-0">
          <p>Let's proceed your order 🎉</p>
          <div className="max-w-2xl grid gap-2 sm:gap-4 grid-cols-2 my-4 xl:my-8">
            <input
              type="text"
              placeholder="Address e.g Jalan No.5 Imam Ghazali"
              className="col-span-2 w-full border-2 sm:border-4 outline-none focus:outline-none focus:border-blue-300 active:outline-none p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl text-xs sm:text-base md:text-xl"
            />
            <input
              type="text"
              placeholder="On behalf of..."
              className="w-full border-2 sm:border-4 outline-none focus:outline-none focus:border-blue-300 active:outline-none p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl text-xs sm:text-base md:text-xl"
            />
            <input
              type="text"
              placeholder="Amount in Kg"
              className="w-full border-2 sm:border-4 outline-none focus:outline-none focus:border-blue-300 active:outline-none p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl text-xs sm:text-base md:text-xl"
            />
            <div></div>
            <button className="p-2 sm:p-6 font-semibold rounded-lg sm:rounded-2xl bg-blue-500 text-white focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 sm:focus:ring-4">
              Order Now
            </button>
          </div>
          <p className="text-xs sm:text-sm">
            *We'll come to your home for estimated time of 15 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
