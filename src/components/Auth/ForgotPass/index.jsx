import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/dist/client/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SCHEMA_FORGOT } from "utils/schema";
import apiRequest from "../../../../utils/apiRequest";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";
import ServeLangItem from "../../Helpers/ServeLangItem";
import Layout from "../../Partials/Layout";
export default function ForgotPass() {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPass, setResetpass] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotUser, setForgotUser] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imgThumb, setImgThumb] = useState(null);
  useEffect(() => {
    if (websiteSetup) {
      setImgThumb(websiteSetup.payload.image_content.login_image);
    }
  }, [websiteSetup]);
  const doForgot = async () => {
    setLoading(true);
    await apiRequest
      .forgotPass({
        email: email,
      })
      .then((res) => {
        setResetpass(true);
        setForgotUser(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response) {
          if (err.response.data.notification) {
            toast.error(err.response.data.notification);
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  };
  const doReset = async () => {
    setLoading(true);
    await apiRequest
      .resetPass(
        {
          email: email,
          password: newPass,
          password_confirmation: confirmPassword,
        },
        otp
      )
      .then((res) => {
        setLoading(false);
        router.push("login");
        toast.success(res.data.notification);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response) {
          if (err.response.data.notification) {
            toast.error(err.response.data.notification);
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
  };
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: forgotUser
      ? { email: "" }
      : resetPass
      ? { code: "", password: "", cpassword: "" }
      : {},
    resolver: forgotUser
      ? yupResolver(SCHEMA_FORGOT)
      : resetPass
      ? yupResolver(SCHEMA_RESET_PASS)
      : undefined,
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] rounded-lg w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              {forgotUser ? (
                <div className="w-full">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack capitalize">
                      Forgot password
                    </h1>
                    <div className="shape -mt-6">
                      <svg
                        width="354"
                        height="30"
                        viewBox="0 0 354 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                          stroke="#B901BB"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="input-area"
                  >
                    <div className="input-item mb-5">
                      <div className="h-full">
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <InputCom
                              placeholder={"Email Address"}
                              label={"Email Address" + "*"}
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

                    <div className="signin-area mb-3.5">
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-gradient-button-purple hover:-translate-y-1 duration-300 transition-all rounded-lg disabled:bg-opacity-50 disabled:cursor-not-allowed  mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Send</span>
                          {true && (
                            <span
                              className="w-5 "
                              style={{ transform: "scale(0.3)" }}
                            >
                              <LoaderStyleOne />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : resetPass ? (
                <form onSubmit={handleSubmit(onSubmit)} className="input-area">
                  <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                    <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                      {ServeLangItem()?.Reset_Password}
                    </h1>
                    <div className="shape -mt-6">
                      <svg
                        width="354"
                        height="30"
                        viewBox="0 0 354 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                          stroke="#B901BB"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div onSubmit={handleSubmit(onSubmit)} className="input-area">
                    <div className="input-item mb-5">
                      <div className="h-full">
                        <Controller
                          name="code"
                          control={control}
                          render={({ field }) => (
                            <InputCom
                              placeholder="* * * * * *"
                              label={"OTP" + "*"}
                              type="text"
                              inputClasses="h-[50px]"
                              field={field}
                              error={Boolean(errors?.code)}
                            />
                          )}
                        />
                        {errors && errors?.code?.message ? (
                          <span className="text-xs mt-1 text-qred">
                            {errors?.code?.message}
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
                              label={"New password" + "*"}
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
                    <div className="input-item mb-5">
                      <div className="h-full">
                        <Controller
                          name="cpassword"
                          control={control}
                          render={({ field }) => (
                            <InputCom
                              placeholder="* * * * * *"
                              label={"Confirm new password" + "*"}
                              type="text"
                              inputClasses="h-[50px]"
                              field={field}
                              error={Boolean(errors?.cpassword)}
                            />
                          )}
                        />
                        {errors && errors?.cpassword?.message ? (
                          <span className="text-xs mt-1 text-qred">
                            {errors?.cpassword?.message}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="signin-area mb-3.5">
                      <div className="flex justify-center">
                        <button
                          // onClick={doReset}
                          type="submit"
                          className="bg-gradient-button-purple hover:-translate-y-1 duration-300 transition-all rounded-lg disabled:bg-opacity-50 disabled:cursor-not-allowed  mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Reset</span>
                          {loading && (
                            <span
                              className="w-5 "
                              style={{ transform: "scale(0.3)" }}
                            >
                              <LoaderStyleOne />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                ""
              )}
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
              <div
                className="absolute ltr:xl:-right-20 ltr:-right-[138px] rtl:-left-20"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Image
                  width={608}
                  height={480}
                  src={`/assets/images/bannerAuth.png`}
                  alt="login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
