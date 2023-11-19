/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import ShopNowBtn from "../Helpers/Buttons/ShopNowBtn";
import ArrowLeftIcon from "../Helpers/icons/ArrowLeft";
import ArrowRightIcon from "../Helpers/icons/ArrowRight";
import { BANNER_DUMMY } from "./helper";

const Banner = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const handleResize = () => setWindowWidth(window.innerWidth);
  useEffect(() => {
    const init = async () => {
      const { Carousel, initTE } = await import("tw-elements");
      initTE({ Carousel }, { allowReinits: true });
    };
    init();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className="relative"
      id="carouselDarkVariant"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <div
        className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-2 md:mb-3 2xl:mb-5 flex list-none justify-center p-0"
        data-te-carousel-indicators
      >
        <button
          className="mx-[3px] rounded-xl box-content h-2.5 w-10 xl:h-3 xl:w-12 flex-initial cursor-pointer border-transparent bg-gradient-button hover:opacity-100  dark:bg-gradient-button-purple p-0 -indent-[999px] opacity-50 transition-opacity duration-[500ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          data-te-target="#carouselDarkVariant"
          data-te-slide-to="0"
          data-te-carousel-active
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          className="mx-[3px] rounded-xl box-content h-2.5 w-10 xl:h-3 xl:w-12 flex-initial cursor-pointer border-transparent bg-gradient-button hover:opacity-100  dark:bg-gradient-button-purple p-0 -indent-[999px] opacity-50 transition-opacity duration-[500ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          data-te-target="#carouselDarkVariant"
          data-te-slide-to="1"
          data-te-carousel-active
          aria-label="Slide 2"
        ></button>
        <button
          className="mx-[3px] rounded-xl box-content h-2.5 w-10 xl:h-3 xl:w-12 flex-initial cursor-pointer border-transparent bg-gradient-button hover:opacity-100  dark:bg-gradient-button-purple p-0 -indent-[999px] opacity-50 transition-opacity duration-[500ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
          data-te-target="#carouselDarkVariant"
          data-te-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {BANNER_DUMMY.map((banner, index) => (
          <div
            key={index}
            data-te-carousel-fade
            data-te-carousel-item
            data-te-carousel-active={index === 0 ? true : undefined}
            className={
              index === 0
                ? "relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[500ms] ease-in-out motion-reduce:transition-none"
                : "hidden relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[500ms] ease-in-out motion-reduce:transition-none"
            }
          >
            <div className="absolute w-full h-full flex items-end sm:items-center justify-start pb-9 sm:pb-0">
              <div className="container">
                <div className="flex flex-col gap-1 md:gap-2 lg:gap-3 2xl:gap-5 items-center sm:items-start justify-center sm:justify-start w-full sm:w-1/2 md:w-[45%]">
                  <p className="text-3xl md:text-[44px] lg:text-5xl xl:text-6xl 2xl:text-7xl !leading-tight 2xl:leading-none font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-7 via-primary-8 to-primary-4">
                    {banner?.title}
                  </p>
                  <p className="text-center sm:text-left text-sm md:text-base lg:text-lg pb-1 xl:pb-3 2xl:pb-0 xl:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-7 via-primary-8 to-primary-4 font-medium">
                    {banner?.des}
                  </p>

                  <Link
                    href={{
                      pathname: "/single-product",
                      query: { slug: 123 },
                    }}
                    passHref
                  >
                    <a rel="noopener noreferrer">
                      <ShopNowBtn />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <img
              src={windowWidth > 451 ? banner?.img : banner.imgMobile}
              alt={`Banner ${index}`}
            />
          </div>
        ))}
      </div>

      <button
        className="absolute bottom-0 border-transparent left-5 top-0 z-[1] w-[10%] flex items-center justify-center border-0 bg-none p-0 text-center text-black transition-all duration-300"
        type="button"
        data-te-target="#carouselDarkVariant"
        data-te-slide="prev"
      >
        <span className="h-8 w-8 lg:w-10 lg:h-10 text-white bg-gradient-button  hover:bg-gradient-button-purple dark:bg-gradient-button-purple p-2 rounded-full">
          <ArrowLeftIcon />
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Previous
        </span>
      </button>
      <button
        className="absolute bottom-0 border-transparent right-5 top-0 z-[1] w-[10%] flex items-center justify-center border-0 bg-none p-0 text-center text-black transition-all duration-300"
        type="button"
        data-te-target="#carouselDarkVariant"
        data-te-slide="next"
      >
        <span className="h-8 w-8 lg:w-10 lg:h-10 text-white bg-gradient-button  hover:bg-gradient-button-purple dark:bg-gradient-button-purple p-2 rounded-full">
          <ArrowRightIcon />
        </span>
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Next
        </span>
      </button>
    </div>
  );
};

export default Banner;
