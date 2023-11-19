function ShopNowBtn() {
  return (
    <div className="cursor-pointer w-full relative mx-auto hover:-translate-y-1 transition-all duration-300 ">
      <div className="inline-flex  mx-auto  space-x-1.5 rtl:space-x-reverse items-center relative z-20">
        <span className="text-base text-center min-w-max cursor-pointer font-bold  text-white leading-[30px]">
          Shop Now
        </span>
        <span className="leading-[30px]">
          <svg
            className={`transform rtl:rotate-180`}
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2.08984"
              y="0.636719"
              width="6.94219"
              height="1.54271"
              transform="rotate(45 2.08984 0.636719)"
              fill="#fff"
            />
            <rect
              x="7"
              y="5.54492"
              width="6.94219"
              height="1.54271"
              transform="rotate(135 7 5.54492)"
              fill="#fff"
            />
          </svg>
        </span>
      </div>
      <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[2px] bg-gradient-button dark:gradient-button-purple absolute left-0 rtl:right-0 bottom-0 z-10"></div>
    </div>
  );
}

export default ShopNowBtn;
