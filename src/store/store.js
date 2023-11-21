import { configureStore } from "@reduxjs/toolkit";
import cart from "./Cart";
import auth from "./auth";
import category from "./category";
import compareProduct from "./compareProduct";
import websiteSetup from "./websiteSetup";
import wishlistData from "./wishlistData";

export default configureStore({
  reducer: {
    category: category,
    websiteSetup: websiteSetup,
    wishlistData: wishlistData,
    cart: cart,
    auth: auth,
    compareProducts: compareProduct,
  },
});
