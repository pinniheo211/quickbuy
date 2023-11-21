/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import auth from "../utils/auth";
const isAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [checkAuth, setAuth] = useState(false);
    useEffect(() => {
      const user = auth().access_token;

      if (!user && router.pathname !== "/login") {
        router.replace("/login");
      } else if (user && router.pathname === "/login") {
        router.replace("/");
      } else {
        setAuth(true);
      }
    }, [router]);

    if (checkAuth) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default isAuth;
