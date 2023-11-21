import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCart } from "src/store/Cart";
import apiRequest from "utils/apiRequest";
import auth from "utils/auth";
import LoginContext from "../../Contexts/LoginContext";
import CheckProductIsExistsInFlashSale from "../../Shared/CheckProductIsExistsInFlashSale";
import ServeLangItem from "../ServeLangItem";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
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

export default function ProductCardStyleOne({ datas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { wishlistData } = useSelector((state) => state.wishlistData);
  // const wishlist = wishlistData && wishlistData.wishlists;
  // const wishlisted =
  //   wishlist && wishlist.data.find((id) => id.product.id === datas.id);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [isProductInFlashSale, setData] = useState(null);
  const loginPopupBoard = useContext(LoginContext);
  useEffect(() => {
    if (websiteSetup) {
      const getId = websiteSetup.payload.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(datas.id)
      );
      if (getId) {
        setData(true);
      } else {
        setData(false);
      }
    }
  }, [websiteSetup]);
  // const [arWishlist, setArWishlist] = useState(null);

  // useEffect(() => {
  //   if (wishlisted) {
  //     setArWishlist(true);
  //   } else {
  //     setArWishlist(false);
  //   }
  // }, [wishlisted]);

  // const addToWishlist = (id) => {
  //   if (auth()) {
  //     setArWishlist(true);
  //     apiRequest.addToWishlist({ id: id, token: auth().access_token });
  //     dispatch(fetchWishlist());
  //   } else {
  //     loginPopupBoard.handlerPopup(true);
  //   }
  // };
  // const removeToWishlist = (id) => {
  //   if (auth()) {
  //     setArWishlist(false);
  //     apiRequest.removeToWishlist({ id: id, token: auth().access_token });
  //     dispatch(fetchWishlist());
  //   } else {
  //     loginPopupBoard.handlerPopup(true);
  //   }
  // };
  // cart

  const addToCart = (id) => {
    const data = {
      id: id,
      token: auth() && auth().access_token,
      quantity: 1,
    };
    if (auth()) {
      const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
      apiRequest
        .addToCard(uri)
        .then((res) =>
          toast.success(<Redirect />, {
            autoClose: 5000,
          })
        )
        .catch((err) => {
          console.log(err);
          toast.error(
            err.response &&
              err.response.data.message &&
              err.response.data.message
          );
        });
      dispatch(fetchCart());
    } else {
      localStorage.setItem(
        "data-hold",
        JSON.stringify({ type: "add-to-cart", ...data })
      );
      loginPopupBoard.handlerPopup(true);
    }
  };

  const [imgSrc, setImgSrc] = useState(null);
  const loadImg = (value) => {
    setImgSrc(value);
  };
  return (
    <div className="main-wrapper-card relative">
      <div
        className="product-card-one w-full h-[445px] bg-white relative group overflow-hidden"
        style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="product-card-img w-full h-[300px] -mt-2">
          <div className="w-full h-full relative flex justify-center items-center transform scale-100 group-hover:scale-110 transition duration-300 ease-in-out">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`${imgSrc ? imgSrc : "/assets/images/spinner.gif"}`}
              alt=""
              onLoadingComplete={() => loadImg(datas.image)}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="product-card-details px-[30px] pb-[30px] relative pt-2">
          {/* add to card button */}
          <div className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[85px] transition-all duration-300 ease-in-out">
            <button
              onClick={() => addToCart(datas.id)}
              type="button"
              className="yellow-btn group relative w-full h-full flex shadow  justify-center items-center overflow-hidden"
            >
              <div className="btn-content flex items-center space-x-3 rtl:space-x-reverse relative z-10">
                <span>
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                  </svg>
                </span>
                <span>{ServeLangItem()?.Add_To_Cart}</span>
              </div>
              <div className="bg-shape w-full h-full absolute  bg-qblack"></div>
            </button>
          </div>
          {datas.review && (
            <div className="reviews flex space-x-[1px] mb-3">
              {Array.from(Array(datas.review), () => (
                <span key={datas.review + Math.random()}>
                  <Star />
                </span>
              ))}
              {datas.review < 5 && (
                <>
                  {Array.from(Array(5 - datas.review), () => (
                    <span
                      key={datas.review + Math.random()}
                      className="text-gray-500"
                    >
                      <Star defaultValue={false} />
                    </span>
                  ))}
                </>
              )}
            </div>
          )}

          <Link
            href={{ pathname: "/single-product", query: { slug: datas.slug } }}
            passHref
          >
            <a rel="noopener noreferrer">
              <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600 cursor-pointer">
                {datas.title}
              </p>
            </a>
          </Link>
          <p className="price">
            <span
              suppressHydrationWarning
              className={`main-price  font-600 text-[18px] ${
                datas?.offer_price ? "line-through text-qgray" : "text-qred"
              }`}
            >
              {datas?.offer_price ? (
                <span>{datas?.price}</span>
              ) : (
                <>
                  {isProductInFlashSale && (
                    <span
                      className={`line-through text-qgray font-500 text-[16px] mr-2`}
                    >
                      {parseFloat(datas?.price).toFixed(2)}
                    </span>
                  )}
                  <CheckProductIsExistsInFlashSale
                    id={datas.id}
                    price={datas?.price}
                  />
                </>
              )}
            </span>
            {datas?.offer_price && (
              <span
                suppressHydrationWarning
                className="offer-price text-qred font-600 text-[18px] ml-2"
              >
                <CheckProductIsExistsInFlashSale
                  id={datas.id}
                  price={datas?.offer_price}
                />
              </span>
            )}
          </p>
        </div>
        {/* quick-access-btns */}
        <div className="quick-access-btns flex flex-col space-y-2">
          {/* {!arWishlist ? (
            <button
              className=" absolute group-hover:right-4 -right-10 top-[120px]  transition-all duration-300 ease-in-out"
              type="button"
              onClick={() => addToWishlist(datas.id)}
            >
              <span className="w-10 h-10 flex text-black hover:text-white justify-center items-center transition-all duration-300 ease-in-out hover:bg-qyellow bg-primarygray rounded">
                <ThinLove className="fill-current" />
              </span>
            </button>
          ) : (
            <button
              className=" absolute group-hover:right-4 -right-10 top-[120px]  transition-all duration-300 ease-in-out"
              type="button"
              // onClick={() => removeToWishlist(wishlisted && wishlisted.id)}
            >
              <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
                <ThinLove fill={true} />
              </span>
            </button>
          )} */}
          <button
            className=" absolute group-hover:right-4 -right-10 top-[120px]  transition-all duration-300 ease-in-out"
            type="button"
            // onClick={() => addToWishlist(datas.id)}
          >
            <span className="w-10 h-10 flex text-black hover:text-white justify-center items-center transition-all duration-300 ease-in-out hover:bg-qyellow bg-primarygray rounded">
              <ThinLove className="fill-current" />
            </span>
          </button>
        </div>
      </div>
      <span className="anim bottom"></span>
      <span className="anim right"></span>
      <span className="anim top"></span>
      <span className="anim left"></span>
    </div>
  );
}
