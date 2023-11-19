import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import ServeLangItem from "../Helpers/ServeLangItem";
import Layout from "../Partials/Layout";
import Multivendor from "../Shared/Multivendor";
import ProductView from "./ProductView";
import Reviews from "./Reviews";

export default function SingleProductPage({ details }) {
  const router = useRouter();
  const [tab, setTab] = useState("des");
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [commnets, setComments] = useState(null);
  if (!details) {
    router.replace("/");
  }
  useEffect(() => {
    if (!commnets) {
      const reviews =
        details &&
        details?.data_eva?.length > 0 &&
        details?.data_eva?.map((review) => {
          return {
            id: review.userid,
            author: review.username,
            comments: review.text,
            review: parseInt(review.evaluate),
            replys: null,
            image: null,
          };
        });
      setComments(reviews);
    }
  }, [commnets]);

  // const sellerInfo = details.seller
  //   ? {
  //       seller: {
  //         ...details.seller,
  //         sellerTotalProducts: parseInt(details.sellerTotalProducts),
  //         sellerTotalReview: parseInt(details.sellerTotalReview),
  //       },
  //     }
  //   : null;
  const relatedProducts = details?.data_relate.map((item) => {
    return {
      id: item.product_id,
      title: item.product_name,
      slug: item.product_id,
      image: item.product_image,
      price: item.product_price,
      offer_price: item.product_price_sale,
      campaingn_product: null,
      // review: parseInt(item.averageRating),
      variants: [],
    };
  });

  console.log(details);
  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <>
          <div className="single-product-wrapper w-full ">
            <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
              <div className="breadcrumb-wrapper w-full ">
                <div className="container mx-auto">
                  <BreadcrumbCom
                    paths={[
                      { name: ServeLangItem()?.home, path: "/" },
                      {
                        name: details?.name,
                        path: `/single-product?slug=${details?.product_id}`,
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="w-full bg-white pb-[60px]">
                {details && (
                  <div className="container mx-auto">
                    <ProductView product={details} images={details?.image} />
                  </div>
                )}
              </div>
            </div>

            <div
              className="product-des-wrapper w-full relative pb-[60px]"
              ref={reviewElement}
            >
              <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
                <div className="container mx-auto">
                  <ul className="flex space-x-12 ">
                    <li>
                      <span
                        onClick={() => setTab("des")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          tab === "des"
                            ? "border-qyellow text-qblack "
                            : "border-transparent text-qgray"
                        }`}
                      >
                        {ServeLangItem()?.Description}
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => setTab("review")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                          tab === "review"
                            ? "border-qyellow text-qblack "
                            : "border-transparent text-qgray"
                        }`}
                      >
                        {ServeLangItem()?.Reviews}
                      </span>
                    </li>
                    {Multivendor() === 1 && details?.is_seller_product && (
                      <li>
                        <span
                          onClick={() => setTab("info")}
                          className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${
                            tab === "info"
                              ? "border-qyellow text-qblack "
                              : "border-transparent text-qgray"
                          }`}
                        >
                          {ServeLangItem()?.Seller_Info}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
              </div>
              <div className="tab-contents w-full ">
                <div className="container mx-auto">
                  {tab === "des" && (
                    <>
                      <h6 className="text-[20px] font-bold text-qblack mb-5">
                        {ServeLangItem()?.Introduction}
                      </h6>
                      <div
                        className="product-detail-des mb-10"
                        dangerouslySetInnerHTML={{
                          __html: details?.description,
                        }}
                      ></div>

                      {/* {details.specifications &&
                        details.specifications.length > 0 && (
                          <div className="product-specifications">
                            <h6 className="text-[20px] font-bold mb-4">
                              {ServeLangItem()?.Features} :
                            </h6>
                            <ul className="">
                              {details.specifications.map((item, i) => (
                                <li
                                  key={i}
                                  className=" leading-9 flex space-x-3 items-center"
                                >
                                  <span className="text-qblack font-medium capitalize">
                                    {" "}
                                    {item.key.key}:
                                  </span>
                                  <span className="font-normal text-qgray">
                                    {item.specification}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )} */}
                      {/*</div>*/}
                    </>
                  )}
                  {tab === "review" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      <h6 className="text-[20px] font-bold text-qblack mb-2">
                        {ServeLangItem()?.Reviews}
                      </h6>
                      {/* review-comments */}
                      <div className="w-full">
                        <Reviews
                          comments={
                            commnets?.length > 0 && commnets.slice(0, 2)
                          }
                        />
                      </div>
                    </div>
                  )}
                  {/* {tab === "info" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      {details.seller && (
                        <SallerInfo
                          sellerInfo={sellerInfo}
                          products={
                            details.this_seller_products.length > 0 &&
                            details.this_seller_products.slice(
                              0,
                              details.this_seller_products.length > 8
                                ? 8
                                : details.this_seller_products.length
                            )
                          }
                        />
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            {relatedProducts?.length > 0 && (
              <div className="related-product w-full bg-white">
                <div className="container mx-auto">
                  <div className="w-full py-[60px]">
                    <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                      {ServeLangItem()?.Related_Product}
                    </h1>
                    <div
                      data-aos="fade-up"
                      className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                    >
                      <DataIteration
                        datas={relatedProducts}
                        startLength={0}
                        endLength={
                          relatedProducts.length > 4
                            ? 4
                            : relatedProducts.length
                        }
                      >
                        {({ datas }) => (
                          <div key={datas.id} className="item">
                            <ProductCardStyleOne datas={datas} />
                          </div>
                        )}
                      </DataIteration>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      </Layout>
    </>
  );
}
