import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionRegister } from "src/store/auth";
import { SCHEMA_REGISTER } from "utils/schema";
import InputCom from "../../Helpers/InputCom";
import LoaderStyleOne from "../../Helpers/Loaders/LoaderStyleOne";

function SignUp({ redirect = true, signupActionPopup, changeContent }) {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.auth.register);
  const [checked, setCheck] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      cpassword: "",
      ref: "",
    },
    resolver: yupResolver(SCHEMA_REGISTER),
  });

  const onSubmit = (data) => {
    delete data.ref;
    delete data.firstName;
    delete data.lastName;

    dispatch(actionRegister(data));
  };

  const rememberMe = () => {
    setCheck(!checked);
  };

  console.log({ loading, data });

  return (
    <div className="w-full">
      <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
        <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
          Create Account
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
              stroke="#FFBB38"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-area">
        <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 items-center rtl:space-x-reverse mb-5">
          <div className="h-full w-full">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder={`First Name`}
                  label={`First Name` + "*"}
                  type="text"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.firstName)}
                />
              )}
            />
            {errors && errors?.firstName?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.firstName?.message}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="h-full w-full">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder={`Last Name`}
                  label={`Last Name` + "*"}
                  type="text"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.lastName)}
                />
              )}
            />
            {errors && errors?.lastName?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.lastName?.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="input-item mb-5">
          <div className="h-full">
            <Controller
              name="ref"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder={"Refferal"}
                  label={"Refferal" + "*"}
                  type="text"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.ref)}
                />
              )}
            />
            {errors && errors?.ref?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.ref?.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="input-item mb-5">
          <div className="h-full">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder={"Username"}
                  label={"Username" + "*"}
                  type="text"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.username)}
                />
              )}
            />
            {errors && errors?.username?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.username?.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
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
        <div className="flex sm:flex-row items-center flex-col space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse mb-5">
          <div className="h-full w-full">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder="* * * * * *"
                  label={`Password` + "*"}
                  type="password"
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
          <div className="h-full w-full">
            <Controller
              name="cpassword"
              control={control}
              render={({ field }) => (
                <InputCom
                  placeholder="* * * * * *"
                  label={`Confirm Password` + "*"}
                  type="password"
                  inputClasses="h-[50px]"
                  field={field}
                  error={Boolean(errors?.confirmPassword)}
                />
              )}
            />
            {errors && errors?.confirmPassword?.message ? (
              <span className="text-xs mt-1 text-qred">
                {errors?.confirmPassword?.message}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="forgot-password-area mb-7">
          <div className="remember-checkbox flex items-center space-x-2.5 rtl:space-x-reverse">
            <button
              onClick={rememberMe}
              type="button"
              className="w-5 h-5 rounded-[5px] text-qblack flex justify-center items-center border border-light-gray"
            >
              {checked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <Link href="/">
              <span className="text-sm text-black cursor-pointer">
                You agree with{" "}
                <span className="text-primary-4 hover:underline">
                  Terms and Service{" "}
                </span>{" "}
                and{" "}
                <span className="text-primary-4 hover:underline">
                  Privacy Policy
                </span>{" "}
                by Now Market.
              </span>
            </Link>
          </div>
        </div>
        <div className="signin-area mb-3">
          <div className="flex justify-center">
            <button
              disabled={!checked || loading}
              type="submit"
              className="bg-gradient-button-purple hover:-translate-y-1 duration-300 transition-all rounded-lg text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
            >
              <span className="text-sm text-white block">Create Account</span>
              {loading && (
                <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                  <LoaderStyleOne />
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="signup-area flex justify-center">
          <p className="text-base text-qgraytwo font-normal">
            Already have an Account?
            {redirect ? (
              <Link href="/login">
                <span className="ml-2 text-qblack cursor-pointer">Log In</span>
              </Link>
            ) : (
              <button onClick={signupActionPopup} type="button">
                <span className="ml-2 text-qblack cursor-pointer">Log In</span>
              </button>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
