export default function Footer({ show, isError, shrink }) {
  return (
    <div
      className={`fixed transition-all ${
        show ? "bottom-0" : "-bottom-12"
      } w-screen ${shrink ? "sm:w-96" : ""} left-0 ${
        isError ? "bg-red-500" : "bg-blue-500"
      } py-2 text-center text-white`}
    >
      <p>{isError ? "Error/Failed" : "Success"}</p>
    </div>
  );
}
