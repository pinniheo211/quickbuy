import { useEffect, useState } from "react";
import settings from "../../../utils/settings";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import Layout from "../Partials/Layout";
import Banner from "./Banner";

// import ProductsAds from "./ProductsAds";

export default function Home({ homepageData }) {
  const getsectionTitles = homepageData?.section_title;
  const [sectionTitles, setSectionTitles] = useState(null);
  useEffect(() => {
    if (!sectionTitles) {
      let tem =
        getsectionTitles &&
        getsectionTitles.map((item, i) => {
          return {
            [item.key]: item.custom ? item.custom : item.default,
          };
        });
      // setSectionTitles(Object.assign.apply(Object, tem));
    }
  }, [sectionTitles]);

  const [homepage] = useState(homepageData);
  const { enable_multivendor } = settings();
  const [isMultivendor, setIsMultivendor] = useState(false);
  useEffect(() => {
    if (!isMultivendor) {
      setIsMultivendor(enable_multivendor && parseInt(enable_multivendor));
    }
  }, [isMultivendor]);
  const { data } = homepageData;
  console.log(data, "homepageData1");

  return (
    <>
      <Layout>
        <Banner />
        {data && (
          <SectionStyleThree
            products={
              data?.data_out_standing?.length > 0
                ? data?.data_out_standing?.slice(
                    0,
                    data?.data_out_standing?.length > 16
                      ? 16
                      : data?.data_out_standing?.length
                  )
                : []
            }
            sectionTitle={"Feature Categories"}
            seeMoreUrl={`/products?highlight=new_arrival`}
            className="new-products md:my-[60px] my-[30px]"
          />
        )}

        {data && (
          <SectionStyleThree
            products={
              data?.data_best_sell?.length > 0
                ? data?.data_best_sell?.slice(
                    0,
                    data?.data_best_sell?.length > 16
                      ? 16
                      : data?.data_best_sell?.length
                  )
                : []
            }
            sectionTitle={"Daily Best Sell"}
            seeMoreUrl={`/products?highlight=new_arrival`}
            className="new-products md:mb-[60px] mb-[30px]"
          />
        )}

        {data && (
          <SectionStyleThree
            products={
              data?.data_best_of_day?.length > 0
                ? data?.data_best_of_day?.slice(
                    0,
                    data?.data_best_of_day?.length > 16
                      ? 16
                      : data?.data_best_of_day?.length
                  )
                : []
            }
            sectionTitle={"Daily Best Sell"}
            seeMoreUrl={`/products?highlight=new_arrival`}
            className="new-products md:mb-[60px] mb-[30px]"
          />
        )}
        {homepage && (
          <SectionStyleFour
            products={data?.data_top_sell.length > 0 ? data?.data_top_sell : []}
            sectionTitle={"Top Sell"}
            seeMoreUrl={`/products?highlight=best_product`}
            className="category-products md:mb-[60px] mb-[30px]"
          />
        )}
        {homepage && (
          <SectionStyleFour
            products={
              data?.data_top_rating.length > 0 ? data?.data_top_rating : []
            }
            sectionTitle={"Top Rating"}
            seeMoreUrl={`/products?highlight=best_product`}
            className="category-products md:mb-[60px] mb-[30px]"
          />
        )}
        {/* 
        {homepage && (
          <CategorySection
            categories={homepage.homepage_categories}
            sectionTitle={sectionTitles && sectionTitles.Trending_Category}
          />
        )}
  
        {homepage && (
          <BrandSection
            brands={homepage.brands.length > 0 ? homepage.brands : []}
            sectionTitle={sectionTitles && sectionTitles.Shop_by_Brand}
            className="brand-section-wrapper md:mb-[60px] mb-[30px]"
          />
        )}
 {homepage && (
          <SectionStyleOne
            products={homepage.popularCategoryProducts}
            categories={homepage.popularCategories}
            categoryBackground={
              process.env.NEXT_PUBLIC_BASE_URL +
              homepage.popularCategorySidebarBanner
            }
            categoryTitle={sectionTitles && sectionTitles.Popular_Category}
            sectionTitle={sectionTitles && sectionTitles.Popular_Category}
            seeMoreUrl={`/products?highlight=popular_category`}
            className="category-products md:mb-[60px] mb-[30px]"
          />
        )}
        {homepage && (
          <CampaignCountDown
            className="md:mb-[60px] mb-[30px]"
            flashSaleData={homepage.flashSale}
            downloadData={homepage.flashSaleSidebarBanner}
            lastDate={homepage.flashSale.end_time}
          />
        )}
        {homepage && (
          <ViewMoreTitle
            className="top-selling-product md:mb-[60px] mb-[30px]"
            seeMoreUrl={`/products?highlight=top_product`}
            categoryTitle={sectionTitles && sectionTitles.Top_Rated_Products}
          >
            <SectionStyleTwo
              products={
                homepage.topRatedProducts.length > 0
                  ? homepage.topRatedProducts
                  : []
              }
            />
          </ViewMoreTitle>
        )}

        {homepage && isMultivendor === 1 && (
          <ViewMoreTitle
            className="best-sallers-section md:mb-[60px] mb-[30px]"
            seeMoreUrl="/sellers"
            categoryTitle={sectionTitles && sectionTitles.Best_Seller}
          >
            <BestSellers
              sallers={homepage.sellers.length > 0 ? homepage.sellers : []}
            />
          </ViewMoreTitle>
        )}

        {homepage && (
          <TwoColumnAds
            bannerOne={homepage.twoColumnBannerOne}
            bannerTwo={homepage.twoColumnBannerTwo}
          />
        )}
        {homepage && (
          <SectionStyleOne
            categories={
              homepage.featuredCategories.length > 0
                ? homepage.featuredCategories
                : []
            }
            categoryBackground={
              process.env.NEXT_PUBLIC_BASE_URL +
              homepage.featuredCategorySidebarBanner
            }
            categoryTitle={sectionTitles && sectionTitles.Featured_Products}
            products={
              homepage.featuredCategoryProducts.length > 0
                ? homepage.featuredCategoryProducts
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.Featured_Products}
            seeMoreUrl={`/products?highlight=featured_product`}
            className="category-products md:mb-[60px] mb-[30px]"
          />
        )}
        {homepage && <OneColumnAdsOne data={homepage.singleBannerOne} />}
      

        {homepage && (
          <div className="w-full text-white md:mb-[60px] mb-[30px]">
            <div className="container mx-auto">
              <OneColumnAdsTwo data={homepage.singleBannerTwo} />
            </div>
          </div>
        )}
       */}
      </Layout>
    </>
  );
}
