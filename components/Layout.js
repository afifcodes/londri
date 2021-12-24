export default function Layout({ children }) {
  return (
    <div className="max-w-[100rem] m-auto px-8 sm:px-32 py-24 min-h-screen min-w-screen grid grid-cols-1 xl:grid-cols-2 content-center place-content-center items-center">
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
      {children}
    </div>
  );
}
