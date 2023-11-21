import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SCHEMA_LOGIN } from "utils/schema";
import apiRequest from "../../../../utils/apiRequest";
import { fetchWishlist } from "../../../store/wishlistData";
import LoginContext from "../../Contexts/LoginContext";
import InputCom from "../../Helpers/InputCom";

const SEND = ({ action }) => {
  return (
    <div>
      <p className="text-sm text-primary-4">
        🦄 Please verify your acount. If you didnt get OTP, please resend your
        OTP and verify
      </p>
      <div className="flex items-center justify-between">
        {" "}
        <button
          type="button"
          onClick={action}
          className="text-sm text-blue-500 font-bold mt-2 underline"
        >
          Send OTP
        </button>
        <button
          type="button"
          onClick={action}
          className="text-sm text-blue-500 font-bold mt-2 underline"
        >
          Verify Account
        </button>
      </div>
    </div>
  );
};
function LoginWidget({ redirect = true, loginActionPopup, notVerifyHandler }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loginPopupBoard = useContext(LoginContext);
  const rememberMe = () => {
    setValue(!checked);
  };
  const sendOtpHandler = () => {
    apiRequest
      .resend({
        email: email,
      })
      .then(() => {
        router.push(`/verify-you?email=${email}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const doLogin = async () => {
    setLoading(true);
    await apiRequest
      .login({
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Login Successfull");
        setEmail("");
        setPassword("");

        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch(fetchWishlist());
        if (redirect) {
          router.push("/");
        } else {
          if (res.data) {
            loginPopupBoard.handlerPopup(false);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (
            err.response.data.notification ===
            "Please verify your acount. If you didn't get OTP, please resend your OTP and verify"
          ) {
            toast.warn(<SEND action={sendOtpHandler} />, {
              autoClose: false,
              icon: false,
              theme: "colored",
            });
            notVerifyHandler();
          } else {
            toast.error(`Invalid Credentials`);
          }
        } else {
          return false;
        }
        console.log(err);
      });
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(SCHEMA_LOGIN),
  });

  const onSubmit = (data) => {
    toast.warn(<SEND action={sendOtpHandler} />, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="w-full ">
      <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
        <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
          Login
        </h1>
        <div className="shape -mt-6">
          <svg
            width="172"
            height="29"
            viewBox="0 0 172 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
              stroke="#B901BB"
            />
          </svg>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-area">
        <div className="input-item mb-5">
          <div className="h-full">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder={`Email`}
                  label={`Email Address` + "*"}
                  type="text"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.email)}
                />
              )}
            />
            {errors && errors?.email?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.email?.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="input-item mb-5">
          <div className="h-full">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder="* * * * * *"
                  label={`Password` + "*"}
                  type="text"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.password)}
                />
              )}
            />
            {errors && errors?.password?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.password?.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="signin-area mb-3.5">
          <div className="flex justify-center flex-col gap-2 mb-6">
            <button
              // onClick={doLogin}
              type="submit"
              className="bg-gradient-button-purple hover:-translate-y-1 duration-300 transition-all rounded-lg text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
            >
              <span>Login </span>
              {/* {true && (
                <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                  <LoaderStyleOne />
                </span>
              )} */}
            </button>
            <Link href="/forgot-password">
              <span className="ml-2 text-primary-4 text-sm hover:underline cursor-pointer">
                Forgot password ?
              </span>
            </Link>
          </div>
        </div>
        <div className="signup-area flex justify-center">
          <p className="text-base text-qgraytwo font-normal">
            Dont have an account ?
            {redirect ? (
              <Link href="/signup">
                <span className="ml-2 text-primary-4 hover:underline cursor-pointer capitalize">
                  sign up
                </span>
              </Link>
            ) : (
              <button onClick={loginActionPopup} type="button">
                <span className="ml-2 text-primary-4 hover:underline cursor-pointer capitalize">
                  sign up
                </span>
              </button>
            )}
          </p>
        </div>
      </form>
      <div>
        <p className="text-lg text-center text-qgraytwo pb-5 sm:pb-7">
          Please verify your acount. If you didnt get OTP, please resend your
          OTP and verify
        </p>
        <div className="flex items-center justify-between gap-3">
          {" "}
          <button
            // onClick={doLogin}
            type="submit"
            className="bg-gradient-button-purple hover:-translate-y-1 duration-300 transition-all rounded-lg mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
          >
            <span>Send OTP </span>
            {/* {true && (
                <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                  <LoaderStyleOne />
                </span>
              )} */}
          </button>
          <button
            // onClick={doLogin}
            type="submit"
            className="bg-gradient-button-purple hover:-translate-y-1 duration-300 transition-all rounded-lg mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
          >
            <span>Verify Account </span>
            {/* {true && (
                <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                  <LoaderStyleOne />
                </span>
              )} */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginWidget;
