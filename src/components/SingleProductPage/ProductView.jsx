import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import apiRequest from "../../../utils/apiRequest";
import auth from "../../../utils/auth";
import settings from "../../../utils/settings";
import { fetchWishlist } from "../../store/wishlistData";
import LoginContext from "../Contexts/LoginContext";
import messageContext from "../Contexts/MessageContext";
import ServeLangItem from "../Helpers/ServeLangItem";
import Star from "../Helpers/icons/Star";
import ThinLove from "../Helpers/icons/ThinLove";
import CheckProductIsExistsInFlashSale from "../Shared/CheckProductIsExistsInFlashSale";

const Redirect = () => {
  return (
    <div className="flex space-x-2 items-center">
      <span className="text-sm text-gray-500">
        {ServeLangItem()?.Item_added}
      </span>
      <Link href="/cart">
        <span className="text-xs border-b border-blue-600 text-blue-600 mr-2 cursor-pointer">
          {ServeLangItem()?.Go_To_Cart}
        </span>
      </Link>
    </div>
  );
};
export default function ProductView({ className, images = [], product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [more, setMore] = useState(false);
  const productsImg = images && images.length > 0 && images;

  const [price, setPrice] = useState(null);
  const [src, setSrc] = useState(product.image[0]);
  const tags = [];
  // const tags = product && JSON.parse(product.tags);
  const loginPopupBoard = useContext(LoginContext);
  const messageHandler = useContext(messageContext);
  const changeImgHandler = (current) => {
    setSrc(current);
  };
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCard = () => {
    // const data = {
    //   id: product.id,
    //   token: auth() && auth().access_token,
    //   quantity: quantity,
    //   variants:
    //     getFirstVarients &&
    //     getFirstVarients.map((v) => parseInt(v.product_variant_id)),
    //   variantItems: getFirstVarients && getFirstVarients.map((v) => v.id),
    // };
    // if (auth()) {
    //   if (varients) {
    //     const variantQuery = data.variants.map((value, index) => {
    //       return `variants[]=${value}`;
    //     });
    //     const variantString = variantQuery.map((value) => value + "&").join("");
    //     const itemsQuery = data.variantItems.map((value, index) => {
    //       return `items[]=${value}`;
    //     });
    //     const itemQueryStr = itemsQuery.map((value) => value + "&").join("");
    //     const uri = `token=${data.token}&product_id=${data.id}&${variantString}${itemQueryStr}quantity=${data.quantity}`;
    //     apiRequest
    //       .addToCard(uri)
    //       .then((res) =>
    //         toast.success(<Redirect />, {
    //           autoClose: 5000,
    //         })
    //       )
    //       .catch((err) => console.log(err));
    //     dispatch(fetchCart());
    //   } else {
    //     const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
    //     apiRequest
    //       .addToCard(uri)
    //       .then((res) => {
    //         toast.success(<Redirect />, {
    //           autoClose: 5000,
    //         });
    //         toast.error(
    //           res.response &&
    //             res.response.data.message &&
    //             res.response.data.message
    //         );
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         toast.error(
    //           err.response &&
    //             err.response.data.message &&
    //             err.response.data.message
    //         );
    //       });
    //     dispatch(fetchCart());
    //   }
    // } else {
    //   localStorage.setItem(
    //     "data-hold",
    //     JSON.stringify({ type: "add-to-cart", ...data })
    //   );
    //   loginPopupBoard.handlerPopup(true);
    // }
  };

  //wishlist

  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlist = wishlistData && wishlistData.wishlists;
  const wishlisted =
    wishlist && wishlist.data.find((id) => id.product.id === product.id);

  const [arWishlist, setArWishlist] = useState(null);
  useEffect(() => {
    if (wishlisted) {
      setArWishlist(true);
    } else {
      setArWishlist(false);
    }
  }, [wishlisted]);

  const addToWishlist = (id) => {
    if (auth()) {
      setArWishlist(true);
      apiRequest.addToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };
  const removeToWishlist = (id) => {
    if (auth()) {
      setArWishlist(false);
      apiRequest.removeToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };

  const { currency_icon } = settings();
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [pricePercent, setPricePercent] = useState("");
  useEffect(() => {
    if (websiteSetup) {
      const offerFlashSale = websiteSetup.payload.flashSale;
      const flashSaleProducts = websiteSetup.payload.flashSaleProducts;
      const isFlashSaleProduct = flashSaleProducts.find(
        (item) => parseInt(item.product_id) === product.id
      );
      if (isFlashSaleProduct) {
        const offer = parseInt(offerFlashSale.offer);
        const price = product.offer_price
          ? parseInt(product.offer_price)
          : parseInt(product.price);
        const discountPrice = (offer / 100) * price;
        const mainPrice = price - discountPrice;
        setPricePercent(
          Math.trunc(((mainPrice - product.price) / product.price) * 100)
        );
      } else {
        setPricePercent(
          Math.trunc(
            ((product.offer_price - product.price) / product.price) * 100
          )
        );
      }
    }
  }, [websiteSetup]);

  return (
    <>
      <div
        className={`product-view w-full lg:flex justify-between ${
          className || ""
        }`}
      >
        <div
          data-aos="fade-right"
          className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]"
        >
          <div className="w-full">
            <div className="w-full md:h-[600px] h-[350px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3 relative">
              <Image
                layout="fill"
                objectFit="scale-down"
                src={`${src}`}
                alt=""
                className="object-contain  transform scale-110"
              />
              {product.price_percent && (
                <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
                  <span className="text-tblack">
                    {" "}
                    {parseFloat(product?.price_percent).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {productsImg &&
                productsImg.length > 0 &&
                productsImg.map((img, i) => (
                  <div
                    onClick={() => changeImgHandler(img)}
                    key={i}
                    className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer relative"
                  >
                    <Image
                      layout="fill"
                      objectFit="scale-down"
                      src={`${img}`}
                      alt=""
                      className={`w-full h-full object-contain ${
                        src !== img ? "opacity-50" : ""
                      } `}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="product-details w-full mt-10 lg:mt-0">
            {product.brand && (
              <span
                data-aos="fade-up"
                className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block"
              >
                {product.brand.name}
              </span>
            )}

            <p
              data-aos="fade-up"
              className="text-xl font-medium text-qblack mb-4"
            >
              {product.name}
            </p>
            <div
              data-aos="fade-up"
              className="flex space-x-[10px] items-center mb-6"
            >
              <div className="flex">
                {Array.from(Array(parseInt(product.rating)), () => (
                  <span key={parseInt(product.rating) + Math.random()}>
                    <Star />
                  </span>
                ))}
                {parseInt(product.rating) < 5 && (
                  <>
                    {Array.from(Array(5 - parseInt(product.rating)), () => (
                      <span
                        key={parseInt(product.rating) + Math.random()}
                        className="text-gray-500"
                      >
                        <Star defaultValue={false} />
                      </span>
                    ))}
                  </>
                )}
              </div>
              <span className="text-[13px] font-normal text-qblack">
                {parseInt(product.rating)} Reviews
              </span>
            </div>
            <div
              data-aos="fade-up"
              className="flex space-x-2 items-baseline mb-7"
            >
              <span
                suppressHydrationWarning
                className={`main-price  font-600  ${
                  product?.price_sale
                    ? "line-through text-qgray text-[15px]"
                    : "text-qred text-[24px]"
                }`}
              >
                {product?.price_sale ? (
                  <span>${product?.price}</span>
                ) : (
                  <CheckProductIsExistsInFlashSale
                    id={product.product_id}
                    price={price}
                  />
                )}
              </span>
              {product?.price_sale && (
                <span
                  suppressHydrationWarning
                  className="offer-price text-qred font-600 text-[24px] ml-2"
                >
                  <CheckProductIsExistsInFlashSale
                    id={product.product_id}
                    price={product?.price_sale}
                  />
                </span>
              )}
            </div>

            <div data-aos="fade-up" className="mb-[30px]">
              <div
                className={`text-qgray text-sm text-normal  leading-7 ${
                  more ? "" : "line-clamp-2"
                }`}
              >
                {product.description}
              </div>
              <button
                onClick={() => setMore(!more)}
                type="button"
                className="text-blue-500 text-xs font-bold"
              >
                {more ? "See Less" : "See More"}
              </button>
            </div>
            <div className="p-3 bg-qyellowlow flex items-center space-x-2 mb-[30px] w-fit">
              <span className="text-base font-bold text-qblack">
                Availability :
              </span>
              <span className="text-base font-bold text-qyellow">
                {product.quantity !== "0"
                  ? `${product.quantity} Products Available`
                  : `Products not Available`}
              </span>
            </div>

            <div
              data-aos="fade-up"
              className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]"
            >
              <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
                <div className="flex justify-between items-center w-full">
                  <button
                    onClick={decrement}
                    type="button"
                    className="text-base text-qgray"
                  >
                    -
                  </button>
                  <span className="text-qblack">{quantity}</span>
                  <button
                    onClick={increment}
                    type="button"
                    className="text-base text-qgray"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
                {!arWishlist ? (
                  <button
                    type="button"
                    onClick={() => addToWishlist(product.id)}
                  >
                    <span className="w-10 h-10 flex justify-center items-center">
                      <ThinLove />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      removeToWishlist(wishlisted && wishlisted.id)
                    }
                  >
                    <span className="w-10 h-10 flex justify-center items-center">
                      <ThinLove fill={true} />
                    </span>
                  </button>
                )}
              </div>
              <div className="flex-1 h-full">
                <button
                  onClick={addToCard}
                  type="button"
                  className="black-btn text-sm font-semibold w-full h-full"
                >
                  {ServeLangItem()?.Add_To_Cart}
                </button>
              </div>
            </div>

            <div data-aos="fade-up" className="mb-[20px]">
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack">Category :</span>{" "}
                {product?.category_name}
              </p>
              {tags && (
                <p className="text-[13px] text-qgray leading-7">
                  <span className="text-qblack">Tags:</span>{" "}
                  {tags.length > 0 &&
                    tags.map((item, i) => (
                      <span key={i}>{item.value + ", "}</span>
                    ))}
                </p>
              )}
              <p className="text-[13px] text-qgray leading-7">
                <span className="text-qblack uppercase">
                  {ServeLangItem()?.SKU}:
                </span>{" "}
                {product?.sku}
              </p>
            </div>

            <div
              data-aos="fade-up"
              className="social-share flex  items-center w-full mb-[20px]"
            >
              <span className="text-qblack text-[13px] mr-[17px] inline-block">
                Share This
              </span>

              <div className="flex space-x-5 items-center">
                <FacebookShareButton
                  url={`${
                    typeof window !== "undefined" &&
                    window.location.origin &&
                    window.location.origin +
                      "/single-product?slug=" +
                      product.product_id
                  }`}
                  quotes={product.name}
                >
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="16"
                      viewBox="0 0 10 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                        fill="#3E75B2"
                      />
                    </svg>
                  </span>
                </FacebookShareButton>
                <TwitterShareButton
                  url={`${
                    typeof window !== "undefined" &&
                    window.location.origin &&
                    window.location.origin +
                      "/single-product?slug=" +
                      product.product_id
                  }`}
                  title={product.name}
                >
                  <span className="cursor-pointer">
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.0722 1.60052C16.432 1.88505 15.7562 2.06289 15.0448 2.16959C15.7562 1.74278 16.3253 1.06701 16.5742 0.248969C15.8985 0.640206 15.1515 0.924742 14.3335 1.10258C13.6933 0.426804 12.7686 0 11.7727 0C9.85206 0 8.28711 1.56495 8.28711 3.48557C8.28711 3.7701 8.32268 4.01907 8.39382 4.26804C5.51289 4.12577 2.9165 2.73866 1.17371 0.604639C0.889175 1.13814 0.71134 1.70722 0.71134 2.34742C0.71134 3.5567 1.31598 4.62371 2.27629 5.26392C1.70722 5.22835 1.17371 5.08608 0.675773 4.83711V4.87268C0.675773 6.5799 1.88505 8.00258 3.48557 8.32268C3.20103 8.39382 2.88093 8.42938 2.56082 8.42938C2.34742 8.42938 2.09845 8.39382 1.88505 8.35825C2.34742 9.74536 3.62784 10.7768 5.15722 10.7768C3.94794 11.7015 2.45412 12.2706 0.818041 12.2706C0.533505 12.2706 0.248969 12.2706 0 12.2351C1.56495 13.2309 3.37887 13.8 5.37062 13.8C11.8082 13.8 15.3294 8.46495 15.3294 3.84124C15.3294 3.69897 15.3294 3.52113 15.3294 3.37887C16.0052 2.9165 16.6098 2.31186 17.0722 1.60052Z"
                        fill="#3FD1FF"
                      />
                    </svg>
                  </span>
                </TwitterShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
