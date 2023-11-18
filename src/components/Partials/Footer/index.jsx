import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { communities, navFooter } from "../../../constants/index";
const Footer = (props) => {
  const { theme } = useTheme();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <footer className="relative z-10 bg-gradient-main dark:bg-none dark:bg-[#F5F8F8] shadow-md text-primary-3 pt-3 lg:pt-6">
      <div className="flex items-start lg:flex-row flex-col gap-5 sm:gap-10 lg:gap-14 xl:gap-20 justify-between py-5 md:py-7 lg:py-10 container">
        <div className="flex flex-col gap-3 items-start justify-start max-w-md">
            <Image
            src={`/assets/images/logo.svg`}
            className="cursor-pointer"
            alt="apple-store"
            width={200}
            height={70}
          />
          <p className="text-white dark:text-primary-3 text-sm">
            Address 5171 W Campbell Ave Kent, Utah 53127 United States
          </p>
          <p className="text-white dark:text-primary-3 text-sm">
            Call Us (+91)-540-025-124553
          </p>
          <p className="text-white dark:text-primary-3 text-sm">
            Email sale@Nest.com
          </p>
          <p className="text-white dark:text-primary-3 text-sm">
            Hours 10:00 - 18:00, Mon - Sat
          </p>
         <div className="flex gap-3">
         <Image
            src={`/assets/images/gg-play.png`}
            className="cursor-pointer"
            alt="gg-play`"
            width={122}
            height={41}
            onClick={() => openInNewTab("https://www.apple.com/vn/app-store/")}
          />
          <Image
            src={`/assets/images/apple-store.png`}
            className="cursor-pointer"
            alt="apple-store`"
            width={122}
            height={41}
            onClick={() => openInNewTab("https://play.google.com/")}
          />
         </div>
        </div>
        <div className="md:flex flex-1 items-start justify-between grid grid-cols-2 sm:grid-cols-3 gap-y-4 w-full lg:w-auto xl:max-w-3xl">
          {navFooter?.map((category) => (
            <div className="col-span-1" key={category?.title}>
              <div className="py-1 text-lg text-white dark:text-primary-3 font-extrabold lg:h-8">
                {category?.title}
              </div>
              {category?.child?.map((child, index) => (
                <Link key={index} href={child?.link} >
                <span className="mt-3 text-sm font-normal duration-300 block text-white dark:text-primary-3 hover:text-primary-4 dark:hover:text-primary-4">  {child?.name}</span> 
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container flex justify-between items-center py-5 sm:py-8 md:flex-row flex-col gap-3 sm:gap-5">
        <div className="text-center text-white dark:text-primary-3 text-base">
          CopyRight © 2023 All rights reserved.
        </div>
        <div className="flex gap-x-3">
          {communities?.map((child, index) => (
            <a className="cursor-pointer" key={index} target="_blank">
              {child?.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
