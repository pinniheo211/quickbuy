import isAuth from "../../../../Middleware/isAuth";
import LoginLayout from "./LoginLayout";
import LoginWidget from "./LoginWidget";
function Login({ isLayout = true }) {
  if (isLayout) {
    return (
      <LoginLayout>
        <LoginWidget />
      </LoginLayout>
    );
  } else {
    return <LoginLayout />;
  }
}

export default isAuth(Login);
