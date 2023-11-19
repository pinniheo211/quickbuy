import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import auth from "../../../../utils/auth";
import { fetchCart } from "../../../store/Cart";
import CheckProductIsExistsInFlashSale from "../../Shared/CheckProductIsExistsInFlashSale";
import ServeLangItem from "../ServeLangItem";
import Star from "../icons/Star";

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

export default function ProductCardRowStyleTwo({ className, datas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  //cart
  const addToCart = (id) => {
    if (auth()) {
      const data = {
        id: id,
        token: auth() && auth().access_token,
        quantity: 1,
      };
      if (varients) {
        const variantQuery = data.variants.map((value, index) => {
          return value ? `variants[]=${value}` : `variants[]=-1`;
        });
        const variantString = variantQuery.map((value) => value + "&").join("");

        const itemsQuery = data.variantItems.map((value, index) => {
          return value ? `items[]=${value}` : `items[]=-1`;
        });
        const itemQueryStr = itemsQuery.map((value) => value + "&").join("");
        const uri = `token=${data.token}&product_id=${data.id}&${variantString}${itemQueryStr}quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) =>
            toast.success(<Redirect />, {
              autoClose: 5000,
            })
          )
          .catch((err) => {
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      } else {
        const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) =>
            toast.success(<Redirect />, {
              autoClose: 5000,
            })
          )
          .catch((err) => {
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      data-aos="fade-up"
      className={`product-card-row-two w-full  ${className || ""}`}
    >
      <div className="w-full h-[105px] bg-white border border-primarygray px-5 ">
        <div className="w-full h-full flex space-x-5 justify-center items-center">
          <div className="w-[75px] h-full relative">
            <Image
              layout="fill"
              objectFit="scale-down"
              src={`${datas.image}`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 h-full flex flex-col justify-center">
            <Link
              href={{
                pathname: "/single-product",
                query: { slug: datas.slug },
              }}
              passHref
            >
              <a rel="noopener noreferrer">
                <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-1 hover:text-blue-600 cursor-pointer">
                  {datas.title}
                </p>
              </a>
            </Link>
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

            <p className="price">
              <span
                suppressHydrationWarning
                className={`main-price  font-600 text-[18px] ${
                  datas?.offer_price ? "line-through text-qgray" : "text-qred"
                }`}
              >
                {datas?.offer_price ? (
                  <span>${datas?.price}</span>
                ) : (
                  <>
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
        </div>
      </div>
    </div>
  );
}
