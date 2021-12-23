import { useContext } from "react";
import { UserContext } from "./UserContext";
import Home from "@pages/index";

const withAuth = (Component, role) => {
  const Auth = (props) => {
    const user = useContext(UserContext);
    if (user.isSigned && role === "admin") {
      return <Component {...props} />;
    } else if (!user.isSigned && role === "portal") {
      return <Component {...props} />;
    } else {
      return <Home />;
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
