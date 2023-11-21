import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../Partials/Layout";
import SignUp from "./Signup";
import VerifyWidget from "./VerifyWidget";
export default function Signup() {
  const [verify, setVerify] = useState(false);
  const [signupView, setSignupView] = useState(false);

  const location = useRouter();
  useEffect(() => {
    if (location.route === "/verify-you") {
      setVerify(true);
    } else {
      setSignupView(true);
    }
  }, [location]);

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container mx-auto">
          <div className="lg:flex items-center relative w-full lg:min-h-[700px]">
            {verify ? (
              <div className="lg:w-[572px] rounded-lg w-full lg:h-[700px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                <VerifyWidget />
              </div>
            ) : signupView ? (
              <div className="lg:w-[572px] w-full rounded-lg lg:h-auto bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
                <SignUp />
              </div>
            ) : (
              ""
            )}
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute ltr:xl:-right-20 ltr:-right-[138px] rtl:xl:-left-20 rtl:-left-[138px]"
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
