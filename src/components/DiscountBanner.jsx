import SubscribeInputWidget from "./Helpers/SubscribeInputWidget";
export default function DiscountBanner() {
  return (
    <div
      className={`w-full h-[307px] bg-cover flex justify-center items-end print:hidden`}
      style={{
        backgroundImage: `url("/assets/images/subscribe.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className="mb-[70px]">
        <div data-aos="fade-up">
          <h1 className="sm:text-3xl text-xl font-700 text-qblack mb-2 text-center">
          Start Your Daily Shopping with NOW MARKET
          </h1>
          <p className="text-center sm:text-[18px] text-sm font-400">
          Stay home & get your dailyneeds from our shop
          </p>
        </div>
        <SubscribeInputWidget />
      </div>
    </div>
  );
}
