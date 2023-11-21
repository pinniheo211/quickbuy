import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {
  const rs = products.map((item) => {
    return {
      id: item.product_id,
      title: item.product_name,
      slug: item.product_id,
      image: item.product_image,
      price: item.product_price,
      offer_price: item.product_price_sale,
      campaingn_product: null,
      review: parseInt(item.product_rating),
      variants: [],
    };
  });
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="mt-10 hidden md:grid gap-4 lg:gap-6 2xl:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:!grid-cols-5">
            <DataIteration datas={rs} startLength={0} endLength={rs.length}>
              {({ datas }) => (
                <div data-aos="fade-up" key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
          <Swiper
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 7,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            loop={false}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            breakpoints={{
              300: {
                slidesPerView: 2,
              },
              550: {
                slidesPerView: 3,
              },
            }}
            initialSlide={2}
            spaceBetween={20}
            slidesPerView={3}
          >
            {/* <DataIteration datas={rs} startLength={0} endLength={rs.length}>
              {({ datas }) => (
                <SwiperSlide key={datas.id} data-aos="fade-up">
                  <div className="item w-[350px] ">
                    <ProductCardStyleOne datas={datas} />
                  </div>
                </SwiperSlide>
              )}
            </DataIteration> */}
            {rs?.map((datas) => (
              <SwiperSlide key={datas.id}>
                <div data-aos="fade-up" className="item w-[250px] ">
                  <ProductCardStyleOne datas={datas} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
