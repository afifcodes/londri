// import 'tailwindcss/tailwind.css'
import "@styles/global.css";
import { GlobalProvider } from "@utils/GlobalContext";
import { UserProvider } from "@utils/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </GlobalProvider>
  );
}

export default MyApp;
